/**
 * Next.js Middleware - Security Layer
 *
 * Runs on Edge Runtime before page rendering.
 * Adds security headers, validates requests, and blocks suspicious traffic.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function
 * Executes for every request matching the config.matcher
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get request info
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Security Headers (redundant with next.config.ts but ensures coverage)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Add request ID for tracing (useful for Sentry)
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);

  // Block known bad bots (basic protection)
  const badBots = [
    'semrush',
    'ahrefs',
    'mj12bot',
    'majestic',
    'dotbot',
    'megaindex',
  ];

  const isBot = badBots.some(bot => userAgent.toLowerCase().includes(bot));

  if (isBot && !pathname.startsWith('/api')) {
    // Block with 403 Forbidden
    return new NextResponse('Forbidden', { status: 403 });
  }

  // API Routes: Add additional security headers
  if (pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Static assets: Add caching headers
  if (
    pathname.startsWith('/_next/static') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js)$/)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

/**
 * Middleware Config
 * Specifies which routes should run the middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
