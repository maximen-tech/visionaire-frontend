'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ComplexityBarProps {
  level: number;
  showLabel?: boolean;
  height?: string;
  className?: string;
}

/**
 * ComplexityBar Component
 *
 * Visual progress bar showing complexity level from 1-10 with animated gradient fill.
 * Uses color coding: green (1-3), yellow/orange (4-7), red (8-10).
 *
 * @param level - Complexity level (1-10)
 * @param showLabel - Show "Complexité: X/10 · Label" text (default: true)
 * @param height - Bar height in CSS units (default: "8px")
 * @param className - Additional CSS classes
 *
 * @example
 * <ComplexityBar level={8} showLabel={true} />
 * // Renders: Complexité header + animated red gradient bar at 80% width
 */
export default function ComplexityBar({
  level,
  showLabel = true,
  height = '8px',
  className = '',
}: ComplexityBarProps) {
  // Validate level (1-10)
  const normalizedLevel = Math.max(1, Math.min(10, level));
  const percentage = (normalizedLevel / 10) * 100;

  // Determine color based on level
  const getColor = (lvl: number): string => {
    if (lvl <= 3) return 'from-green-500 to-green-600'; // Easy
    if (lvl <= 7) return 'from-yellow-500 to-orange-500'; // Medium
    return 'from-red-500 to-red-600'; // Complex
  };

  const getLabel = (lvl: number): string => {
    if (lvl <= 3) return 'Facile';
    if (lvl <= 7) return 'Moyen';
    return 'Complexe';
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Complexité
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {normalizedLevel}/10 · {getLabel(normalizedLevel)}
          </span>
        </div>
      )}

      <div
        className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        style={{ height }}
        role="progressbar"
        aria-label={`Niveau de complexité: ${normalizedLevel} sur 10`}
        aria-valuenow={normalizedLevel}
        aria-valuemin={1}
        aria-valuemax={10}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${getColor(normalizedLevel)} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        />
      </div>
    </div>
  );
}

/**
 * Get complexity description text
 *
 * @param level - Complexity level (1-10)
 * @returns Description text
 */
export function getComplexityDescription(level: number): string {
  if (level <= 3) return "✓ Implémentation simple";
  if (level <= 6) return "⚠️ Complexité modérée";
  return "❗ Expert IA fortement recommandé";
}

/**
 * Get complexity color class
 *
 * @param level - Complexity level (1-10)
 * @returns Tailwind text color class
 */
export function getComplexityColorClass(level: number): string {
  if (level <= 3) return "text-emerald-600";
  if (level <= 6) return "text-amber-600";
  return "text-red-600";
}
