'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Building2, CheckCircle, Star } from 'lucide-react';

interface LiveStats {
  hours_saved_this_month: number;
  companies_analyzed: number;
  active_implementations: number;
  average_satisfaction: number;
}

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  color: 'cyan' | 'green' | 'yellow' | 'purple';
  icon: React.ReactNode;
}

function StatItem({ value, label, suffix = '', color, icon }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Animated counting effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    yellow: 'from-yellow-500 to-orange-600',
    purple: 'from-purple-500 to-pink-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {displayValue.toLocaleString('fr-CA')}
        {suffix}
      </div>
      <div className="text-slate-400 text-sm">{label}</div>
    </motion.div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-slate-800 rounded-xl p-6 animate-pulse"
        >
          <div className="w-12 h-12 bg-slate-700 rounded-lg mb-4" />
          <div className="h-10 bg-slate-700 rounded mb-2 w-3/4" />
          <div className="h-4 bg-slate-700 rounded w-full" />
        </div>
      ))}
    </div>
  );
}

export default function LiveStatsCounter() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/stats/live')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching live stats:', err);
        setError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <StatsSkeleton />;
  if (error || !stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <StatItem
        value={stats.hours_saved_this_month}
        label="Heures Économisées Ce Mois"
        suffix="h"
        color="cyan"
        icon={<Clock className="w-6 h-6 text-white" />}
      />
      <StatItem
        value={stats.companies_analyzed}
        label="Entreprises Analysées"
        suffix="+"
        color="green"
        icon={<Building2 className="w-6 h-6 text-white" />}
      />
      <StatItem
        value={stats.active_implementations}
        label="Implémentations Actives"
        suffix=""
        color="yellow"
        icon={<CheckCircle className="w-6 h-6 text-white" />}
      />
      <StatItem
        value={stats.average_satisfaction}
        label="Satisfaction Moyenne"
        suffix="/5"
        color="purple"
        icon={<Star className="w-6 h-6 text-white" />}
      />
    </div>
  );
}
