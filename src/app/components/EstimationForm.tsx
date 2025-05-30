'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { EstimationData, EstimationResult } from '../types/estimation';
import { calculateEstimate } from '../utils/calculateEstimate';
import EstimationResultDisplay from './EstimationResult';

const estimationSchema = z.object({
  projectType: z.enum(['driveway', 'patio', 'sidewalk', 'poolDeck', 'foundation', 'garageFloor', 'decorativeConcrete', 'repair'] as const),
  dimensions: z.object({
    length: z.number().min(1, 'Length must be greater than 0'),
    width: z.number().min(1, 'Width must be greater than 0'),
    thickness: z.number().refine((val) => [4, 6, 8].includes(val), {
      message: 'Thickness must be 4, 6, or 8 inches',
    }),
    squareFootage: z.number().min(1, 'Square footage must be greater than 0'),
  }),
  concreteStrength: z.number().refine((val) => [2500, 3000, 3500, 4000].includes(val), {
    message: 'Invalid concrete strength',
  }),
  surfaceFinish: z.enum(['broom', 'smooth', 'exposedAggregate', 'stamped', 'colored', 'sealed'] as const),
  reinforcement: z.enum(['fiberMesh', 'wireMesh', 'rebar', 'none'] as const),
  siteConditions: z.object({
    slopeGrade: z.number().min(0).max(100),
    needsExcavation: z.boolean(),
    soilType: z.enum(['sandy', 'clay', 'loam', 'rocky'] as const),
    accessDifficulty: z.enum(['easy', 'moderate', 'difficult'] as const),
    needsHaulAway: z.boolean(),
    formworkComplexity: z.enum(['simple', 'moderate', 'complex'] as const),
  }),
  additionalServices: z.object({
    demolition: z.boolean(),
    grading: z.boolean(),
    drainage: z.boolean(),
    basePreparation: z.boolean(),
    expansionJoints: z.boolean(),
    controlJoints: z.boolean(),
  }),
  urgencyLevel: z.number().min(1).max(10),
  travelDistance: z.number().min(0),
  notes: z.string(),
});

type EstimationFormData = z.infer<typeof estimationSchema>;

export default function EstimationForm() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimationResult, setEstimationResult] = useState<EstimationResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EstimationFormData>({
    resolver: zodResolver(estimationSchema),
    defaultValues: {
      projectType: 'driveway',
      dimensions: {
        length: 0,
        width: 0,
        thickness: 4,
        squareFootage: 0,
      },
      concreteStrength: 3000,
      surfaceFinish: 'broom',
      reinforcement: 'none',
      siteConditions: {
        slopeGrade: 0,
        needsExcavation: false,
        soilType: 'sandy',
        accessDifficulty: 'easy',
        needsHaulAway: false,
        formworkComplexity: 'simple',
      },
      additionalServices: {
        demolition: false,
        grading: false,
        drainage: false,
        basePreparation: false,
        expansionJoints: false,
        controlJoints: false,
      },
      urgencyLevel: 5,
      travelDistance: 0,
      notes: '',
    },
  });

  // Watch length and width to calculate square footage
  const length = watch('dimensions.length');
  const width = watch('dimensions.width');

  // Update square footage when length or width changes
  useEffect(() => {
    if (length && width) {
      setValue('dimensions.squareFootage', length * width);
    }
  }, [length, width, setValue]);

  const onSubmit: SubmitHandler<EstimationFormData> = async (data) => {
    setIsCalculating(true);
    try {
      const result = calculateEstimate(data as EstimationData);
      setEstimationResult(result);
    } catch (error) {
      console.error('Error calculating estimate:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Type
            </label>
            <select
              {...register('projectType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="driveway">Driveway</option>
              <option value="patio">Patio</option>
              <option value="sidewalk">Sidewalk</option>
              <option value="poolDeck">Pool Deck</option>
              <option value="foundation">Foundation</option>
              <option value="garageFloor">Garage Floor</option>
              <option value="decorativeConcrete">Decorative Concrete</option>
              <option value="repair">Repair</option>
            </select>
            {errors.projectType && (
              <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
            )}
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Length (ft)
              </label>
              <input
                type="number"
                {...register('dimensions.length', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dimensions?.length && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.length.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Width (ft)
              </label>
              <input
                type="number"
                {...register('dimensions.width', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dimensions?.width && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.width.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thickness (inches)
              </label>
              <select
                {...register('dimensions.thickness', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={4}>4"</option>
                <option value={6}>6"</option>
                <option value={8}>8"</option>
              </select>
              {errors.dimensions?.thickness && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.thickness.message}</p>
              )}
            </div>
          </div>

          {/* Concrete Strength */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Concrete Strength (PSI)
            </label>
            <select
              {...register('concreteStrength', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={2500}>2500 PSI</option>
              <option value={3000}>3000 PSI</option>
              <option value={3500}>3500 PSI</option>
              <option value={4000}>4000 PSI</option>
            </select>
            {errors.concreteStrength && (
              <p className="mt-1 text-sm text-red-600">{errors.concreteStrength.message}</p>
            )}
          </div>

          {/* Surface Finish */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Surface Finish
            </label>
            <select
              {...register('surfaceFinish')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="broom">Broom Finish</option>
              <option value="smooth">Smooth Finish</option>
              <option value="exposedAggregate">Exposed Aggregate</option>
              <option value="stamped">Stamped</option>
              <option value="colored">Colored</option>
              <option value="sealed">Sealed</option>
            </select>
            {errors.surfaceFinish && (
              <p className="mt-1 text-sm text-red-600">{errors.surfaceFinish.message}</p>
            )}
          </div>

          {/* Reinforcement */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reinforcement Type
            </label>
            <select
              {...register('reinforcement')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="fiberMesh">Fiber Mesh</option>
              <option value="wireMesh">Wire Mesh</option>
              <option value="rebar">Rebar</option>
            </select>
            {errors.reinforcement && (
              <p className="mt-1 text-sm text-red-600">{errors.reinforcement.message}</p>
            )}
          </div>

          {/* Site Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Site Conditions</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Slope Grade (%)
                </label>
                <input
                  type="number"
                  {...register('siteConditions.slopeGrade', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Soil Type
                </label>
                <select
                  {...register('siteConditions.soilType')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="sandy">Sandy</option>
                  <option value="clay">Clay</option>
                  <option value="loam">Loam</option>
                  <option value="rocky">Rocky</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Access Difficulty
                </label>
                <select
                  {...register('siteConditions.accessDifficulty')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Formwork Complexity
                </label>
                <select
                  {...register('siteConditions.formworkComplexity')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="simple">Simple</option>
                  <option value="moderate">Moderate</option>
                  <option value="complex">Complex</option>
                </select>
              </div>

              <div className="col-span-2 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('siteConditions.needsExcavation')}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Requires Excavation
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('siteConditions.needsHaulAway')}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Requires Material Haul Away
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Additional Services</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('additionalServices.demolition')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Demolition
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('additionalServices.grading')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Grading
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('additionalServices.drainage')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Drainage Solutions
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('additionalServices.basePreparation')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Base Preparation
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('additionalServices.expansionJoints')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Expansion Joints
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('additionalServices.controlJoints')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Control Joints
                </label>
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Urgency Level (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                {...register('urgencyLevel', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.urgencyLevel && (
                <p className="mt-1 text-sm text-red-600">{errors.urgencyLevel.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Travel Distance (miles)
              </label>
              <input
                type="number"
                {...register('travelDistance', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.travelDistance && (
                <p className="mt-1 text-sm text-red-600">{errors.travelDistance.message}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              {...register('notes')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Estimate'}
          </button>
        </div>
      </form>

      {/* Display Results */}
      {estimationResult && (
        <div className="mt-8">
          <EstimationResultDisplay result={estimationResult} />
        </div>
      )}
    </div>
  );
} 