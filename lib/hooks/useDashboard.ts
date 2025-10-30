// lib/hooks/useDashboard.ts
// Custom SWR hook for dashboard data fetching

import useSWR from 'swr';
import { getDashboard } from '@/lib/api/dashboard';
import type { DashboardData } from '@/lib/types/dashboard';

export function useDashboard(analysisId: string) {
  const { data, error, mutate, isValidating } = useSWR<DashboardData>(
    analysisId ? `/dashboard/${analysisId}` : null,
    () => getDashboard(analysisId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
    }
  );

  return {
    dashboard: data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  };
}
