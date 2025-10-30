import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * POST /api/admin/login
 *
 * Simple password authentication for admin dashboard
 * Sets a session cookie on success
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Check password against environment variable
    const correctPassword = process.env.ADMIN_PASSWORD || 'visionai2025';

    if (password === correctPassword) {
      // Set authenticated cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/login
 *
 * Logout: Clear authentication cookie
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_authenticated');

  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}

/**
 * GET /api/admin/login
 *
 * Check authentication status
 */
export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_authenticated')?.value === 'true';

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}
