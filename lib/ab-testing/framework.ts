// lib/ab-testing/framework.ts
// Core A/B testing framework (FE-018)

import type { ABTest, ABVariant, ABEvent } from './types';
import {
  getAssignmentWithFallback,
  saveAssignmentWithFallback,
  isBrowser,
} from './storage';
import {
  trackABTestAssignment,
  trackABTestConversion,
  trackABTestEvent,
} from '@/lib/analytics';

/**
 * Hash function for consistent variant assignment
 * Uses simple string hash to map userId + testId to a number 0-1
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

/**
 * Get or generate a consistent user ID
 */
function getUserId(): string {
  if (!isBrowser()) return 'ssr-user';

  // Check localStorage for existing ID
  let userId = localStorage.getItem('visionai_user_id');

  if (!userId) {
    // Generate new ID
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('visionai_user_id', userId);
  }

  return userId;
}

/**
 * Select a variant based on weights
 * Uses consistent hashing to ensure same user gets same variant
 */
function selectVariant(
  testId: string,
  variants: ABVariant[],
  userId: string
): ABVariant {
  // Validate weights sum to 1
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  if (Math.abs(totalWeight - 1.0) > 0.01) {
    console.warn(
      `Variant weights for test ${testId} don't sum to 1 (${totalWeight}). Normalizing...`
    );
    // Normalize weights
    variants = variants.map((v) => ({
      ...v,
      weight: v.weight / totalWeight,
    }));
  }

  // Hash userId + testId to get consistent value 0-1
  const hash = hashString(`${userId}_${testId}`);

  // Select variant based on cumulative weights
  let cumulative = 0;
  for (const variant of variants) {
    cumulative += variant.weight;
    if (hash < cumulative) {
      return variant;
    }
  }

  // Fallback to first variant (should never happen)
  return variants[0];
}

/**
 * A/B Testing Framework Class
 */
export class ABTestingFramework {
  private tests: Map<string, ABTest>;
  private userId: string | null = null;

  constructor() {
    this.tests = new Map();
    if (isBrowser()) {
      this.userId = getUserId();
    }
  }

  /**
   * Register a new A/B test
   */
  registerTest(test: ABTest): void {
    // Validate test
    if (!test.id || !test.variants || test.variants.length === 0) {
      throw new Error('Invalid test configuration');
    }

    // Validate weights
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    if (Math.abs(totalWeight - 1.0) > 0.01) {
      throw new Error(
        `Variant weights must sum to 1 (got ${totalWeight}) for test ${test.id}`
      );
    }

    this.tests.set(test.id, test);
  }

  /**
   * Register multiple tests at once
   */
  registerTests(tests: ABTest[]): void {
    tests.forEach((test) => this.registerTest(test));
  }

  /**
   * Get a specific test configuration
   */
  getTest(testId: string): ABTest | undefined {
    return this.tests.get(testId);
  }

  /**
   * Get all active tests
   */
  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter((test) => test.isActive);
  }

  /**
   * Assign a variant to the current user for a test
   * Returns the variant ID
   */
  assignVariant(testId: string): string {
    if (!isBrowser()) {
      // SSR: return first variant (control)
      const test = this.tests.get(testId);
      return test?.variants[0]?.id || 'control';
    }

    // Check if user already has an assignment
    const existingAssignment = getAssignmentWithFallback(testId);
    if (existingAssignment) {
      return existingAssignment;
    }

    // Get test configuration
    const test = this.tests.get(testId);
    if (!test) {
      console.warn(`Test ${testId} not found. Returning 'control'.`);
      return 'control';
    }

    if (!test.isActive) {
      console.warn(`Test ${testId} is not active. Returning first variant.`);
      return test.variants[0].id;
    }

    // Assign variant
    const userId = this.userId || getUserId();
    const selectedVariant = selectVariant(testId, test.variants, userId);

    // Save assignment
    saveAssignmentWithFallback(testId, selectedVariant.id);

    // Track assignment to GA4
    trackABTestAssignment(testId, selectedVariant.id);

    return selectedVariant.id;
  }

  /**
   * Get the assigned variant for a test (without reassigning)
   */
  getVariant(testId: string): string | null {
    if (!isBrowser()) return null;
    return getAssignmentWithFallback(testId);
  }

  /**
   * Track an event for a test
   */
  trackEvent(testId: string, eventName: string, eventValue?: number): void {
    if (!isBrowser()) return;

    const variantId = this.getVariant(testId);
    if (!variantId) {
      console.warn(`No variant assigned for test ${testId}. Skipping event tracking.`);
      return;
    }

    const event: ABEvent = {
      testId,
      variantId,
      eventName,
      eventValue,
      timestamp: Date.now(),
      userId: this.userId || undefined,
    };

    // Track to GA4
    trackABTestEvent(testId, variantId, eventName, eventValue);

    // Optionally save to localStorage for dashboard
    this.saveEventToLocalStorage(event);
  }

  /**
   * Track a conversion (success event)
   */
  trackConversion(testId: string, value?: number): void {
    if (!isBrowser()) return;

    const variantId = this.getVariant(testId);
    if (!variantId) {
      console.warn(`No variant assigned for test ${testId}. Skipping conversion tracking.`);
      return;
    }

    // Track to GA4
    trackABTestConversion(testId, variantId, value);

    // Track as event
    this.trackEvent(testId, 'conversion', value);
  }

  /**
   * Save event to localStorage for admin dashboard
   */
  private saveEventToLocalStorage(event: ABEvent): void {
    if (!isBrowser()) return;

    try {
      const key = `visionai_ab_events`;
      const existing = localStorage.getItem(key);
      const events: ABEvent[] = existing ? JSON.parse(existing) : [];

      // Add new event
      events.push(event);

      // Keep only last 1000 events
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }

      localStorage.setItem(key, JSON.stringify(events));
    } catch (error) {
      console.error('Failed to save event to localStorage:', error);
    }
  }

  /**
   * Get events from localStorage (for dashboard)
   */
  getEventsFromLocalStorage(): ABEvent[] {
    if (!isBrowser()) return [];

    try {
      const key = `visionai_ab_events`;
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to read events from localStorage:', error);
      return [];
    }
  }

  /**
   * Clear all events from localStorage
   */
  clearEvents(): void {
    if (!isBrowser()) return;
    localStorage.removeItem('visionai_ab_events');
  }
}

// Singleton instance
let frameworkInstance: ABTestingFramework | null = null;

/**
 * Get the global A/B testing framework instance
 */
export function getABTestingFramework(): ABTestingFramework {
  if (!frameworkInstance) {
    frameworkInstance = new ABTestingFramework();
  }
  return frameworkInstance;
}

/**
 * Initialize A/B testing with test configurations
 */
export function initializeABTesting(tests: ABTest[]): void {
  const framework = getABTestingFramework();
  framework.registerTests(tests);
}
