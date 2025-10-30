'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { TRUST_BADGES, type TrustBadge } from '@/data/trust-badges';

interface TrustBadgeItemProps {
  badge: TrustBadge;
  index: number;
}

function TrustBadgeItem({ badge, index }: TrustBadgeItemProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all cursor-default"
      title={badge.description}
    >
      {/* Badge Logo (Emoji for now, can be replaced with SVG) */}
      <div className="text-4xl md:text-5xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-300">
        {badge.logo}
      </div>

      {/* Badge Name */}
      <div className="text-xs md:text-sm text-slate-300 text-center font-medium">
        {badge.name}
      </div>

      {/* External Link Icon (if URL provided) */}
      {badge.url && (
        <ExternalLink className="absolute top-2 right-2 w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-slate-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-10">
        {badge.description}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    </motion.div>
  );

  if (badge.url) {
    return (
      <a
        href={badge.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

interface TrustBadgesProps {
  layout?: 'horizontal' | 'grid';
  className?: string;
}

export default function TrustBadges({ layout = 'horizontal', className = '' }: TrustBadgesProps) {
  const layoutClasses = {
    horizontal: 'flex flex-wrap justify-center items-center gap-4 md:gap-6',
    grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4',
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {TRUST_BADGES.map((badge, index) => (
        <TrustBadgeItem key={badge.id} badge={badge} index={index} />
      ))}
    </div>
  );
}
