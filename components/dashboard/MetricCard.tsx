// components/dashboard/MetricCard.tsx
// Individual metric card for hours/money savings

import { Clock, DollarSign } from 'lucide-react';

interface MetricCardProps {
  label: string;
  potential: number;
  actual: number;
  unit: 'hours' | 'money';
  hourlyRate?: number;
}

export default function MetricCard({ label, potential, actual, unit, hourlyRate }: MetricCardProps) {
  const percentage = potential > 0 ? Math.round((actual / potential) * 100) : 0;
  const Icon = unit === 'hours' ? Clock : DollarSign;

  const formatValue = (value: number) => {
    if (unit === 'money') {
      return `${value.toLocaleString('fr-CA')} $ CAD`;
    }
    return `${value}h`;
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-cyan-300 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-cyan-100 rounded-full p-2">
          <Icon size={20} className="text-cyan-600" />
        </div>
        <h3 className="font-semibold text-slate-700">{label}</h3>
      </div>

      {/* Values */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-cyan-600">{formatValue(actual)}</span>
          <span className="text-slate-500">/ {formatValue(potential)}</span>
        </div>
        {unit === 'money' && hourlyRate && (
          <div className="text-xs text-slate-500 mt-1">
            Basé sur {hourlyRate} $ CAD/h
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Progrès</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Status message */}
      {actual === 0 && (
        <p className="text-xs text-amber-600 mt-2">
          Commencez vos tâches pour voir les économies!
        </p>
      )}
      {actual > 0 && actual < potential && (
        <p className="text-xs text-green-600 mt-2">
          Excellent! Continuez pour maximiser vos économies.
        </p>
      )}
      {actual === potential && actual > 0 && (
        <p className="text-xs text-green-700 font-semibold mt-2">
          🎉 Objectif atteint! Toutes les économies réalisées!
        </p>
      )}
    </div>
  );
}
