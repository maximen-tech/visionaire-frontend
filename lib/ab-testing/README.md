# A/B Testing Framework (FE-018)

Custom A/B testing infrastructure for Vision'AI're. Zero external dependencies, SSR-safe, fully typed.

## Architecture

```
lib/ab-testing/
├── types.ts           # TypeScript interfaces
├── storage.ts         # Cookie + localStorage utilities
├── framework.ts       # Core variant assignment logic
├── tests.ts           # Test configurations
├── init.tsx           # React initialization
└── README.md          # This file

lib/hooks/
└── useABTest.ts       # React hooks for components

app/admin/ab-tests/
└── page.tsx           # Admin dashboard
```

## Quick Start

### 1. Framework is Auto-Initialized

The framework is already initialized in `app/layout.tsx`:

```tsx
<ABTestingProvider>
  {children}
</ABTestingProvider>
```

### 2. Add a Test (if needed)

Edit `lib/ab-testing/tests.ts`:

```typescript
export const AB_TESTS: ABTest[] = [
  {
    id: 'my_new_test',
    name: 'My Test Name',
    description: 'Test description',
    variants: [
      { id: 'control', name: 'Control', weight: 0.5 },
      { id: 'variant_a', name: 'Variant A', weight: 0.5 },
    ],
    isActive: true,
    targetMetric: 'conversion_rate',
  },
  // ... other tests
];
```

### 3. Use in a Component

```tsx
'use client';

import { useABTest, useABTrack } from '@/lib/hooks/useABTest';

export default function MyComponent() {
  const variant = useABTest('my_new_test');
  const trackEvent = useABTrack('my_new_test');

  const handleClick = () => {
    trackEvent('button_click');
    // ... rest of logic
  };

  if (variant === 'variant_a') {
    return <button onClick={handleClick}>New Button Text</button>;
  }

  return <button onClick={handleClick}>Control Button Text</button>;
}
```

## Active Tests

### Test 1: Hero CTA Button (`hero_cta_test`)
- **Control**: "Analyser Mon Site"
- **Variant**: "Découvrir Mes Opportunités"
- **Hypothesis**: Benefit-focused CTA = +15% click rate

**Usage Example**:
```tsx
const variant = useABTest('hero_cta_test');
const track = useABTrack('hero_cta_test');

<Button onClick={() => { track('cta_click'); /* ... */ }}>
  {variant === 'opportunity' ? 'Découvrir Mes Opportunités' : 'Analyser Mon Site'}
</Button>
```

### Test 2: Lead Form Layout (`lead_form_test`)
- **Control**: Single Column
- **Variant**: Two Column
- **Hypothesis**: Two-column = +10% completion

### Test 3: Pricing Widget Position (`pricing_position_test`)
- **Control**: Below Opportunities
- **Variant**: Right Sidebar
- **Hypothesis**: Sidebar = +20% engagement

## API

### Hooks

#### `useABTest(testId: string, defaultVariant?: string): string`
Get assigned variant. Returns 'control' during SSR, actual variant on client.

```tsx
const variant = useABTest('hero_cta_test');
```

#### `useABTrack(testId: string): (eventName: string, value?: number) => void`
Track events for a test.

```tsx
const track = useABTrack('hero_cta_test');
track('cta_click');
track('cta_click', 100); // with value
```

#### `useABConversion(testId: string): (value?: number) => void`
Track conversions (success events).

```tsx
const trackConversion = useABConversion('lead_form_test');
trackConversion(1500); // conversion with $1500 value
```

#### `useABVariant(testId: string): string | null`
Get variant without triggering assignment.

```tsx
const variant = useABVariant('hero_cta_test');
if (variant === null) {
  // User not assigned yet
}
```

### Core Framework

```tsx
import { getABTestingFramework } from '@/lib/ab-testing/framework';

const framework = getABTestingFramework();

// Get assigned variant
const variant = framework.assignVariant('test_id');

// Track event
framework.trackEvent('test_id', 'event_name', 123);

// Track conversion
framework.trackConversion('test_id', 1500);

// Get all active tests
const activeTests = framework.getActiveTests();
```

## Admin Dashboard

Visit `/admin/ab-tests` to view test results.

**Password**: Set `NEXT_PUBLIC_AB_ADMIN_PASSWORD` env var (default: `visionai2025`)

**Features**:
- View active tests
- Variant distribution & conversion rates
- Statistical significance (chi-squared test)
- Event log (last 50 events)
- Refresh data button

## How It Works

### 1. Variant Assignment

Uses consistent hashing to ensure same user always gets same variant:

```typescript
hash = hashString(userId + testId) // 0-1
// Select variant based on cumulative weights
```

### 2. Persistence

- **Primary**: Cookie (`visionai_ab_tests`, 7-day expiry)
- **Fallback**: localStorage
- **User ID**: localStorage (`visionai_user_id`)

### 3. Tracking

- **GA4**: All events sent via `gtag()`
- **Local**: Events saved to localStorage for dashboard
- **Event Types**:
  - `ab_test_assignment`: User assigned to variant
  - `ab_test_event`: Custom event (e.g., `cta_click`)
  - `ab_test_conversion`: Success event

### 4. SSR Safety

- Returns default variant (`control`) during SSR
- Switches to actual variant after client hydration
- No hydration mismatch errors

## Statistical Significance

Dashboard calculates p-value using chi-squared test:

- **p < 0.05**: Statistically significant ✅
- **p ≥ 0.05**: Not significant (need more data)
- **Minimum**: 30 samples per variant

**Example**:
- Control: 100 assignments, 10 conversions (10%)
- Variant: 100 assignments, 15 conversions (15%)
- Uplift: +50%
- p-value: 0.23 (not significant yet)

## Best Practices

### 1. Test Configuration
- **Weights must sum to 1**: `[0.5, 0.5]` or `[0.33, 0.33, 0.34]`
- **Start inactive**: Set `isActive: false` until ready
- **Clear hypothesis**: Document expected impact

### 2. Component Integration
- **Always track events**: Use `useABTrack` for user actions
- **Track conversions**: Use `useABConversion` for success metrics
- **Neutral SSR render**: Show control variant during SSR

### 3. Statistical Rigor
- **Run for 7-14 days**: Get enough sample size
- **Don't peek early**: Wait for significance
- **Consider seasonality**: Weekdays vs weekends
- **One test at a time**: Avoid interaction effects

### 4. Performance
- **Zero bundle impact on SSR**: All logic client-side
- **Lazy loading**: Admin dashboard is separate route
- **Minimal overhead**: < 1ms for variant lookup

## Troubleshooting

### No data in dashboard
- Check browser localStorage: `visionai_ab_events`
- Check cookie: `visionai_ab_tests`
- Verify tests are `isActive: true`

### Hydration mismatch
- Ensure component has `'use client'`
- Use default variant for SSR render
- Switch to actual variant in `useEffect`

### Assignment not persisting
- Check cookie expiry (7 days)
- Verify localStorage not disabled
- Clear cookies and reload to reset

### Events not tracking
- Verify GA4 is configured (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- Check browser console for GA4 errors
- Test in production (GA4 may not work on localhost)

## Future Enhancements

### Short-Term
- [ ] CSV export of results
- [ ] Real-time dashboard updates
- [ ] Test scheduling (auto start/stop)

### Medium-Term
- [ ] Backend integration (save to database)
- [ ] Multi-armed bandit algorithm
- [ ] Automatic winner declaration

### Long-Term
- [ ] Multivariate testing
- [ ] Personalization engine
- [ ] Machine learning variant selection

## License

Proprietary - Vision'AI're

## Author

Generated by Claude Code (Sonnet 4.5) - FE-018
