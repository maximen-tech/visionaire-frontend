'use client';

import { motion } from 'framer-motion';
import type { Optimization } from '@/lib/data/sector-optimizations';
import GlassmorphicCard from '@/components/design-system/GlassmorphicCard';

interface OptimizationCardProps {
  optimization: Optimization;
  color: 'cyan' | 'emerald' | 'amber';
}

export default function OptimizationCard({ optimization, color }: OptimizationCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    emerald: 'from-emerald-500 to-green-600',
    amber: 'from-amber-500 to-orange-600',
  };

  const borderColors = {
    cyan: 'border-cyan-200',
    emerald: 'border-emerald-200',
    amber: 'border-amber-200',
  };

  const textColors = {
    cyan: 'text-cyan-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <GlassmorphicCard
        hoverable
        className={`h-full border-2 ${borderColors[color]} transition-all duration-300 hover:shadow-lg hover:border-opacity-100`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Icon + Gain Badge */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl">{optimization.icon}</span>
            <div
              className={`
                px-3 py-1 rounded-full text-white font-bold text-sm
                bg-gradient-to-r ${colorClasses[color]} shadow-md
              `}
            >
              {optimization.gain}
            </div>
          </div>

          {/* Title */}
          <h4 className={`text-xl font-heading font-bold ${textColors[color]} mb-2`}>
            {optimization.title}
          </h4>

          {/* Description */}
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1">
            {optimization.description}
          </p>

          {/* CTA Hint */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              ✓ Inclus dans l'analyse gratuite
            </p>
          </div>
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}
