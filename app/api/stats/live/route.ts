// app/api/stats/live/route.ts
// API endpoint for live stats (cached, 1-hour TTL)

import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 3600; // Cache for 1 hour

interface LiveStats {
  hours_saved_this_month: number;
  companies_analyzed: number;
  active_implementations: number;
  average_satisfaction: number;
}

export async function GET() {
  // TODO: Replace with real backend API call when BE-006 is implemented
  // For now, return realistic mock data

  const stats: LiveStats = {
    hours_saved_this_month: 2847,
    companies_analyzed: 127,
    active_implementations: 43,
    average_satisfaction: 4.8,
  };

  // Round numbers for credibility (as per spec)
  const roundedStats: LiveStats = {
    hours_saved_this_month: Math.round(stats.hours_saved_this_month / 100) * 100, // Round to nearest 100
    companies_analyzed: stats.companies_analyzed,
    active_implementations: stats.active_implementations,
    average_satisfaction: Math.round(stats.average_satisfaction * 10) / 10, // Round to 1 decimal
  };

  return NextResponse.json(roundedStats, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
