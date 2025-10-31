// app/api/stats/recent-activity/route.ts
// API endpoint for recent activity feed (cached, 30s TTL)
// Connected to backend API with graceful fallback to mock data

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

// Mock data generator (fallback if backend unavailable)
function generateMockActivities(): RecentActivity[] {
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
    const minutesAgo = Math.floor(Math.random() * 120) + (i * 10);
    const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000);

    return {
      id: `act-${Date.now()}-${i}`,
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      hours_potential: Math.floor(Math.random() * 200) + 50,
      timestamp,
      relative_time: getRelativeTime(minutesAgo),
    };
  });

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://visionaire-bff-production.up.railway.app';

  try {
    // Attempt to fetch real activity from backend
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout (faster than live stats)

    const response = await fetch(`${backendUrl}/api/stats/recent-activity`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json() as RecentActivity[];

    // Calculate relative time for each activity
    const enrichedData = data.map(activity => ({
      ...activity,
      timestamp: new Date(activity.timestamp),
      relative_time: activity.relative_time || getRelativeTime(
        Math.floor((Date.now() - new Date(activity.timestamp).getTime()) / 60000)
      ),
    }));

    return NextResponse.json(enrichedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Data-Source': 'backend',
      },
    });

  } catch (error) {
    // Fallback to mock data if backend is unavailable
    console.warn('[API Recent Activity] Backend unavailable, using fallback data:', error);

    const activities = generateMockActivities();

    return NextResponse.json(activities, {
      headers: {
        'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30', // Shorter cache for fallback
        'X-Data-Source': 'fallback',
      },
    });
  }
}
