import { NextRequest, NextResponse } from 'next/server';
import { parseUnsubscribeToken } from '@/lib/email/drip-campaign';
import { addUnsubscribe, isUnsubscribed } from '@/lib/email/unsubscribe-storage';

/**
 * POST /api/email/unsubscribe
 *
 * Unsubscribe a user from email communications
 *
 * Expected payload:
 * {
 *   token: string,  // Base64 unsubscribe token
 *   reason?: string // Optional unsubscribe reason
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, reason } = body;

    // Validation
    if (!token) {
      return NextResponse.json(
        { error: 'Missing unsubscribe token' },
        { status: 400 }
      );
    }

    // Parse token
    const parsed = parseUnsubscribeToken(token);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 400 }
      );
    }

    const { email, analysisId } = parsed;

    // Check if already unsubscribed
    const alreadyUnsubscribed = await isUnsubscribed(email);
    if (alreadyUnsubscribed) {
      return NextResponse.json({
        success: true,
        message: 'Email is already unsubscribed',
        alreadyUnsubscribed: true,
        email,
      });
    }

    // Add to unsubscribe list
    const success = await addUnsubscribe(email, analysisId, reason);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe email' },
        { status: 500 }
      );
    }

    console.log('Unsubscribe successful:', { email, analysisId, reason });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
      email,
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/unsubscribe?token=xxx
 *
 * Check unsubscribe status for a token
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing unsubscribe token' },
        { status: 400 }
      );
    }

    // Parse token
    const parsed = parseUnsubscribeToken(token);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 400 }
      );
    }

    const { email } = parsed;

    // Check if unsubscribed
    const unsubscribed = await isUnsubscribed(email);

    return NextResponse.json({
      email,
      unsubscribed,
    });
  } catch (error) {
    console.error('Unsubscribe check error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
