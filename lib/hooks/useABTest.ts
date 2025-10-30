// lib/hooks/useABTest.ts
// React hooks for A/B testing (SSR-safe)

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getABTestingFramework } from '@/lib/ab-testing/framework';

/**
 * Hook to get the assigned variant for an A/B test
 *
 * Returns 'control' during SSR to avoid hydration mismatch,
 * then updates to the actual variant on client-side
 *
 * @param testId - The ID of the test
 * @param defaultVariant - The default variant to show during SSR (default: 'control')
 * @returns The assigned variant ID
 *
 * @example
 * ```tsx
 * const variant = useABTest('hero_cta_test');
 *
 * if (variant === 'opportunity') {
 *   return <button>Découvrir Mes Opportunités</button>;
 * }
 * return <button>Analyser Mon Site</button>;
 * ```
 */
export function useABTest(testId: string, defaultVariant: string = 'control'): string {
  const [variant, setVariant] = useState<string>(defaultVariant);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Get framework
    const framework = getABTestingFramework();

    // Assign variant (will use existing assignment if available)
    const assignedVariant = framework.assignVariant(testId);
    setVariant(assignedVariant);
  }, [testId]);

  // During SSR or before hydration, return default variant
  if (!isClient) {
    return defaultVariant;
  }

  return variant;
}

/**
 * Hook to track events for an A/B test
 *
 * Returns a function that tracks events for the current test/variant
 *
 * @param testId - The ID of the test
 * @returns A function to track events
 *
 * @example
 * ```tsx
 * const trackEvent = useABTrack('hero_cta_test');
 *
 * const handleClick = () => {
 *   trackEvent('cta_click');
 *   // ... rest of click handler
 * };
 * ```
 */
export function useABTrack(testId: string) {
  return useCallback(
    (eventName: string, eventValue?: number) => {
      const framework = getABTestingFramework();
      framework.trackEvent(testId, eventName, eventValue);
    },
    [testId]
  );
}

/**
 * Hook to track conversions for an A/B test
 *
 * Returns a function that tracks conversions for the current test/variant
 *
 * @param testId - The ID of the test
 * @returns A function to track conversions
 *
 * @example
 * ```tsx
 * const trackConversion = useABConversion('lead_form_test');
 *
 * const handleSubmit = async (data) => {
 *   await submitForm(data);
 *   trackConversion(1500); // Track with value
 * };
 * ```
 */
export function useABConversion(testId: string) {
  return useCallback(
    (value?: number) => {
      const framework = getABTestingFramework();
      framework.trackConversion(testId, value);
    },
    [testId]
  );
}

/**
 * Hook to get the current variant without triggering assignment
 *
 * Useful for checking variant in non-rendering contexts
 *
 * @param testId - The ID of the test
 * @returns The assigned variant ID or null if not assigned
 *
 * @example
 * ```tsx
 * const variant = useABVariant('hero_cta_test');
 *
 * if (variant === null) {
 *   // User not yet assigned
 * }
 * ```
 */
export function useABVariant(testId: string): string | null {
  const [variant, setVariant] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const framework = getABTestingFramework();
    const assignedVariant = framework.getVariant(testId);
    setVariant(assignedVariant);
  }, [testId]);

  if (!isClient) {
    return null;
  }

  return variant;
}
