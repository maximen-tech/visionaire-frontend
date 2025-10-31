'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MapPin, Clock } from 'lucide-react';

interface RecentActivity {
  id: string;
  sector: string;
  city: string;
  hours_potential: number;
  timestamp: Date;
  relative_time: string;
}

interface RecentActivityFeedProps {
  autoRefresh?: boolean;
  refreshInterval?: number; // milliseconds
  maxItems?: number;
}

export default function RecentActivityFeed({
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
  maxItems = 5,
}: RecentActivityFeedProps) {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/stats/recent-activity');
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setActivities(data.slice(0, maxItems));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();

    if (autoRefresh) {
      const interval = setInterval(fetchActivities, refreshInterval);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // fetchActivities is intentionally not in deps to prevent interval recreation
  }, [autoRefresh, refreshInterval, maxItems]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
        <Activity className="w-4 h-4 animate-pulse" />
        <span>Activité récente</span>
      </div>

      {/* Activity Feed */}
      <AnimatePresence mode="popLayout">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-r from-slate-800/80 to-slate-800/40 rounded-lg p-4 border-l-2 border-cyan-500/50 hover:border-cyan-500 transition-colors"
          >
            {/* Main Text */}
            <p className="text-sm text-slate-200 mb-2">
              Une entreprise de <strong className="text-cyan-400">{activity.sector}</strong> à{' '}
              <strong className="text-white">{activity.city}</strong> vient de découvrir{' '}
              <strong className="text-green-400">{activity.hours_potential}h/an</strong> d'économies
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{activity.relative_time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Québec</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Auto-refresh indicator */}
      {autoRefresh && (
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Mise à jour automatique</span>
        </div>
      )}
    </div>
  );
}
