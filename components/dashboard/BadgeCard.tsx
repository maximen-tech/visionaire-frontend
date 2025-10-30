// components/dashboard/BadgeCard.tsx
// Individual badge card with locked/unlocked states

import { Target, Zap, Trophy, Award, Flame, LucideIcon } from 'lucide-react';
import type { Badge, BadgeType } from '@/lib/types/dashboard';

interface BadgeCardProps {
  badge: Badge;
  showAnimation?: boolean;
}

const BADGE_ICONS: Record<BadgeType, LucideIcon> = {
  first_step: Target,
  quick_win: Zap,
  time_saver: Trophy,
  efficiency_expert: Award,
  streak_master: Flame,
};

const BADGE_COLORS: Record<BadgeType, string> = {
  first_step: 'text-cyan-600 bg-cyan-100',
  quick_win: 'text-amber-600 bg-amber-100',
  time_saver: 'text-green-600 bg-green-100',
  efficiency_expert: 'text-purple-600 bg-purple-100',
  streak_master: 'text-red-600 bg-red-100',
};

export default function BadgeCard({ badge, showAnimation = false }: BadgeCardProps) {
  const isLocked = !badge.earned_at;
  const Icon = BADGE_ICONS[badge.badge_type];
  const colorClass = BADGE_COLORS[badge.badge_type];

  return (
    <div
      data-testid={`badge-card-${badge.badge_type}`}
      role="img"
      aria-label={`Badge ${badge.badge_name} ${isLocked ? 'verrouillé' : 'débloqué'}`}
      className={`
        relative bg-white border-2 rounded-lg p-4 transition-all
        ${isLocked ? 'border-slate-200 grayscale opacity-60' : 'border-amber-300 shadow-md'}
        ${showAnimation ? 'animate-bounce' : ''}
        hover:scale-105 hover:shadow-lg
      `}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center mb-3 mx-auto`}>
        <Icon size={24} className={isLocked ? 'text-slate-400' : ''} />
      </div>

      {/* Badge name */}
      <h3 className="font-heading font-bold text-sm text-center mb-1">
        {badge.badge_name}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-600 text-center mb-2">
        {badge.description}
      </p>

      {/* Status */}
      {isLocked ? (
        <div className="text-center">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            🔒 Verrouillé
          </span>
          <div className="sr-only">
            Pour débloquer ce badge: {badge.description}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
            ✅ Débloqué
          </span>
          {badge.earned_at && (
            <div className="text-xs text-slate-500 mt-1">
              {new Date(badge.earned_at).toLocaleDateString('fr-CA')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
