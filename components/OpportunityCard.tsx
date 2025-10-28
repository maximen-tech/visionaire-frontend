"use client";

import type { TimeOpportunity } from "@/lib/types";

interface OpportunityCardProps {
  title: string;
  opportunity: TimeOpportunity;
  hourlyRate: number | null;
  icon: string;
}

export default function OpportunityCard({
  title,
  opportunity,
  hourlyRate,
  icon,
}: OpportunityCardProps) {
  // Calculate monetary value if hourly rate is provided
  const weeklyValue = hourlyRate
    ? opportunity.hours_per_week * hourlyRate
    : null;
  const yearlyValue = hourlyRate
    ? opportunity.hours_per_year * hourlyRate
    : null;

  // Get complexity bar color
  const getComplexityColor = (level: number) => {
    if (level <= 3) return "bg-green-500";
    if (level <= 6) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="bg-white border-2 border-indigo-100 rounded-lg p-6 hover:border-indigo-300 transition-all shadow-md hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      {/* Time Saved */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-500">
          Temps récupérable
        </span>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-indigo-600">
            {opportunity.hours_per_week.toFixed(1)}h
          </p>
          <span className="text-gray-600">/semaine</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          ({opportunity.hours_per_year.toFixed(0)}h/an)
        </p>
      </div>

      {/* Monetary Value (if hourly rate provided) */}
      {hourlyRate !== null && weeklyValue && yearlyValue && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <span className="text-sm font-medium text-green-700">
            Valeur économique
          </span>
          <p className="text-2xl font-bold text-green-700">
            {Math.round(yearlyValue).toLocaleString("fr-FR")} $ CAD
          </p>
          <p className="text-xs text-green-600">
            ({Math.round(weeklyValue).toLocaleString("fr-FR")} $/semaine)
          </p>
        </div>
      )}

      {/* Problem Teaser */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-500">Problème</span>
        <p className="text-gray-700 mt-1">{opportunity.problem_teaser}</p>
      </div>

      {/* Complexity Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Complexité
          </span>
          <span className="text-sm font-bold text-gray-700">
            {opportunity.complexity_level}/10
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getComplexityColor(
              opportunity.complexity_level
            )} h-2 rounded-full transition-all`}
            style={{
              width: `${(opportunity.complexity_level / 10) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Tools Hint (Masked) */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Outils recommandés
          </span>
          <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
            🔒 MASQUÉ
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1 italic">
          Révélé après consultation gratuite
        </p>
      </div>
    </div>
  );
}
