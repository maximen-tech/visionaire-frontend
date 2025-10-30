// components/dashboard/MetricsSection.tsx
// Metrics section with hours and money savings

import MetricCard from './MetricCard';
import type { MetricsSummary } from '@/lib/types/dashboard';

interface MetricsSectionProps {
  metrics: MetricsSummary;
}

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  // Extract hourly rate from estimated_money_saved if available
  const hourlyRate =
    metrics.estimated_money_saved && metrics.actual_hours_saved_per_year > 0
      ? Math.round(metrics.estimated_money_saved / metrics.actual_hours_saved_per_year)
      : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="font-heading font-bold text-xl mb-1">Vos Économies</h2>
        <p className="text-sm text-slate-600">
          Temps et argent économisés grâce à vos actions
        </p>
      </div>

      {/* Metrics cards */}
      <div className="space-y-4">
        {/* Hours per week */}
        <MetricCard
          label="Heures / semaine"
          potential={metrics.potential_hours_saved_per_week}
          actual={metrics.actual_hours_saved_per_week}
          unit="hours"
        />

        {/* Hours per year */}
        <MetricCard
          label="Heures / année"
          potential={metrics.potential_hours_saved_per_year}
          actual={metrics.actual_hours_saved_per_year}
          unit="hours"
        />

        {/* Money saved (conditional) */}
        {metrics.estimated_money_saved !== null && (
          <MetricCard
            label="Économies annuelles"
            potential={
              hourlyRate
                ? metrics.potential_hours_saved_per_year * hourlyRate
                : metrics.estimated_money_saved
            }
            actual={metrics.estimated_money_saved}
            unit="money"
            hourlyRate={hourlyRate || undefined}
          />
        )}
      </div>

      {/* Summary callout */}
      {metrics.actual_hours_saved_per_week > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-cyan-50 border-2 border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-900 font-semibold mb-1">
            Félicitations! Vous économisez déjà:
          </p>
          <p className="text-2xl font-bold text-green-700">
            {metrics.actual_hours_saved_per_week}h par semaine
          </p>
          <p className="text-xs text-green-600 mt-1">
            Soit {metrics.actual_hours_saved_per_year}h par an!
          </p>
        </div>
      )}
    </div>
  );
}
