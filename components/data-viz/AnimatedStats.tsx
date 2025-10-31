"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedStatsProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  duration?: number;
  sparkline?: number[];
  className?: string;
}

export function AnimatedStats({
  value,
  label,
  suffix = "",
  prefix = "",
  trend,
  duration = 2,
  sparkline,
  className = "",
}: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.div
      ref={ref}
      className={`relative p-6 rounded-xl bg-white dark:bg-dark-bg-secondary border border-slate-200 dark:border-dark-border-medium hover:shadow-depth-md transition-shadow ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Value */}
      <div className="flex items-baseline gap-2 mb-2">
        <motion.span className="text-4xl font-bold text-slate-900 dark:text-dark-text-primary">
          {prefix}
          <motion.span>{display}</motion.span>
          {suffix}
        </motion.span>

        {/* Trend indicator */}
        {trend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: duration }}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
              trend.isPositive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            }`}
          >
            {trend.isPositive ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{Math.abs(trend.value)}%</span>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <p className="text-sm text-slate-600 dark:text-dark-text-secondary mb-3">{label}</p>

      {/* Sparkline */}
      {sparkline && sparkline.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration + 0.2 }}
          className="h-12"
        >
          <MiniSparkline data={sparkline} />
        </motion.div>
      )}
    </motion.div>
  );
}

// Mini Sparkline Chart
function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Gradient fill */}
      <defs>
        <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area */}
      <motion.polygon
        points={`0,100 ${points} 100,100`}
        fill="url(#sparkline-gradient)"
        className="text-cyan-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Line */}
      <motion.polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-cyan-500"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
  );
}

// Stats Grid Layout
interface StatsGridProps {
  stats: Array<{
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
    trend?: { value: number; isPositive: boolean };
    sparkline?: number[];
  }>;
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, columns = 3 }: StatsGridProps) {
  return (
    <div
      className={`grid gap-6 ${
        columns === 2
          ? "grid-cols-1 md:grid-cols-2"
          : columns === 3
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      }`}
    >
      {stats.map((stat, index) => (
        <AnimatedStats key={index} {...stat} />
      ))}
    </div>
  );
}
