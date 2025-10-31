// app/api/stats/live/route.ts
// API endpoint for live stats (cached, 1-hour TTL)
// Connected to backend API with graceful fallback to mock data

import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 3600; // Cache for 1 hour

interface LiveStats {
  hours_saved_this_month: number;
  companies_analyzed: number;
  active_implementations: number;
  average_satisfaction: number;
}

// Mock data fallback (used if backend is unavailable)
const mockStats: LiveStats = {
  hours_saved_this_month: 2847,
  companies_analyzed: 127,
  active_implementations: 43,
  average_satisfaction: 4.8,
};

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://visionaire-bff-production.up.railway.app';

  try {
    // Attempt to fetch real stats from backend
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(`${backendUrl}/api/stats/live`, {
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

    const data = await response.json() as LiveStats;

    // Round numbers for credibility (as per spec)
    const roundedStats: LiveStats = {
      hours_saved_this_month: Math.round(data.hours_saved_this_month / 100) * 100,
      companies_analyzed: data.companies_analyzed,
      active_implementations: data.active_implementations,
      average_satisfaction: Math.round(data.average_satisfaction * 10) / 10,
    };

    return NextResponse.json(roundedStats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'X-Data-Source': 'backend',
      },
    });

  } catch (error) {
    // Fallback to mock data if backend is unavailable
    console.warn('[API Stats Live] Backend unavailable, using fallback data:', error);

    const roundedStats: LiveStats = {
      hours_saved_this_month: Math.round(mockStats.hours_saved_this_month / 100) * 100,
      companies_analyzed: mockStats.companies_analyzed,
      active_implementations: mockStats.active_implementations,
      average_satisfaction: Math.round(mockStats.average_satisfaction * 10) / 10,
    };

    return NextResponse.json(roundedStats, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200', // Shorter cache for fallback
        'X-Data-Source': 'fallback',
      },
    });
  }
}
