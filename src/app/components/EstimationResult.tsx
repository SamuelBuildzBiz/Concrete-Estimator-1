'use client';

import type { EstimationResult } from '../types/estimation';

interface EstimationResultDisplayProps {
  result: EstimationResult;
}

export default function EstimationResultDisplay({ result }: EstimationResultDisplayProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Cost Breakdown */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Base Cost</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.baseCost)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Finish Cost</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.finishCost)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Reinforcement Cost</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.reinforcementCost)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Additional Services</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.additionalServicesCost)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Site Conditions</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.siteConditionsCost)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Travel Cost</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.travelCost)}</dd>
              </div>
              <div className="col-span-2 border-t pt-4">
                <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.subtotal)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Markup (30%)</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(result.costs.markup)}</dd>
              </div>
              <div className="col-span-2 border-t pt-4">
                <dt className="text-xl font-bold text-gray-900">Total</dt>
                <dd className="mt-1 text-2xl font-bold text-blue-600">{formatCurrency(result.costs.total)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Material Quantities */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Materials Needed</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Concrete</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{result.materialQuantities.concrete} cubic yards</dd>
              </div>
              {result.materialQuantities.reinforcement > 0 && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reinforcement</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{result.materialQuantities.reinforcement} sq ft</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Base Aggregate</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{result.materialQuantities.baseAggregate} tons</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Details</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Labor Hours</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{result.laborHours} hours</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Estimated Duration</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{result.estimatedDuration} days</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Equipment Needed</dt>
                <dd className="mt-1">
                  <ul className="list-disc pl-5 text-gray-900">
                    {result.equipmentNeeded.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommendations</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-2 text-gray-900">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 