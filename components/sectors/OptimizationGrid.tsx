'use client';

import { motion } from 'framer-motion';
import type { SectorOptimizations } from '@/lib/data/sector-optimizations';
import OptimizationCard from './OptimizationCard';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface OptimizationGridProps {
  optimizations: SectorOptimizations;
}

export default function OptimizationGrid({ optimizations }: OptimizationGridProps) {
  const categories = [
    { key: 'numerique' as const, title: '🌐 Numérique', color: 'cyan' as const },
    { key: 'workflow' as const, title: '⚙️ Workflow', color: 'emerald' as const },
    { key: 'gestion' as const, title: '📊 Gestion', color: 'amber' as const },
  ];

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.key}>
          <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6 text-center">
            {category.title}
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {optimizations[category.key].map((opt, index) => (
              <motion.div key={index} variants={staggerItem}>
                <OptimizationCard
                  optimization={opt}
                  color={category.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
