// components/dashboard/ProgressSection.tsx
// Progress tracking section with task list

import OpportunityCheckbox from './OpportunityCheckbox';
import type { Gap, ProgressSummary, UpdateProgressRequest } from '@/lib/types/dashboard';

interface ProgressSectionProps {
  gaps: Gap[];
  progress: ProgressSummary;
  onProgressUpdate: (data: UpdateProgressRequest) => Promise<void>;
}

export default function ProgressSection({ gaps, progress, onProgressUpdate }: ProgressSectionProps) {
  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="bg-slate-100 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Progression globale</span>
          <span className="text-sm font-bold text-cyan-600">{progress.completion_percentage}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Progression globale"
          aria-valuenow={progress.completion_percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${progress.completion_percentage}% complété`}
          className="w-full bg-slate-200 rounded-full h-3 overflow-hidden"
        >
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress.completion_percentage}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-slate-500">
          {progress.tasks_implemented} / {progress.total_tasks} tâches complétées
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {gaps.map((gap, index) => (
          <div
            key={gap.opportunity_type}
            data-testid={`task-card-${gap.opportunity_type}`}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:border-cyan-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <OpportunityCheckbox
                status={gap.status}
                opportunityType={gap.opportunity_type}
                onChange={async (newStatus) => {
                  await onProgressUpdate({
                    opportunity_type: gap.opportunity_type,
                    status: newStatus,
                  });
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Opportunité {index + 1}: {gap.opportunity_type.replace('_', ' ')}
                </h3>
                <p className="text-sm text-slate-600 mb-2">{gap.problem_teaser}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div>
                    <span className="font-medium">{gap.hours_per_week}h</span> / semaine
                  </div>
                  <div>
                    <span className="font-medium">{gap.hours_per_year}h</span> / an
                  </div>
                  <div>
                    Complexité: <span className="font-medium">{gap.complexity_level}/10</span>
                  </div>
                </div>
                {gap.status !== 'NOT_STARTED' && gap.marked_date && (
                  <div className="mt-2 text-xs text-cyan-600">
                    Marqué le {new Date(gap.marked_date).toLocaleDateString('fr-CA')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
