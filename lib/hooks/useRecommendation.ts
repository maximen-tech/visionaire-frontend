// lib/hooks/useRecommendation.ts
// Custom SWR hook for AI recommendations

import useSWR from 'swr';
import { getRecommendation } from '@/lib/api/dashboard';
import type { RecommendationData } from '@/lib/types/dashboard';

export function useRecommendation(analysisId: string) {
  const { data, error } = useSWR<RecommendationData>(
    analysisId ? `/dashboard/${analysisId}/recommendations` : null,
    () => getRecommendation(analysisId),
    {
      revalidateOnFocus: false, // don't refetch AI recommendation constantly
      dedupingInterval: 60000, // 1 minute cache
    }
  );

  return {
    recommendation: data,
    isLoading: !error && !data,
    isError: error,
  };
}
