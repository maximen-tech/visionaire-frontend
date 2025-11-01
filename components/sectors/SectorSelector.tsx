'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTORS } from '@/lib/data/sector-optimizations';
import OptimizationGrid from './OptimizationGrid';

export default function SectorSelector() {
  const [activeSector, setActiveSector] = useState(SECTORS[0].id);

  const currentSector = SECTORS.find(s => s.id === activeSector)!;

  return (
    <div className="space-y-8">
      {/* Sector Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {SECTORS.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setActiveSector(sector.id)}
            className={`
              px-6 py-3 rounded-xl font-semibold text-base md:text-lg transition-all duration-300
              ${activeSector === sector.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }
            `}
          >
            <span className="mr-2">{sector.icon}</span>
            <span className="hidden sm:inline">{sector.name}</span>
            <span className="sm:hidden">{sector.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Sector Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeSector}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-center text-slate-600 dark:text-slate-400 text-lg"
        >
          {currentSector.description}
        </motion.p>
      </AnimatePresence>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          * Gains moyens observés selon McKinsey 2023 & Gartner 2024. Résultats variables selon implémentation.
        </p>
      </motion.div>

      {/* Optimization Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSector}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <OptimizationGrid optimizations={currentSector.optimizations} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
