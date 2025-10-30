// app/api/stats/recent-activity/route.ts
// API endpoint for recent activity feed (cached, 30s TTL)

import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 30; // Cache for 30 seconds

interface RecentActivity {
  id: string;
  sector: string;
  city: string;
  hours_potential: number;
  timestamp: Date;
  relative_time: string;
}

// Helper to generate relative time (e.g., "Il y a 5 min")
function getRelativeTime(minutes: number): string {
  if (minutes < 1) return 'À l\'instant';
  if (minutes === 1) return 'Il y a 1 minute';
  if (minutes < 60) return `Il y a ${minutes} minutes`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return 'Il y a 1 heure';
  if (hours < 24) return `Il y a ${hours} heures`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'Il y a 1 jour';
  return `Il y a ${days} jours`;
}

export async function GET() {
  // TODO: Replace with real backend API call when BE-006 is implemented
  // For now, generate realistic mock data with varying timestamps

  const sectors = [
    'Commerce de détail',
    'Services professionnels',
    'Fabrication',
    'Restauration',
    'Services juridiques',
    'Immobilier',
  ];

  const cities = [
    'Montréal',
    'Québec',
    'Laval',
    'Gatineau',
    'Trois-Rivières',
    'Sherbrooke',
  ];

  const activities: RecentActivity[] = Array.from({ length: 5 }, (_, i) => {
    const minutesAgo = Math.floor(Math.random() * 120) + (i * 10); // Spread over 2 hours
    const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000);

    return {
      id: `act-${Date.now()}-${i}`,
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      hours_potential: Math.floor(Math.random() * 200) + 50, // 50-250 hours
      timestamp,
      relative_time: getRelativeTime(minutesAgo),
    };
  });

  // Sort by most recent first
  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return NextResponse.json(activities, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}
