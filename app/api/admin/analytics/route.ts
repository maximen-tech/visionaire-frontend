import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * GET /api/admin/analytics
 *
 * Returns aggregated analytics for admin dashboard:
 * - A/B test variant performance
 * - Email campaign metrics
 * - Lead conversion funnel
 *
 * Protected by session cookie (requires admin login)
 */
export async function GET(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_authenticated')?.value === 'true';

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // In production, these would come from a real database
    // For MVP, we'll return mock/localStorage-based data structure

    // A/B Test Results (from client-side tracking)
    const abTestResults = {
      hero_cta_test: {
        control: { views: 1247, clicks: 156, rate: 0.125 },
        opportunity: { views: 1198, clicks: 171, rate: 0.143 },
        winner: 'opportunity',
        improvement: '+14.4%',
      },
      lead_form_test: {
        control: { views: 423, submissions: 48, rate: 0.113 },
        multi_step: { views: 401, submissions: 57, rate: 0.142 },
        progressive: { views: 438, submissions: 61, rate: 0.139 },
        winner: 'multi_step',
        improvement: '+25.7%',
      },
      pricing_position_test: {
        control: { views: 512, interactions: 87, rate: 0.170 },
        sidebar: { views: 489, interactions: 94, rate: 0.192 },
        winner: 'sidebar',
        improvement: '+12.9%',
      },
    };

    // Email Campaign Metrics (would come from Resend webhooks in production)
    const emailMetrics = {
      drip_day1: {
        sent: 156,
        delivered: 154,
        opened: 98,
        clicked: 34,
        openRate: 0.636,
        clickRate: 0.221,
      },
      drip_day3: {
        sent: 142,
        delivered: 141,
        opened: 87,
        clicked: 29,
        openRate: 0.617,
        clickRate: 0.205,
      },
      drip_day7: {
        sent: 128,
        delivered: 127,
        opened: 76,
        clicked: 31,
        openRate: 0.598,
        clickRate: 0.244,
      },
      drip_day14: {
        sent: 114,
        delivered: 113,
        opened: 68,
        clicked: 27,
        openRate: 0.602,
        clickRate: 0.237,
      },
      totals: {
        sent: 540,
        delivered: 535,
        opened: 329,
        clicked: 121,
        openRate: 0.615,
        clickRate: 0.226,
      },
    };

    // Lead Conversion Funnel
    const conversionFunnel = {
      stages: [
        { name: 'Visites', count: 4523, rate: 1.0 },
        { name: 'Analyses démarrées', count: 687, rate: 0.152 },
        { name: 'Analyses terminées', count: 634, rate: 0.923 },
        { name: 'Résultats consultés', count: 512, rate: 0.808 },
        { name: 'Leads convertis', count: 166, rate: 0.324 },
        { name: 'Consultations réservées', count: 42, rate: 0.253 },
      ],
      conversionRate: 0.0093, // 0.93% overall (42/4523)
    };

    // Recent Activity (last 24h)
    const recentActivity = {
      analyses_started: 34,
      analyses_completed: 31,
      leads_converted: 7,
      emails_sent: 28,
      consultations_booked: 2,
    };

    // Variant Performance Comparison
    const variantPerformance = [
      {
        variant: 'Control (Single Form)',
        leads: 48,
        consultations: 11,
        conversionRate: 0.229,
        avgTimeToConversion: '4.2 days',
      },
      {
        variant: 'Multi-Step Form',
        leads: 57,
        consultations: 16,
        conversionRate: 0.281,
        avgTimeToConversion: '3.8 days',
      },
      {
        variant: 'Progressive Form',
        leads: 61,
        consultations: 15,
        conversionRate: 0.246,
        avgTimeToConversion: '4.1 days',
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        abTestResults,
        emailMetrics,
        conversionFunnel,
        recentActivity,
        variantPerformance,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/analytics/track
 *
 * Manually track an event (for testing)
 */
export async function POST(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_authenticated')?.value === 'true';

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { event, data } = body;

    // In production, this would save to database
    console.log('Manual event tracked:', { event, data });

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
      event,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
