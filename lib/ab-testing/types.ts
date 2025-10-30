// lib/ab-testing/types.ts
// TypeScript types for A/B testing framework (FE-018)

/**
 * Represents a single variant in an A/B test
 */
export interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-1, must sum to 1 across all variants
  description?: string;
}

/**
 * Represents an A/B test configuration
 */
export interface ABTest {
  id: string;
  name: string;
  description?: string;
  variants: ABVariant[];
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  targetMetric?: string; // e.g., 'conversion_rate', 'cta_clicks'
}

/**
 * Represents a user's assignment to a variant
 */
export interface ABAssignment {
  testId: string;
  variantId: string;
  assignedAt: number; // timestamp
  userId?: string;
}

/**
 * Represents an event tracked in an A/B test
 */
export interface ABEvent {
  testId: string;
  variantId: string;
  eventName: string;
  eventValue?: number;
  timestamp: number;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Statistics for a variant
 */
export interface VariantStats {
  variantId: string;
  variantName: string;
  assignments: number;
  conversions: number;
  conversionRate: number;
  events: Record<string, number>; // event name -> count
}

/**
 * Test results with statistical analysis
 */
export interface ABTestResults {
  testId: string;
  testName: string;
  startDate: Date;
  endDate?: Date;
  variants: VariantStats[];
  winner?: string; // variantId of winning variant
  confidence?: number; // statistical confidence (0-1)
  pValue?: number; // p-value for statistical significance
}

/**
 * Cookie storage format for assignments
 */
export interface ABCookieData {
  [testId: string]: {
    variantId: string;
    assignedAt: number;
  };
}
