import { EstimationData, CostBreakdown, EstimationResult } from '../types/estimation';

const BASE_RATES = {
  driveway: 8,
  patio: 9,
  sidewalk: 8,
  poolDeck: 10,
  foundation: 12,
  garageFloor: 8,
  decorativeConcrete: 15,
  repair: 12,
};

const FINISH_MULTIPLIERS = {
  broom: 1,
  smooth: 1.1,
  exposedAggregate: 1.3,
  stamped: 1.5,
  colored: 1.25,
  sealed: 1.15,
};

const REINFORCEMENT_RATES = {
  fiberMesh: 0.5,
  wireMesh: 1,
  rebar: 1.5,
  none: 0,
};

const calculateMaterialQuantities = (data: EstimationData) => {
  const { length, width, thickness } = data.dimensions;
  const area = length * width;
  const depth = thickness / 12; // Convert inches to feet
  const cubicFeet = area * depth;
  const cubicYards = cubicFeet / 27; // Convert cubic feet to cubic yards
  
  // Add 10% waste factor
  const concreteNeeded = cubicYards * 1.1;
  
  return {
    concrete: Math.ceil(concreteNeeded * 10) / 10, // Round to nearest 0.1 cubic yards
    reinforcement: data.reinforcement !== 'none' ? area : 0,
    baseAggregate: Math.ceil((area * 0.167) * 10) / 10, // 2 inches of base = 0.167 feet
  };
};

const calculateLaborHours = (data: EstimationData) => {
  const { squareFootage } = data.dimensions;
  let baseHours = squareFootage / 100; // Base: 100 sq ft per hour
  
  // Adjust for complexity
  const complexityMultipliers = {
    simple: 1,
    moderate: 1.3,
    complex: 1.6,
  };
  
  baseHours *= complexityMultipliers[data.siteConditions.formworkComplexity];
  
  // Add time for additional services
  if (data.additionalServices.demolition) baseHours += squareFootage / 200;
  if (data.additionalServices.grading) baseHours += squareFootage / 300;
  if (data.additionalServices.drainage) baseHours += 4;
  if (data.additionalServices.basePreparation) baseHours += squareFootage / 250;
  
  return Math.ceil(baseHours);
};

const calculateEquipmentNeeded = (data: EstimationData): string[] => {
  const equipment = ['Concrete Tools', 'Wheelbarrow', 'Levels'];
  
  if (data.dimensions.squareFootage > 500) {
    equipment.push('Concrete Pump');
  }
  
  if (data.additionalServices.demolition) {
    equipment.push('Jackhammer', 'Dump Trailer');
  }
  
  if (data.additionalServices.grading) {
    equipment.push('Skid Steer', 'Laser Level');
  }
  
  if (data.siteConditions.needsExcavation) {
    equipment.push('Mini Excavator');
  }
  
  return equipment;
};

export const calculateEstimate = (data: EstimationData): EstimationResult => {
  const baseRate = BASE_RATES[data.projectType];
  const finishMultiplier = FINISH_MULTIPLIERS[data.surfaceFinish];
  const reinforcementRate = REINFORCEMENT_RATES[data.reinforcement];
  
  // Calculate base cost
  let baseCost = data.dimensions.squareFootage * baseRate;
  
  // Apply finish multiplier
  const finishCost = baseCost * (finishMultiplier - 1);
  
  // Calculate reinforcement cost
  const reinforcementCost = data.dimensions.squareFootage * reinforcementRate;
  
  // Calculate additional services cost
  let additionalServicesCost = 0;
  if (data.additionalServices.demolition) additionalServicesCost += data.dimensions.squareFootage * 3;
  if (data.additionalServices.grading) additionalServicesCost += data.dimensions.squareFootage * 2;
  if (data.additionalServices.drainage) additionalServicesCost += 1000;
  if (data.additionalServices.basePreparation) additionalServicesCost += data.dimensions.squareFootage * 2;
  if (data.additionalServices.expansionJoints) additionalServicesCost += data.dimensions.squareFootage * 0.5;
  if (data.additionalServices.controlJoints) additionalServicesCost += data.dimensions.squareFootage * 0.3;
  
  // Calculate site condition costs
  let siteConditionsCost = 0;
  if (data.siteConditions.needsExcavation) siteConditionsCost += data.dimensions.squareFootage * 2;
  if (data.siteConditions.needsHaulAway) siteConditionsCost += data.dimensions.squareFootage * 1.5;
  siteConditionsCost += (data.siteConditions.slopeGrade / 100) * baseCost * 0.2;
  
  // Calculate travel cost
  const travelCost = data.travelDistance * 2; // $2 per mile round trip
  
  // Calculate subtotal
  const subtotal = baseCost + finishCost + reinforcementCost + additionalServicesCost + siteConditionsCost + travelCost;
  
  // Apply urgency multiplier (10% increase per urgency level above 5)
  const urgencyMultiplier = 1 + Math.max(0, data.urgencyLevel - 5) * 0.1;
  
  // Calculate final total with markup
  const markup = subtotal * 0.3; // 30% profit margin
  const total = (subtotal + markup) * urgencyMultiplier;
  
  // Calculate material quantities
  const materialQuantities = calculateMaterialQuantities(data);
  
  // Calculate labor hours
  const laborHours = calculateLaborHours(data);
  
  // Determine equipment needed
  const equipmentNeeded = calculateEquipmentNeeded(data);
  
  // Generate recommendations
  const recommendations = [
    `Recommended concrete strength: ${data.concreteStrength} PSI for ${data.projectType}`,
    `Estimated completion time: ${Math.ceil(laborHours / 8)} day(s) with a crew of 3`,
    `Order ${materialQuantities.concrete} cubic yards of concrete`,
    `Ensure proper drainage slope of ${Math.max(1, data.siteConditions.slopeGrade)}%`,
  ];
  
  if (data.siteConditions.soilType === 'clay') {
    recommendations.push('Consider additional base preparation due to clay soil');
  }
  
  if (data.dimensions.squareFootage > 500) {
    recommendations.push('Recommend scheduling concrete pump truck');
  }
  
  return {
    estimationData: data,
    costs: {
      baseCost,
      reinforcementCost,
      finishCost,
      additionalServicesCost,
      siteConditionsCost,
      travelCost,
      subtotal,
      markup,
      total: Math.ceil(total * 100) / 100,
    },
    materialQuantities,
    laborHours,
    equipmentNeeded,
    estimatedDuration: Math.ceil(laborHours / 8), // days
    recommendations,
  };
}; 