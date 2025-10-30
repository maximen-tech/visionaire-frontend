// lib/ab-testing/tests.ts
// A/B test configurations (FE-018)

import type { ABTest } from './types';

/**
 * Active A/B tests for Vision'AI're
 *
 * Add new tests here to register them globally
 */
export const AB_TESTS: ABTest[] = [
  // Test 1: Hero CTA Button Text
  {
    id: 'hero_cta_test',
    name: 'Hero CTA Button Text',
    description: 'Test benefit-focused vs. action-focused CTA on homepage hero',
    variants: [
      {
        id: 'control',
        name: 'Analyser Mon Site',
        weight: 0.5,
        description: 'Action-focused CTA (control)',
      },
      {
        id: 'opportunity',
        name: 'Découvrir Mes Opportunités',
        weight: 0.5,
        description: 'Benefit-focused CTA (variant)',
      },
    ],
    isActive: true,
    targetMetric: 'cta_click_rate',
    startDate: new Date('2025-10-30'),
  },

  // Test 2: Lead Form Layout
  {
    id: 'lead_form_test',
    name: 'Lead Form Layout',
    description: 'Test single-column vs. two-column lead form layout',
    variants: [
      {
        id: 'control',
        name: 'Single Column',
        weight: 0.5,
        description: 'Standard single-column form (control)',
      },
      {
        id: 'two_column',
        name: 'Two Column',
        weight: 0.5,
        description: 'Compact two-column form (variant)',
      },
    ],
    isActive: true,
    targetMetric: 'form_completion_rate',
    startDate: new Date('2025-10-30'),
  },

  // Test 3: Pricing Widget Position
  {
    id: 'pricing_position_test',
    name: 'Pricing Widget Position on Results',
    description: 'Test pricing calculator placement: below opportunities vs. sidebar',
    variants: [
      {
        id: 'control',
        name: 'Below Opportunities',
        weight: 0.5,
        description: 'Pricing widget in main content flow (control)',
      },
      {
        id: 'sidebar',
        name: 'Right Sidebar',
        weight: 0.5,
        description: 'Sticky pricing widget in sidebar (variant)',
      },
    ],
    isActive: true,
    targetMetric: 'pricing_widget_engagement',
    startDate: new Date('2025-10-30'),
  },

  // Test 4: Social Proof Position (FE-017 optimization)
  {
    id: 'social_proof_position_test',
    name: 'Social Proof Position on Homepage',
    description: 'Test testimonials position: after hero vs. after benefits',
    variants: [
      {
        id: 'control',
        name: 'After Hero',
        weight: 0.5,
        description: 'Testimonials immediately after hero section (control)',
      },
      {
        id: 'after_benefits',
        name: 'After Benefits',
        weight: 0.5,
        description: 'Testimonials after benefits section (variant)',
      },
    ],
    isActive: false, // Start inactive, activate manually
    targetMetric: 'scroll_depth',
    startDate: new Date('2025-11-15'),
  },

  // Test 5: ROI Calculator Defaults (FE-020 optimization)
  {
    id: 'roi_calculator_defaults_test',
    name: 'ROI Calculator Default Values',
    description: 'Test different default hourly rates to anchor pricing perception',
    variants: [
      {
        id: 'control',
        name: '50 $/h Default',
        weight: 0.33,
        description: 'Current default (control)',
      },
      {
        id: 'high_anchor',
        name: '100 $/h Default',
        weight: 0.33,
        description: 'Higher anchor to show more value (variant 1)',
      },
      {
        id: 'low_anchor',
        name: '25 $/h Default',
        weight: 0.34,
        description: 'Lower anchor to show accessibility (variant 2)',
      },
    ],
    isActive: false, // Start inactive, activate after initial data
    targetMetric: 'slider_engagement',
    startDate: new Date('2025-11-30'),
  },
];

/**
 * Get test configuration by ID
 */
export function getTestConfig(testId: string): ABTest | undefined {
  return AB_TESTS.find((test) => test.id === testId);
}

/**
 * Get all active tests
 */
export function getActiveTests(): ABTest[] {
  return AB_TESTS.filter((test) => test.isActive);
}

/**
 * Get all inactive tests
 */
export function getInactiveTests(): ABTest[] {
  return AB_TESTS.filter((test) => !test.isActive);
}
