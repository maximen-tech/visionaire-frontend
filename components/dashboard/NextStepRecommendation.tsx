// components/dashboard/NextStepRecommendation.tsx
// AI-powered next task recommendation

import { Lightbulb } from 'lucide-react';
import { useRecommendation } from '@/lib/hooks/useRecommendation';

interface NextStepRecommendationProps {
  analysisId: string;
}

export default function NextStepRecommendation({ analysisId }: NextStepRecommendationProps) {
  const { recommendation, isLoading, isError } = useRecommendation(analysisId);

  if (isLoading) {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-amber-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-amber-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (isError || !recommendation) {
    return null; // Gracefully hide if recommendation fails
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="bg-amber-400 rounded-full p-2 flex-shrink-0">
          <Lightbulb size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-amber-900 mb-1 flex items-center gap-2">
            Recommandation IA
            <span className="text-xs font-normal bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              Priorité: {recommendation.priority_score}/10
            </span>
          </h3>
          <p className="text-sm text-amber-800 mb-2">{recommendation.reasoning}</p>
          <div className="text-xs text-amber-700 bg-white/50 rounded p-2">
            <strong>Commencez ici:</strong> {recommendation.next_task.problem_teaser}
            <div className="mt-1 text-amber-600">
              Économisez <strong>{recommendation.next_task.hours_per_week}h/semaine</strong> • Complexité:{' '}
              {recommendation.next_task.complexity_level}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
