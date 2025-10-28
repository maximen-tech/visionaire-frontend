import React from "react";
import { cn } from "@/lib/utils";

interface ComplexityBarProps {
  level: number; // 1-10
  className?: string;
}

/**
 * ComplexityBar Component
 *
 * Visual bar showing complexity level from 1-10.
 * Uses color coding: green (1-3), amber (4-6), red (7-10).
 *
 * @param level - Complexity level (1-10)
 * @param className - Additional CSS classes
 *
 * @example
 * <ComplexityBar level={8} />
 * // Renders: [████████░░] 8/10 (red color)
 */
export default function ComplexityBar({ level, className = "" }: ComplexityBarProps) {
  // Clamp level between 1 and 10
  const clampedLevel = Math.max(1, Math.min(10, level));

  // Determine color based on level
  const getColor = () => {
    if (clampedLevel <= 3) return "bg-emerald-500"; // Easy
    if (clampedLevel <= 6) return "bg-amber-500"; // Medium
    return "bg-red-500"; // Hard
  };

  const color = getColor();

  // Generate 10 squares
  const squares = Array.from({ length: 10 }, (_, index) => {
    const isFilled = index < clampedLevel;

    return (
      <div
        key={index}
        className={cn(
          "w-4 h-4 rounded-sm",
          isFilled ? color : "border-2 border-slate-300 bg-transparent"
        )}
      />
    );
  });

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Squares */}
      <div className="flex gap-1">{squares}</div>

      {/* Label */}
      <span className="font-mono font-semibold text-slate-700 text-sm">
        {clampedLevel}/10
      </span>
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
