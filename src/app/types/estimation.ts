export type ProjectType = 
  | 'driveway'
  | 'patio'
  | 'sidewalk'
  | 'poolDeck'
  | 'foundation'
  | 'garageFloor'
  | 'decorativeConcrete'
  | 'repair';

export type ConcreteStrength = 2500 | 3000 | 3500 | 4000;

export type SurfaceFinish = 
  | 'broom'
  | 'smooth'
  | 'exposedAggregate'
  | 'stamped'
  | 'colored'
  | 'sealed';

export type ReinforcementType = 
  | 'fiberMesh'
  | 'wireMesh'
  | 'rebar'
  | 'none';

export interface SiteConditions {
  slopeGrade: number;
  needsExcavation: boolean;
  soilType: 'sandy' | 'clay' | 'loam' | 'rocky';
  accessDifficulty: 'easy' | 'moderate' | 'difficult';
  needsHaulAway: boolean;
  formworkComplexity: 'simple' | 'moderate' | 'complex';
}

export interface AdditionalServices {
  demolition: boolean;
  grading: boolean;
  drainage: boolean;
  basePreparation: boolean;
  expansionJoints: boolean;
  controlJoints: boolean;
}

export interface ProjectDimensions {
  length: number;
  width: number;
  thickness: 4 | 6 | 8;
  squareFootage: number;
}

export interface EstimationData {
  projectType: ProjectType;
  dimensions: ProjectDimensions;
  concreteStrength: ConcreteStrength;
  surfaceFinish: SurfaceFinish;
  reinforcement: ReinforcementType;
  siteConditions: SiteConditions;
  additionalServices: AdditionalServices;
  urgencyLevel: number; // 1-10
  travelDistance: number; // in miles
  notes: string;
}

export interface CostBreakdown {
  baseCost: number;
  reinforcementCost: number;
  finishCost: number;
  additionalServicesCost: number;
  siteConditionsCost: number;
  travelCost: number;
  subtotal: number;
  markup: number;
  total: number;
}

export interface EstimationResult {
  estimationData: EstimationData;
  costs: CostBreakdown;
  materialQuantities: {
    concrete: number; // in cubic yards
    reinforcement: number; // in square feet or pieces
    baseAggregate: number; // in tons
  };
  laborHours: number;
  equipmentNeeded: string[];
  estimatedDuration: number; // in days
  recommendations: string[];
} 