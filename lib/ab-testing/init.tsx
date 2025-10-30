// lib/ab-testing/init.ts
// Initialize A/B testing framework

'use client';

import { useEffect, Fragment } from 'react';
import type { ReactNode } from 'react';
import { getABTestingFramework } from './framework';
import { AB_TESTS } from './tests';

/**
 * Initialize A/B testing framework with test configurations
 *
 * Call this once on app load (in root layout or provider)
 */
export function initializeABTesting(): void {
  if (typeof window === 'undefined') return;

  const framework = getABTestingFramework();
  framework.registerTests(AB_TESTS);

  if (process.env.NODE_ENV === 'development') {
    console.log('[A/B Testing] Initialized with', AB_TESTS.length, 'tests');
    console.log('[A/B Testing] Active tests:', framework.getActiveTests().map(t => t.id));
  }
}

/**
 * React component to initialize A/B testing
 *
 * Use this in your root layout:
 * ```tsx
 * <ABTestingProvider>
 *   {children}
 * </ABTestingProvider>
 * ```
 */
export function ABTestingProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeABTesting();
  }, []);

  return <Fragment>{children}</Fragment>;
}
