# Phase 4B: Conversion Optimization

**Sprint Duration**: 10-12 hours (2-3 days)
**Priority**: P4 (High Impact)
**Dependencies**: Phase 3 complete
**Business Goal**: Increase conversion rate by +30%, improve lead quality by +40%

---

## 📊 Problem Statement

**Current State**:
- Lead form conversion: ~18% (baseline)
- No A/B testing infrastructure to optimize funnels
- Single form variant (no personalization)
- No value demonstration before form submission
- Uncertain about optimal CTA copy, colors, placement

**Desired State**:
- Systematic A/B testing framework for data-driven decisions
- Multiple lead form variants (multi-step, progressive disclosure)
- ROI calculator shows value before asking for contact info
- Exit-intent popup captures abandoning visitors
- Conversion rate: 25%+ (from 18% baseline = +38% improvement)

**Success Metrics**:
- Overall conversion rate: 18% → 25%+ (+38% improvement)
- Form completion rate: 65%+ (multi-step forms)
- Exit-intent popup conversion: 8-12% of abandoners
- ROI calculator engagement: >40% of results page visitors
- Lead quality score: +40% (measured by consultation booking rate)

---

## 🎯 Tasks Overview

### FE-018: A/B Testing Infrastructure (4h)
**Goal**: Build framework for systematic conversion optimization experiments

**Deliverables**:
1. A/B test configuration system
2. Variant rendering engine (client-side)
3. Google Analytics 4 integration (custom events)
4. Test dashboard (view results, declare winners)
5. 3 initial tests (CTA button, hero headline, form layout)

---

### FE-019: Lead Form Variants (4h)
**Goal**: Test different form approaches to maximize completion

**Deliverables**:
1. Multi-step form (reduce cognitive load)
2. Progressive disclosure variant (email first, phone later)
3. Exit-intent popup (last chance offer)
4. Smart conditional fields (show/hide based on input)
5. Form analytics (field-level drop-off tracking)

---

### FE-020: Pricing Calculator Widget (3h)
**Goal**: Demonstrate ROI before asking for contact info

**Deliverables**:
1. Interactive ROI calculator (hourly rate → annual savings)
2. Comparison matrix (DIY vs Expert implementation)
3. Payment plan options (if offering services)
4. Embedded widget (results page, homepage)
5. Lead magnet (detailed report after email submission)

---

## 📋 FE-018: A/B Testing Infrastructure

### 1. A/B Testing Approach

**Decision: Client-Side Testing with Google Analytics 4**

**Why NOT Google Optimize?**
- Google Optimize sunsetted (September 2023)
- Alternatives: Optimizely ($$$), VWO ($$$), Statsig ($$)
- **Best for MVP**: Custom client-side testing + GA4 (free, flexible)

**Custom A/B Framework Benefits**:
- ✅ Zero cost
- ✅ Full control over variants
- ✅ Type-safe (TypeScript)
- ✅ GA4 integration (already installed)
- ✅ Lightweight (~2 kB)
- ❌ Manual statistical significance calculation (acceptable for MVP)

---

### 2. A/B Test Configuration System

**File**: `lib/ab-testing/config.ts`

```typescript
export type VariantId = string;

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  allocation: Record<VariantId, number>; // e.g., { control: 50, variant_a: 50 }
  variants: Record<VariantId, ABVariant>;
  targetUrl?: string; // Run only on specific pages
  conversionEvent: string; // GA4 event name
}

export interface ABVariant {
  id: VariantId;
  name: string;
  description: string;
  changes: Record<string, any>; // Component props or config
}

// Example test configuration
export const AB_TESTS: Record<string, ABTest> = {
  homepage_cta_button: {
    id: 'homepage_cta_button',
    name: 'Homepage CTA Button',
    description: 'Test button color and copy',
    status: 'running',
    startDate: new Date('2025-11-01'),
    allocation: { control: 50, cyan_variant: 50 },
    variants: {
      control: {
        id: 'control',
        name: 'Control (Green)',
        description: 'Original green button with "Analyser Mon Site"',
        changes: {
          buttonColor: 'green',
          buttonText: 'Analyser Mon Site Gratuitement',
        },
      },
      cyan_variant: {
        id: 'cyan_variant',
        name: 'Variant A (Cyan)',
        description: 'Cyan button with "Découvrir Mes Opportunités"',
        changes: {
          buttonColor: 'cyan',
          buttonText: 'Découvrir Mes Opportunités →',
        },
      },
    },
    targetUrl: '/',
    conversionEvent: 'analysis_submitted',
  },
  hero_headline: {
    id: 'hero_headline',
    name: 'Hero Headline',
    description: 'Test value proposition clarity',
    status: 'running',
    startDate: new Date('2025-11-01'),
    allocation: { control: 50, time_focused: 50 },
    variants: {
      control: {
        id: 'control',
        name: 'Control (Original)',
        description: 'Original headline about digital maturity',
        changes: {
          headline: 'Analysez Votre Maturité Digitale en 2 Minutes',
          subheadline: 'Découvrez vos opportunités d\'automatisation',
        },
      },
      time_focused: {
        id: 'time_focused',
        name: 'Variant A (Time-Focused)',
        description: 'Emphasize time savings',
        changes: {
          headline: 'Récupérez 200 Heures par An Grâce à l\'IA',
          subheadline: 'Analyse gratuite de vos processus en 2 minutes',
        },
      },
    },
    targetUrl: '/',
    conversionEvent: 'analysis_submitted',
  },
  results_form_layout: {
    id: 'results_form_layout',
    name: 'Results Page Form Layout',
    description: 'Test single-step vs multi-step form',
    status: 'running',
    startDate: new Date('2025-11-05'),
    allocation: { control: 50, multi_step: 50 },
    variants: {
      control: {
        id: 'control',
        name: 'Control (Single-Step)',
        description: 'All fields visible at once',
        changes: { formType: 'single-step' },
      },
      multi_step: {
        id: 'multi_step',
        name: 'Variant A (Multi-Step)',
        description: '3-step form (name → email → phone)',
        changes: { formType: 'multi-step' },
      },
    },
    targetUrl: '/results/[id]',
    conversionEvent: 'lead_submitted',
  },
};
```

---

### 3. Variant Assignment Engine

**File**: `lib/ab-testing/assignment.ts`

```typescript
import { ABTest, VariantId } from './config';

// Persistent variant assignment (stored in localStorage)
const STORAGE_KEY = 'ab_test_assignments';

interface Assignment {
  testId: string;
  variantId: VariantId;
  assignedAt: Date;
}

export function getVariant(test: ABTest): VariantId {
  // Check if user already assigned
  const existing = getExistingAssignment(test.id);
  if (existing) return existing;

  // Assign new variant based on allocation weights
  const variantId = assignVariant(test);

  // Persist assignment
  saveAssignment({ testId: test.id, variantId, assignedAt: new Date() });

  // Track in GA4
  trackABTestAssignment(test.id, variantId);

  return variantId;
}

function assignVariant(test: ABTest): VariantId {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const [variantId, weight] of Object.entries(test.allocation)) {
    cumulative += weight;
    if (random <= cumulative) {
      return variantId;
    }
  }

  // Fallback to control
  return 'control';
}

function getExistingAssignment(testId: string): VariantId | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const assignments: Assignment[] = JSON.parse(stored);
  const found = assignments.find((a) => a.testId === testId);

  return found?.variantId || null;
}

function saveAssignment(assignment: Assignment) {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const assignments: Assignment[] = stored ? JSON.parse(stored) : [];

  // Remove old assignment for same test
  const filtered = assignments.filter((a) => a.testId !== assignment.testId);
  filtered.push(assignment);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function trackABTestAssignment(testId: string, variantId: VariantId) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_assigned', {
      test_id: testId,
      variant_id: variantId,
    });
  }
}
```

---

### 4. React Hook for A/B Tests

**File**: `lib/ab-testing/useABTest.ts`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { AB_TESTS } from './config';
import { getVariant } from './assignment';
import type { ABTest, VariantId, ABVariant } from './config';

export function useABTest(testId: string) {
  const [variant, setVariant] = useState<ABVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const test = AB_TESTS[testId];
    if (!test) {
      console.warn(`A/B test "${testId}" not found`);
      setIsLoading(false);
      return;
    }

    // Skip if test not running
    if (test.status !== 'running') {
      setVariant(test.variants.control);
      setIsLoading(false);
      return;
    }

    // Get assigned variant
    const variantId = getVariant(test);
    setVariant(test.variants[variantId]);
    setIsLoading(false);
  }, [testId]);

  return { variant, isLoading };
}

// Track conversion event
export function trackConversion(testId: string, eventName: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      test_id: testId,
      value,
    });
  }
}
```

---

### 5. Usage in Components

**Example: Homepage CTA Button**

```tsx
// app/page.tsx

'use client';

import { useABTest, trackConversion } from '@/lib/ab-testing/useABTest';

export default function HomePage() {
  const { variant, isLoading } = useABTest('homepage_cta_button');

  const handleSubmit = async (url: string) => {
    // Track conversion
    trackConversion('homepage_cta_button', 'analysis_submitted');

    // Existing submission logic
    await submitAnalysis(url);
  };

  if (isLoading) return <Skeleton />;

  const buttonColor = variant?.changes.buttonColor || 'green';
  const buttonText = variant?.changes.buttonText || 'Analyser Mon Site';

  return (
    <div>
      <button
        className={`btn-${buttonColor}`}
        onClick={() => handleSubmit(inputUrl)}
      >
        {buttonText}
      </button>
    </div>
  );
}
```

**Example: Hero Headline**

```tsx
'use client';

import { useABTest } from '@/lib/ab-testing/useABTest';

export default function HeroSection() {
  const { variant } = useABTest('hero_headline');

  const headline = variant?.changes.headline || 'Analysez Votre Maturité Digitale';
  const subheadline = variant?.changes.subheadline || 'Découvrez vos opportunités';

  return (
    <div>
      <h1>{headline}</h1>
      <p>{subheadline}</p>
    </div>
  );
}
```

---

### 6. Results Dashboard

**Component**: `app/admin/ab-tests/page.tsx` (admin-only)

**Features**:
1. List all tests (status, dates, conversion rates)
2. View test details (variants, allocations)
3. Declare winner (manually or auto at significance threshold)
4. Export results (CSV for external analysis)

**Statistical Significance Calculator**:
```typescript
// lib/ab-testing/stats.ts

interface TestResults {
  control: { conversions: number; visitors: number };
  variant: { conversions: number; visitors: number };
}

export function calculateSignificance(results: TestResults): {
  pValue: number;
  isSignificant: boolean; // p < 0.05
  uplift: number; // % improvement
  confidence: number; // 95% confidence interval
} {
  const controlRate = results.control.conversions / results.control.visitors;
  const variantRate = results.variant.conversions / results.variant.visitors;

  // Z-test for proportions
  const pooledRate =
    (results.control.conversions + results.variant.conversions) /
    (results.control.visitors + results.variant.visitors);

  const se = Math.sqrt(
    pooledRate *
      (1 - pooledRate) *
      (1 / results.control.visitors + 1 / results.variant.visitors)
  );

  const zScore = (variantRate - controlRate) / se;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore))); // Two-tailed test

  return {
    pValue,
    isSignificant: pValue < 0.05,
    uplift: ((variantRate - controlRate) / controlRate) * 100,
    confidence: 95,
  };
}

// Normal CDF approximation (for p-value calculation)
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}
```

**Dashboard UI**:
- Table: Test name, status, start date, sample size, conversion rates, p-value
- Badge: "✅ Significant" or "⏳ Collecting data"
- Winner declaration button (if p < 0.05 and sufficient sample size)

---

### 7. Implementation Checklist (FE-018)

**Day 1: Core Framework** (2h)
- [ ] Create `lib/ab-testing/` directory
- [ ] Build config system (`config.ts`)
- [ ] Build assignment engine (`assignment.ts`)
- [ ] Create `useABTest` hook
- [ ] Add GA4 tracking events

**Day 2: Initial Tests** (1.5h)
- [ ] Implement homepage CTA button test
- [ ] Implement hero headline test
- [ ] Implement results form layout test
- [ ] Test variant assignment (localStorage persistence)
- [ ] Verify GA4 events firing

**Day 3: Dashboard** (30min)
- [ ] Create admin dashboard route (`/admin/ab-tests`)
- [ ] Build results table component
- [ ] Add statistical significance calculator
- [ ] Add winner declaration UI

---

## 📋 FE-019: Lead Form Variants

### 1. Multi-Step Form

**Goal**: Reduce cognitive load, increase completion rate

**Component**: `components/LeadForm/MultiStepForm.tsx`

**Steps**:
1. **Step 1: Identity** (name + company)
2. **Step 2: Contact** (email + phone)
3. **Step 3: Context** (urgency + consultation preference)

**UX Principles**:
- Progress indicator (1/3, 2/3, 3/3)
- Back button (allow corrections)
- Field validation on step transition
- Autosave (persist to localStorage)
- Mobile-optimized (large touch targets)

**Code Structure**:
```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 1, title: 'Qui êtes-vous?', fields: ['name', 'company'] },
  { id: 2, title: 'Comment vous joindre?', fields: ['email', 'phone'] },
  { id: 3, title: 'Vos besoins', fields: ['urgency', 'consultation'] },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="multi-step-form">
      <ProgressBar current={currentStep} total={STEPS.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {currentStep === 1 && <StepOne data={formData} onChange={setFormData} />}
          {currentStep === 2 && <StepTwo data={formData} onChange={setFormData} />}
          {currentStep === 3 && <StepThree data={formData} onChange={setFormData} />}
        </motion.div>
      </AnimatePresence>

      <div className="button-group">
        {currentStep > 1 && (
          <button onClick={handleBack} className="btn-secondary">
            ← Retour
          </button>
        )}
        <button onClick={handleNext} className="btn-primary">
          {currentStep === STEPS.length ? 'Soumettre' : 'Suivant →'}
        </button>
      </div>
    </div>
  );
}
```

**Form Analytics**:
- Track step progression (step_1_started, step_1_completed, etc.)
- Track drop-off rate per step
- Track time spent per step
- Track back button usage

---

### 2. Progressive Disclosure Variant

**Goal**: Minimize initial commitment, reduce friction

**Component**: `components/LeadForm/ProgressiveDisclosureForm.tsx`

**Flow**:
1. **Initial ask**: Email only ("Recevez votre analyse détaillée")
2. **After email**: Name + company (optional, incentivized)
3. **Final ask**: Phone (for consultation booking)

**Incentivization**:
- Email → Detailed PDF report
- Name + Company → Personalized recommendations
- Phone → Priority consultation booking

**Visual Design**:
- Step 1: Large email input (hero treatment)
- Step 2: Slide-in panel (after email submitted)
- Step 3: Modal (triggered when user clicks "Book Consultation")

**Code Skeleton**:
```tsx
export default function ProgressiveDisclosureForm() {
  const [stage, setStage] = useState<'email' | 'details' | 'phone'>('email');
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async () => {
    // Submit email, send PDF
    await sendPDFReport(email);

    // Ask for more details
    setStage('details');
  };

  return (
    <>
      {stage === 'email' && <EmailCapture onSubmit={handleEmailSubmit} />}
      {stage === 'details' && <DetailsCapture email={email} onComplete={() => setStage('phone')} />}
      {stage === 'phone' && <PhoneCapture email={email} />}
    </>
  );
}
```

---

### 3. Exit-Intent Popup

**Goal**: Capture abandoning visitors with last-chance offer

**Component**: `components/LeadForm/ExitIntentModal.tsx`

**Trigger Logic**:
```typescript
// lib/hooks/useExitIntent.ts

export function useExitIntent(callback: () => void) {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves top of viewport (user going to close tab)
      if (e.clientY <= 0) {
        callback();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [callback]);
}
```

**Offer**:
- "Attendez! Avant de partir..."
- Special offer: "Guide gratuit: 10 automatisations rapides pour PME"
- Email capture for lead magnet
- CTA: "Recevoir le Guide Gratuit"

**Constraints**:
- Show only once per session (cookie-based)
- Delay: 10 seconds minimum on page
- Don't show if user already submitted form

**A/B Test Variants**:
- Variant A: Guide offer
- Variant B: Discount offer ("10% off consultation")
- Variant C: Social proof ("Join 127 companies already automating")

---

### 4. Smart Conditional Fields

**Goal**: Show/hide fields based on user input

**Examples**:

**Conditional 1: Urgency-Based**
```
User selects urgency: "Urgent (< 1 mois)"
→ Show: "Quand pouvons-nous vous appeler?" (datetime picker)
→ Auto-prioritize in CRM
```

**Conditional 2: Sector-Based**
```
User selects sector: "Commerce de détail"
→ Show: "Nombre de points de vente?" (number input)
→ Adjust recommendations based on scale
```

**Conditional 3: Budget-Based**
```
User indicates budget: "< 5000 $ CAD"
→ Show: "DIY vs Expert" toggle
→ Suggest self-implementation path vs full-service
```

**Implementation**:
```tsx
const showPhoneField = formData.urgency === 'urgent';
const showStoreCount = formData.sector === 'retail';

return (
  <form>
    <Select name="urgency" onChange={handleChange} />
    {showPhoneField && <Input name="phone" label="Téléphone" />}

    <Select name="sector" onChange={handleChange} />
    {showStoreCount && <Input name="store_count" label="Points de vente" />}
  </form>
);
```

---

### 5. Form Analytics (Field-Level)

**Goal**: Identify drop-off points, optimize problematic fields

**Events to Track**:
```typescript
// Field interactions
trackFormEvent('field_focused', { field: 'email' });
trackFormEvent('field_completed', { field: 'email', time_spent: 5.2 });
trackFormEvent('field_error', { field: 'phone', error: 'invalid_format' });

// Form-level
trackFormEvent('form_started', { variant: 'multi_step' });
trackFormEvent('form_submitted', { variant: 'multi_step', completion_time: 45 });
trackFormEvent('form_abandoned', { last_field: 'phone', progress: 75 });
```

**Dashboard Metrics**:
- Completion rate by variant
- Average time to complete
- Drop-off rate by field
- Error rate by field
- Back button usage (multi-step)

---

### 6. Implementation Checklist (FE-019)

**Day 1: Multi-Step Form** (2h)
- [ ] Build MultiStepForm component
- [ ] Create step components (StepOne, StepTwo, StepThree)
- [ ] Add progress bar and navigation
- [ ] Implement field validation
- [ ] Add form analytics events

**Day 2: Progressive Disclosure & Exit-Intent** (1.5h)
- [ ] Build ProgressiveDisclosureForm component
- [ ] Create EmailCapture, DetailsCapture, PhoneCapture
- [ ] Build ExitIntentModal component
- [ ] Implement useExitIntent hook
- [ ] Add session-based display logic

**Day 3: Conditional Fields & Analytics** (30min)
- [ ] Implement conditional field logic
- [ ] Add field-level analytics tracking
- [ ] Create form analytics dashboard (admin)
- [ ] A/B test setup (single-step vs multi-step)

---

## 📋 FE-020: Pricing Calculator Widget

### 1. ROI Calculator

**Goal**: Show value proposition before asking for contact info

**Component**: `components/PricingCalculator/ROICalculator.tsx`

**Inputs**:
1. Hourly rate ($ CAD/hour) - Slider (20-500)
2. Hours to save per week (auto-filled from analysis, editable)
3. Implementation time estimate (auto-calculated from complexity)

**Outputs**:
1. Weekly savings ($ CAD)
2. Monthly savings ($ CAD)
3. Annual savings ($ CAD)
4. ROI percentage (annual savings / implementation cost × 100)
5. Break-even timeline (weeks until ROI positive)

**Visual Design**:
- Interactive slider (real-time updates)
- Large numbers (emphasize value)
- Gradient progress bars
- Confetti animation when ROI > 500%

**Code Structure**:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ROICalculatorProps {
  defaultHoursPerWeek: number;
  defaultComplexity: number;
}

export default function ROICalculator({
  defaultHoursPerWeek,
  defaultComplexity,
}: ROICalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultHoursPerWeek);

  // Calculate implementation cost
  const implementationHours = calculateImplementationTime(defaultComplexity);
  const implementationCost = implementationHours * hourlyRate;

  // Calculate savings
  const weeklySavings = hoursPerWeek * hourlyRate;
  const monthlySavings = weeklySavings * 4.33;
  const annualSavings = weeklySavings * 52;

  // Calculate ROI
  const roi = ((annualSavings - implementationCost) / implementationCost) * 100;
  const breakEvenWeeks = Math.ceil(implementationCost / weeklySavings);

  return (
    <div className="roi-calculator">
      <h3>Calculateur de ROI</h3>

      <label>Votre taux horaire: {hourlyRate} $ CAD/h</label>
      <input
        type="range"
        min={20}
        max={500}
        step={10}
        value={hourlyRate}
        onChange={(e) => setHourlyRate(Number(e.target.value))}
      />

      <label>Heures économisées: {hoursPerWeek}h/semaine</label>
      <input
        type="range"
        min={1}
        max={40}
        step={1}
        value={hoursPerWeek}
        onChange={(e) => setHoursPerWeek(Number(e.target.value))}
      />

      <div className="results">
        <ResultCard
          label="Économies Annuelles"
          value={formatCAD(annualSavings)}
          color="green"
        />
        <ResultCard
          label="Coût d'Implémentation"
          value={formatCAD(implementationCost)}
          color="yellow"
        />
        <ResultCard
          label="ROI"
          value={`${Math.round(roi)}%`}
          color={roi > 300 ? 'green' : 'yellow'}
        />
        <ResultCard
          label="Seuil de Rentabilité"
          value={`${breakEvenWeeks} semaines`}
          color="cyan"
        />
      </div>

      {roi > 500 && <ConfettiEffect />}
    </div>
  );
}

function calculateImplementationTime(complexity: number): number {
  // Expert implementation: 2-10 hours depending on complexity
  return 2 + (complexity / 10) * 8;
}
```

---

### 2. Comparison Matrix

**Goal**: DIY vs Expert implementation comparison

**Component**: `components/PricingCalculator/ComparisonMatrix.tsx`

**Comparison Points**:
| Criteria | DIY (Self-Implementation) | Expert (With Vision'AI're) |
|----------|---------------------------|----------------------------|
| **Time to implement** | 20-40 hours | 2-10 hours |
| **Technical knowledge** | Required | None required |
| **Tool selection** | Trial & error | Pre-vetted recommendations |
| **Integration support** | None | Included |
| **Maintenance** | Your responsibility | Guidance provided |
| **Cost** | $0 (your time) | $XXX (saves 30h+) |
| **Success rate** | 40-60% | 95%+ |

**Visual Design**:
- 2-column table (mobile: stacked cards)
- Checkmarks/X for yes/no
- Highlight differences (bold text, color)
- CTA buttons at bottom ("Start DIY" vs "Book Consultation")

---

### 3. Payment Plan Options

**Goal**: Reduce friction by offering payment flexibility

**Component**: `components/PricingCalculator/PaymentPlans.tsx`

**Plans** (example, adjust to your pricing):
1. **DIY Plan**: $0
   - Analysis report (free)
   - Implementation guides
   - Email support
   - CTA: "Start Free"

2. **Starter Plan**: $499 CAD
   - Everything in DIY
   - 1-hour consultation
   - Tool setup assistance
   - CTA: "Book Consultation"

3. **Expert Plan**: $1,499 CAD (or split: 3 × $500)
   - Everything in Starter
   - Full implementation (1 opportunity)
   - 30-day support
   - CTA: "Get Started"

4. **Enterprise Plan**: Custom pricing
   - Multiple opportunities
   - Team training
   - Ongoing support
   - CTA: "Contact Sales"

**Visual Design**:
- 4-column grid (desktop) / carousel (mobile)
- Most popular badge (on Starter or Expert)
- Feature checklist with icons
- Payment flexibility indicator ("Split payment available")

**Payment Options Display**:
```tsx
<PricingCard plan="expert" price={1499}>
  <p className="text-sm text-slate-400">
    Ou 3 paiements de 500 $ CAD
  </p>
  <p className="text-sm text-slate-400">
    💳 Visa, Mastercard, Amex accepted
  </p>
</PricingCard>
```

---

### 4. Embedded Widget

**Goal**: Place calculator on high-traffic pages

**Placement Strategy**:
1. **Results page**: After showing opportunities (prime engagement moment)
2. **Homepage**: Above footer (low-commitment exploration)
3. **Pricing page**: As main content (obvious placement)
4. **Blog posts**: In-content widget (contextual)

**Widget Variants**:
- **Full widget**: ROI calculator + comparison + pricing (results page)
- **Compact widget**: ROI calculator only (homepage, blog)
- **Pricing-only**: Payment plans (pricing page)

**Responsive Behavior**:
- Desktop: Side-by-side calculator + results
- Mobile: Stacked, calculator first
- Sticky on scroll (optional, A/B test)

---

### 5. Lead Magnet (Detailed Report)

**Goal**: Capture email in exchange for detailed ROI report

**Flow**:
1. User interacts with calculator (adjusts sliders)
2. CTA appears: "Recevoir le Rapport Détaillé (PDF)"
3. Email input modal
4. Submit → Generate personalized PDF
5. Send via email (Resend) + track download

**PDF Report Contents**:
1. Custom ROI analysis (based on calculator inputs)
2. Implementation roadmap (timeline, milestones)
3. Tool recommendations (specific to opportunities)
4. Case study (similar company)
5. Next steps (book consultation CTA)

**PDF Generation** (reuse from FE-016):
```typescript
// app/api/calculator/generate-report/route.ts

import { renderToStream } from '@react-pdf/renderer';
import CalculatorReport from '@/components/pdf/CalculatorReport';

export async function POST(request: Request) {
  const { email, hourlyRate, hoursPerWeek, complexity } = await request.json();

  const reportData = {
    email,
    hourlyRate,
    hoursPerWeek,
    annualSavings: hoursPerWeek * hourlyRate * 52,
    roi: calculateROI(hourlyRate, hoursPerWeek, complexity),
    roadmap: generateRoadmap(complexity),
  };

  const stream = await renderToStream(<CalculatorReport data={reportData} />);

  // Send email with PDF attachment
  await sendReportEmail(email, stream);

  return NextResponse.json({ success: true });
}
```

---

### 6. Implementation Checklist (FE-020)

**Day 1: ROI Calculator** (1.5h)
- [ ] Build ROICalculator component
- [ ] Implement slider inputs (hourly rate, hours saved)
- [ ] Calculate savings (weekly, monthly, annual)
- [ ] Calculate ROI and break-even timeline
- [ ] Add confetti animation for high ROI

**Day 2: Comparison & Pricing** (1h)
- [ ] Build ComparisonMatrix component
- [ ] Create PaymentPlans component
- [ ] Design pricing cards (DIY, Starter, Expert, Enterprise)
- [ ] Add payment flexibility messaging

**Day 3: Widget & Lead Magnet** (30min)
- [ ] Embed calculator on results page
- [ ] Build lead magnet modal (email capture)
- [ ] Create PDF report generator
- [ ] Setup email sending (Resend)
- [ ] Test end-to-end flow

---

## 🎯 Success Metrics & Monitoring

### Key Performance Indicators (KPIs)

**A/B Testing (FE-018)**:
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Tests running concurrently | 2-3 | Test config |
| Sample size per variant | 100+ conversions | GA4 |
| Statistical significance | p < 0.05 | Custom calculator |
| Winner implementation time | <7 days | Manual tracking |
| Conversion uplift | +10-30% | GA4 comparison |

**Form Variants (FE-019)**:
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Multi-step completion rate | >65% | Form analytics |
| Progressive disclosure opt-in | >70% | Analytics |
| Exit-intent conversion | 8-12% | Modal tracking |
| Form abandonment rate | <30% | GA4 |
| Average form completion time | <2 min | Form analytics |

**Pricing Calculator (FE-020)**:
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Calculator engagement | >40% of results page visitors | Analytics |
| Average interaction time | >60 seconds | GA4 timing |
| Lead magnet conversion | >25% of calculator users | Email captures |
| Slider adjustments | >3 per session | Event tracking |
| Calculator → Consultation | >15% | Conversion tracking |

---

## 📦 Dependencies & Installation

### New Packages Required

```bash
# No new major dependencies required!
# Using existing:
# - Framer Motion (animations)
# - React Hook Form (forms)
# - @react-pdf/renderer (PDF export, from FE-016)
# - Google Analytics 4 (already installed)

# Optional: Chart library for admin dashboard
npm install recharts  # Only if not already installed from FE-016
```

**Bundle Impact**: ~0 kB (using existing dependencies)

---

## 🚀 Implementation Timeline

### Sprint Overview (10-12h total)

**Week 1: A/B Testing Framework** (4h)
- Day 1-2: Build core framework (config, assignment, hook) (2h)
- Day 3: Implement 3 initial tests (1.5h)
- Day 4: Build admin dashboard (30min)

**Week 2: Form Variants** (4h)
- Day 5: Multi-step form (2h)
- Day 6: Progressive disclosure + exit-intent (1.5h)
- Day 7: Conditional fields + analytics (30min)

**Week 3: Pricing Calculator** (3h)
- Day 8: ROI calculator (1.5h)
- Day 9: Comparison matrix + pricing plans (1h)
- Day 10: Widget embedding + lead magnet (30min)

**Buffer**: 1h for testing, bug fixes, polish

---

## 🧪 Testing Strategy

### A/B Test Validation
- Variant assignment persistence (localStorage)
- Allocation weights correct (50/50 split)
- GA4 events firing (ab_test_assigned, conversion events)
- Statistical significance calculation accuracy

### Form Testing
- Multi-step navigation (forward, backward)
- Field validation (per step)
- Exit-intent trigger (mouseleave detection)
- Progressive disclosure flow (email → details → phone)

### Calculator Testing
- ROI calculation accuracy (edge cases: $0 rate, 0 hours)
- Slider interactions (smooth, responsive)
- PDF generation (personalized content)
- Email delivery (lead magnet)

---

## 📝 Documentation Updates

### Files to Update
- `TASKS.md` - Add FE-018, FE-019, FE-020
- `STATE.md` - Update Phase 4B status
- `.claude/specs/PHASE4B_CONVERSION_OPTIMIZATION.md` - This file

### Environment Variables to Add
```env
# .env.local
CRON_SECRET=xxxxx  # For A/B test result aggregation (if automated)
STRIPE_PUBLIC_KEY=pk_xxxxx  # If adding payment processing
STRIPE_SECRET_KEY=sk_xxxxx
```

---

## 🎓 Key Learnings & Best Practices

### A/B Testing Principles
1. **One variable at a time**: Test button color OR copy, not both
2. **Sufficient sample size**: 100+ conversions per variant minimum
3. **Statistical rigor**: Don't call winners early (p < 0.05)
4. **Document learnings**: Failed tests teach as much as winners
5. **Iterate continuously**: Always have 2-3 tests running

### Form Optimization Tactics
1. **Reduce fields**: Every field = -10% conversion (average)
2. **Mobile-first**: 70%+ visitors on mobile
3. **Inline validation**: Real-time feedback > submit-time errors
4. **Progress indicators**: Multi-step forms need visible progress
5. **Exit-intent timing**: Not before 10s on page (avoid annoyance)

### Pricing Psychology
1. **Anchor high**: Show highest price first, others seem reasonable
2. **Decoy effect**: Middle option looks best when flanked
3. **Payment flexibility**: "3 × $500" > "$1,500" (perceived affordability)
4. **Social proof**: "Most popular" badge increases selection by 30%
5. **Value demonstration**: ROI calculator > price list (justify cost)

---

## 🔗 Integration with Phase 4A

**Synergies**:
1. **Email drip (4A)** → A/B test email subject lines (4B)
2. **Dashboard charts (4A)** → Embed ROI calculator (4B)
3. **Social proof widgets (4A)** → Test testimonial placement (4B)
4. **Badge unlocks (4A)** → Exit-intent offer for inactive users (4B)

**Recommended Sequence**:
- Implement 4A first (engagement foundation)
- Then 4B (optimize conversion)
- Measure combined impact (retention × conversion = revenue)

---

**End of Phase 4B Specification**

**Combined Phase 4 (A+B) Estimate**: 22-27 hours (3-4 weeks)
**Expected Revenue Impact**: +50-80% (retention + conversion + lead quality)
