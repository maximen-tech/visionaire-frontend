// components/dashboard/BadgesSection.tsx
// Badges grid section

import BadgeCard from './BadgeCard';
import type { Badge } from '@/lib/types/dashboard';

interface BadgesSectionProps {
  badges: Badge[];
  newlyEarnedBadges?: Badge[];
}

export default function BadgesSection({ badges, newlyEarnedBadges = [] }: BadgesSectionProps) {
  const earnedCount = badges.filter((b) => b.earned_at).length;
  const totalCount = badges.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-xl">Badges</h2>
          <p className="text-sm text-slate-600">
            {earnedCount} / {totalCount} débloqués
          </p>
        </div>
        <div className="text-3xl">🏆</div>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            showAnimation={newlyEarnedBadges.some((b) => b.id === badge.id)}
          />
        ))}
      </div>

      {/* Empty state */}
      {earnedCount === 0 && (
        <div className="text-center py-6 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <p className="text-slate-600 text-sm">
            Commencez vos tâches pour débloquer des badges! 🎯
          </p>
        </div>
      )}
    </div>
  );
}
