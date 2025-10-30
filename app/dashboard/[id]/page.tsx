// app/dashboard/[id]/page.tsx
// Dashboard route - main entry point

'use client';

import { useState, use } from 'react';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { updateProgress } from '@/lib/api/dashboard';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import DashboardError from '@/components/dashboard/DashboardError';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProgressSection from '@/components/dashboard/ProgressSection';
import BadgesSection from '@/components/dashboard/BadgesSection';
import MetricsSection from '@/components/dashboard/MetricsSection';
import EmailSubscriptionForm from '@/components/dashboard/EmailSubscriptionForm';
import NextStepRecommendation from '@/components/dashboard/NextStepRecommendation';
import BadgeUnlockModal from '@/components/dashboard/BadgeUnlockModal';
import type { UpdateProgressRequest, Badge } from '@/lib/types/dashboard';

export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { dashboard, isLoading, isError, mutate } = useDashboard(id);
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState<Badge[]>([]);
  const [badgeToShow, setBadgeToShow] = useState<Badge | null>(null);

  const handleProgressUpdate = async (data: UpdateProgressRequest) => {
    if (!dashboard) return;

    // 1. Optimistic update (instant UI)
    mutate(
      (currentData) =>
        currentData
          ? {
              ...currentData,
              top_3_gaps: currentData.top_3_gaps.map((gap) =>
                gap.opportunity_type === data.opportunity_type
                  ? { ...gap, status: data.status }
                  : gap
              ),
            }
          : currentData,
      false // don't revalidate yet
    );

    // 2. API call
    try {
      const response = await updateProgress(id, data);

      // 3. Show badge unlock if earned
      if (response.badges_earned.length > 0) {
        setNewlyEarnedBadges(response.badges_earned);
        setBadgeToShow(response.badges_earned[0]); // Show first badge
      }

      // 4. Revalidate to get accurate data
      mutate();
    } catch (error) {
      // 5. Rollback on error
      mutate();
      console.error('Failed to update progress:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError || !dashboard) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DashboardError error={isError || new Error('Dashboard not found')} reset={() => mutate()} />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader
          companyName={dashboard.identity_a1.company_name}
          completionPercentage={dashboard.progress.completion_percentage}
        />

        <DashboardLayout>
          {/* Progress Section */}
          <div className="md:col-span-1 lg:col-span-1" data-testid="progress-section">
            <h2 className="font-heading font-bold text-xl mb-4">Vos Opportunités</h2>
            <ProgressSection
              gaps={dashboard.top_3_gaps}
              progress={dashboard.progress}
              onProgressUpdate={handleProgressUpdate}
            />
            <div className="mt-4">
              <NextStepRecommendation analysisId={id} />
            </div>
          </div>

          {/* Badges Section */}
          <div className="md:col-span-1 lg:col-span-1" data-testid="badges-section">
            <BadgesSection badges={dashboard.badges} newlyEarnedBadges={newlyEarnedBadges} />
          </div>

          {/* Metrics Section */}
          <div className="md:col-span-2 lg:col-span-1" data-testid="metrics-section">
            <MetricsSection metrics={dashboard.metrics} />
            <div className="mt-4">
              <EmailSubscriptionForm analysisId={id} />
            </div>
          </div>
        </DashboardLayout>
      </div>

      {/* Badge Unlock Modal */}
      <BadgeUnlockModal badge={badgeToShow} onClose={() => setBadgeToShow(null)} />
    </>
  );
}
