# Visionaire Frontend - Architecture Documentation

## Overview

Visionaire Frontend is a Next.js-based web application that provides real-time business analysis visualization using Server-Sent Events (SSE) streaming. The application features a waiting room with progressive storytelling and comprehensive results visualization with lead capture.

**Production URL**: https://visionaire-frontend.vercel.app

**Phase**: Phase 2 - Waiting Room Transformation

## Tech Stack

### Core Framework
- **Next.js**: 15.5.6 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.x (strict mode enabled)
- **Node.js**: 20+ (runtime)

### Styling & Design
- **Tailwind CSS**: 3.4.14 - Utility-first CSS framework
- **PostCSS**: 8.4.47 with autoprefixer 10.4.20
- **Framer Motion**: 12.23.24 - Animation library
- **Dark Mode**: next-themes 0.4.6
- **Class Utilities**: clsx 2.1.1 + tailwind-merge 3.3.1

### Forms & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **Toast Notifications**: react-hot-toast 2.6.0

### Internationalization
- **next-intl**: 4.4.0 - i18n support

### Email Integration
- **@react-email/components**: 0.5.7 - Email template components
- **@react-email/render**: 1.4.0 - Server-side email rendering
- **resend**: 6.3.0 - Email delivery service

### Security
- **isomorphic-dompurify**: 2.30.1 - HTML sanitization
- **react-cookie-consent**: 9.0.0 - Cookie consent management

### Monitoring & Analytics
- **@sentry/nextjs**: 10.22.0 - Error tracking and performance monitoring
- **@sentry/profiling-node**: 10.22.0 - Performance profiling
- **Google Analytics**: GA4 (custom implementation)
- **Microsoft Clarity**: Session recording and heatmaps

### SEO & Performance
- **next-sitemap**: 4.2.3 - Dynamic sitemap generation
- **next/image**: Built-in image optimization
- **critters**: 0.0.23 - Critical CSS extraction

### Testing
- **Playwright**: 1.56.1 - E2E testing framework
- **@axe-core/cli**: 4.11.0 - Accessibility testing
- **@next/bundle-analyzer**: 16.0.1 - Bundle size analysis

### Development Tools
- **ESLint**: 8.x with eslint-config-next 15.0.2
- **TypeScript Types**: @types/node, @types/react, @types/react-dom, @types/dompurify

## Project Structure

```
visionaire-frontend/
├── app/                                # Next.js App Router
│   ├── layout.tsx                      # Root layout (providers, fonts, analytics)
│   ├── page.tsx                        # Homepage (hero + URL input)
│   ├── globals.css                     # Tailwind base styles
│   ├── global-error.tsx                # Global error boundary
│   ├── sitemap.ts                      # Dynamic sitemap generator
│   │
│   ├── waiting-room/[id]/             # Waiting Room (SSE streaming) - PHASE 2
│   │   └── page.tsx                    # Progressive storytelling + real-time logs
│   │
│   ├── results/[id]/                   # Results page - PHASE 2 ENHANCED
│   │   └── page.tsx                    # Identity + Opportunities + Lead form
│   │
│   ├── api/                            # API routes (Next.js backend)
│   │   └── send-email/                 # Email sending endpoint
│   │       └── route.ts
│   │
│   ├── about/                          # Static pages
│   ├── contact/
│   ├── faq/
│   ├── pricing/
│   ├── legal/
│   └── politique-confidentialite/
│
├── components/                         # React components
│   ├── ui/                             # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── progress.tsx
│   │
│   ├── ProgressiveMessage.tsx          # NEW - 5-phase storytelling (Phase 2)
│   ├── LogStream.tsx                   # SSE event stream display
│   ├── OpportunityCard.tsx             # NEW - Time opportunity display (Phase 2)
│   ├── ComplexityBar.tsx               # NEW - Complexity visualization (Phase 2)
│   ├── LeadConversionForm.tsx          # Lead capture form
│   └── Header.tsx                      # Site header/navigation
│
├── lib/                                # Utility libraries
│   ├── api.ts                          # Backend API client
│   ├── sse.ts                          # Server-Sent Events utilities
│   ├── utils.ts                        # General utilities
│   └── validations.ts                  # Zod schemas
│
├── types/                              # TypeScript type definitions
│   ├── analysis.ts                     # Analysis API types
│   ├── api.ts                          # API response types
│   └── index.ts                        # Exported types
│
├── hooks/                              # Custom React hooks
│   ├── useAnalysis.ts                  # Analysis state management
│   ├── useSSE.ts                       # SSE connection hook
│   └── useLocalStorage.ts              # Local storage utilities
│
├── public/                             # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── tests/                              # E2E tests (Playwright)
│   ├── e2e/
│   │   ├── homepage.spec.ts
│   │   ├── waiting-room.spec.ts        # NEW (Phase 2)
│   │   └── results.spec.ts
│   └── playwright.config.ts
│
├── next.config.js                      # Next.js configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies
└── .env.example                        # Environment variables template
```

## Route Structure

### Phase 2 Routes

#### 1. Homepage (`/`)
**Purpose**: Landing page with hero and URL input

**Features**:
- Hero section with value proposition
- URL input form (business website)
- Trust signals (testimonials, logos)
- Call-to-action to start analysis

**File**: `app/page.tsx`

---

#### 2. Waiting Room (`/waiting-room/[id]`) - NEW in Phase 2
**Purpose**: Real-time analysis progress with progressive storytelling

**Layout**: Dual-view (35% logs + 65% message)

**Features**:
- **Left Panel (35%)**: Real-time SSE event logs
  - Connection status indicator
  - Progress percentage (0-100%)
  - Phase updates (A1 → A2 → Complete)
  - Event timestamps
  - Auto-scroll to latest

- **Right Panel (65%)**: Progressive storytelling message
  - 5-phase narrative (0% → 20% → 45% → 75% → 95% → 100%)
  - Typewriter effect (20ms/character)
  - Dynamic content insertion (name, company, opportunities)
  - Smooth transitions between phases
  - Redirect button appears 3s after message complete

**SSE Events Handled**:
```typescript
{
  status: "INITIATED" | "RUNNING_A1" | "RUNNING_A2" | "COMPLETE" | "FAILED",
  progress_percentage: number,  // 0-100
  log_message: string,
  timestamp: string,
  phase: "A1" | "A2" | "complete"
}
```

**Critical UX Rules**:
1. Message must complete BEFORE showing redirect button
2. Redirect button appears 3 seconds after message complete
3. No redirect if message incomplete (even if analysis done)
4. Typewriter speed: 20ms per character (adjustable)
5. Smooth fade transitions (no cuts)

**File**: `app/waiting-room/[id]/page.tsx`
**Components**:
- `ProgressiveMessage.tsx` (NEW)
- `LogStream.tsx`

---

#### 3. Results (`/results/[id]`) - ENHANCED in Phase 2
**Purpose**: Display analysis results with valorization and lead capture

**Sections**:

1. **Identity Section**:
   ```typescript
   - Company name
   - Owner first name (fallback: "Monsieur/Madame" if null)
   - Sector
   - Company size
   - Tier classification
   ```

2. **Time Opportunities** (3 cards):
   - **Digital Presence**
     - Hours saved per week/year
     - Problem teaser (1-2 sentences)
     - Complexity level (1-10 visual bar)
     - Tools hint

   - **Value Creation**
     - Same structure

   - **Business Management**
     - Same structure

3. **Valorization Section** (NEW):
   - **Input**: "What is your hourly rate?" ($/h CAD)
   - **Output** (calculated dynamically):
     - Weekly savings: `hourly_rate × total_hours_per_week`
     - Annual savings: `hourly_rate × total_hours_per_year`
     - Implementation time (solo vs expert)
   - **Format**: "X $ CAD" (space before $, Quebec style)

4. **Lead Conversion Form** (ENHANCED):
   - Email (required)
   - Company name (pre-filled from analysis)
   - Phone (optional)
   - Call-to-action: "Get Your Personalized Plan"
   - Urgency element: "Limited spots available"

**File**: `app/results/[id]/page.tsx`
**Components**:
- `OpportunityCard.tsx` (NEW)
- `ComplexityBar.tsx` (NEW)
- `LeadConversionForm.tsx` (ENHANCED)

---

## TypeScript Type Definitions

### API Response Types

```typescript
// types/analysis.ts

export interface AnalysisResponse {
  analysis_id: string;
  status: "INITIATED" | "RUNNING_A1" | "RUNNING_A2" | "COMPLETE" | "FAILED";
  message: string;
}

export interface AnalysisResults {
  analysis_id: string;
  status: string;
  url: string;
  identity_a1: IdentityA1;
  digital_presence: TimeOpportunity;
  value_creation: TimeOpportunity;
  business_management: TimeOpportunity;
  total_hours_per_week: number;
  total_hours_per_year: number;
  implementation_time_solo: ImplementationTime;
  implementation_time_expert: ImplementationTime;
  created_at: string;
  completed_at: string;
}

export interface IdentityA1 {
  company_name: string;
  owner_first_name: string | null;  // Can be null!
  sector: string;
  estimated_size: string;
  tier: string;
}

export interface TimeOpportunity {
  hours_per_week: number;
  hours_per_year: number;
  problem_teaser: string;
  complexity_level: number;  // 1-10
  tools_hint: string;
}

export interface ImplementationTime {
  hours: number;
  description: string;
}

export interface SSEEvent {
  status: string;
  progress_percentage: number;
  log_message: string;
  timestamp: string;
  phase?: string;
}
```

## Component Architecture

### ProgressiveMessage Component (NEW - Phase 2)

**Purpose**: Display 5-phase narrative with typewriter effect

**Props**:
```typescript
interface ProgressiveMessageProps {
  progress: number;              // 0-100
  identityData: IdentityA1 | null;
  timeData: {
    digital: TimeOpportunity;
    value: TimeOpportunity;
    business: TimeOpportunity;
    total_weekly: number;
    total_yearly: number;
  } | null;
  onComplete: () => void;        // Callback when message fully displayed
}
```

**State**:
```typescript
const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
const [displayedText, setDisplayedText] = useState("");
const [isTyping, setIsTyping] = useState(true);
```

**Phase Thresholds**:
- Phase 1: 0-20% (Bienvenue)
- Phase 2: 20-45% (Découverte)
- Phase 3: 45-75% (Analyse)
- Phase 4: 75-95% (Révélation)
- Phase 5: 95-100% (Invitation)

**Typewriter Logic**:
```typescript
useEffect(() => {
  if (!messageContent) return;

  let index = 0;
  const interval = setInterval(() => {
    if (index < messageContent.length) {
      setDisplayedText(prev => prev + messageContent[index]);
      index++;
    } else {
      clearInterval(interval);
      setIsTyping(false);
      // Wait 3 seconds then call onComplete
      setTimeout(() => onComplete(), 3000);
    }
  }, 20); // 20ms per character

  return () => clearInterval(interval);
}, [messageContent, onComplete]);
```

**File**: `components/ProgressiveMessage.tsx`

---

### OpportunityCard Component (NEW - Phase 2)

**Purpose**: Display single time opportunity with complexity visualization

**Props**:
```typescript
interface OpportunityCardProps {
  title: string;                     // "Digital Presence", "Value Creation", etc.
  opportunity: TimeOpportunity;
  hourlyRate: number | null;         // For valorization calculation
}
```

**Layout**:
```
┌─────────────────────────────────────┐
│  Icon  Title (Digital Presence)    │
│                                     │
│  Problem: "Site web lent..."       │
│                                     │
│  Time Saved:                        │
│  • 5h/week                          │
│  • 260h/year                        │
│                                     │
│  Complexity: ████████░░ (8/10)     │
│                                     │
│  Tools: "SEO automation..."        │
│                                     │
│  {if hourlyRate}                   │
│  💰 Value: 1,300 $ CAD/year        │
└─────────────────────────────────────┘
```

**File**: `components/OpportunityCard.tsx`

---

### ComplexityBar Component (NEW - Phase 2)

**Purpose**: Visual representation of complexity level (1-10)

**Props**:
```typescript
interface ComplexityBarProps {
  level: number;  // 1-10
  label?: string; // Optional label
}
```

**Implementation**:
```tsx
<div className="flex items-center gap-2">
  <span className="text-sm text-gray-600">{label || "Complexity:"}</span>
  <div className="flex gap-1">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "w-8 h-2 rounded-full",
          i < level ? "bg-blue-500" : "bg-gray-200"
        )}
      />
    ))}
  </div>
  <span className="text-sm font-medium">{level}/10</span>
</div>
```

**File**: `components/ComplexityBar.tsx`

---

### LeadConversionForm Component (ENHANCED - Phase 2)

**Purpose**: Capture lead information with enhanced conversion elements

**Fields**:
```typescript
{
  email: string;           // Required, validated
  company_name: string;    // Pre-filled from analysis
  phone: string;           // Optional, format +1 XXX XXX XXXX
  hourly_rate: number;     // Required for valorization (input earlier)
}
```

**Validation**:
```typescript
const schema = z.object({
  email: z.string().email("Invalid email address"),
  company_name: z.string().min(2, "Company name required"),
  phone: z.string().regex(/^\+1 \d{3} \d{3} \d{4}$/).optional(),
});
```

**Enhanced Elements**:
- Urgency badge: "⏰ Limited spots - Act now"
- Social proof: "Join 200+ businesses saving time"
- Trust signals: SSL badge, privacy policy link
- CTA button: "Get Your Personalized Plan" (not "Submit")

**File**: `components/LeadConversionForm.tsx`

---

## API Integration

### Backend API Client

**Base URL**: `https://visionaire-bff-production.up.railway.app`

**Endpoints**:

```typescript
// lib/api.ts

export const api = {
  // Start new analysis
  startAnalysis: async (url: string): Promise<AnalysisResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/analysis/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return response.json();
  },

  // Get analysis status (polling fallback)
  getStatus: async (analysisId: string): Promise<AnalysisStatus> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/analysis/${analysisId}/status`);
    return response.json();
  },

  // Get complete results
  getResults: async (analysisId: string): Promise<AnalysisResults> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/analysis/${analysisId}/results-summary`);
    return response.json();
  },

  // Create SSE connection (returns EventSource)
  createSSEConnection: (analysisId: string): EventSource => {
    return new EventSource(`${API_BASE_URL}/api/v1/analysis/${analysisId}/stream`);
  },

  // Activate email notification (fallback)
  notifyByEmail: async (analysisId: string, email: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/api/v1/analysis/${analysisId}/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  },
};
```

---

### SSE Connection Hook

```typescript
// hooks/useSSE.ts

export function useSSE(analysisId: string) {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [latestEvent, setLatestEvent] = useState<SSEEvent | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "open" | "closed">("connecting");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(
      `${API_BASE_URL}/api/v1/analysis/${analysisId}/stream`
    );

    eventSource.onopen = () => {
      setConnectionStatus("open");
    };

    eventSource.onmessage = (event) => {
      const data: SSEEvent = JSON.parse(event.data);
      setLatestEvent(data);
      setEvents((prev) => [...prev, data]);

      // Close connection when complete or failed
      if (data.status === "COMPLETE" || data.status === "FAILED") {
        eventSource.close();
        setConnectionStatus("closed");
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      setError(error as Error);
      setConnectionStatus("closed");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [analysisId]);

  return { events, latestEvent, connectionStatus, error };
}
```

---

## Environment Variables

```bash
# Production API
NEXT_PUBLIC_API_URL=https://visionaire-bff-production.up.railway.app

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX

# Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Email (for contact form)
RESEND_API_KEY=re_xxxxxxxxxx
```

---

## Deployment

### Vercel Configuration

**Platform**: Vercel (serverless Next.js hosting)

**Build Settings**:
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `npm run dev`

**Environment Variables** (set in Vercel dashboard):
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_SENTRY_DSN`
- `RESEND_API_KEY`

**Automatic Deployments**:
- **Production**: Push to `main` branch → https://visionaire-frontend.vercel.app
- **Preview**: Pull requests → temporary preview URLs

**Performance**:
- Edge runtime for API routes
- Image optimization (next/image)
- Automatic code splitting
- Serverless functions for backend routes

---

## Testing Strategy

### E2E Tests (Playwright)

**Total Tests**: 69 tests operational

**Test Files**:

1. **homepage.spec.ts** (15 tests):
   - Hero section rendering
   - URL input validation
   - Form submission
   - Error handling
   - Responsive design

2. **waiting-room.spec.ts** (NEW - 25 tests):
   - SSE connection establishment
   - Real-time event updates
   - Progress bar synchronization
   - Progressive message typewriter effect
   - Phase transitions (1 → 2 → 3 → 4 → 5)
   - Redirect button timing (3s delay after complete)
   - Error handling (connection loss, timeout)
   - Dual-view layout (35%/65% split)
   - Mobile responsiveness

3. **results.spec.ts** (29 tests):
   - Results data display
   - Identity section rendering
   - Opportunity cards display (3 cards)
   - Complexity bar visualization
   - Valorization input/calculation
   - Lead form submission
   - Error states (missing data, API errors)
   - Mobile responsiveness

**Running Tests**:
```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e/waiting-room.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug
```

---

## Performance Metrics

### Target Metrics

- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Time to Interactive (TTI)**: <3.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **First Input Delay (FID)**: <100ms

### Optimization Strategies

1. **Code Splitting**:
   - Automatic route-based splitting (Next.js)
   - Lazy load components: `React.lazy(() => import('./Component'))`
   - Dynamic imports for heavy libraries

2. **Image Optimization**:
   - Use `next/image` for all images
   - Automatic WebP conversion
   - Responsive image sizes
   - Lazy loading below the fold

3. **CSS Optimization**:
   - Tailwind CSS tree-shaking (production builds)
   - Critical CSS extraction (critters)
   - Inline critical styles
   - Defer non-critical CSS

4. **Bundle Analysis**:
   ```bash
   npm run analyze
   ```
   - Review bundle size
   - Identify heavy dependencies
   - Remove unused code

---

## Monitoring & Observability

### Sentry Integration

**Error Tracking**:
- Frontend errors (React errors, unhandled exceptions)
- API request failures
- SSE connection errors
- Form validation errors

**Performance Monitoring**:
- Page load times
- API response times
- Component render times
- Transaction tracking

**Configuration**:
```typescript
// app/layout.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Google Analytics (GA4)

**Events Tracked**:
- Page views
- Analysis started
- SSE connection established
- Message phases completed
- Lead form submitted
- Valorization calculated

### Microsoft Clarity

**Features**:
- Session recordings
- Heatmaps
- Scroll depth
- Click maps
- Rage clicks detection

---

## Known Limitations

### Current Issues

1. **SSE Connection Stability**:
   - Issue: Connection drops on mobile networks
   - Impact: User sees "Connecting..." spinner
   - Workaround: Auto-reconnect logic + polling fallback
   - Task: FE-010 (improve reconnection UX)

2. **Typewriter Performance on Low-End Devices**:
   - Issue: 20ms interval may lag on old phones
   - Impact: Choppy animation
   - Workaround: Increase interval to 50ms on mobile
   - Task: FE-011 (adaptive timing)

3. **Valorization Input Validation**:
   - Issue: No max value validation
   - Impact: User can input unrealistic rates ($999,999/h)
   - Workaround: Frontend validation (max $500/h)
   - Task: FE-012 (add sensible limits)

---

## Phase 2 Task Summary

### Waiting Room Transformation (FE-002 to FE-007)

**Goal**: Replace "War Room" with immersive "Waiting Room" experience

**Tasks**:
1. **FE-002**: Create `/waiting-room/[id]` route (3-4h)
2. **FE-003**: Build `ProgressiveMessage` component (2h)
3. **FE-004**: Enhance `/results/[id]` with valorization (2-3h)
4. **FE-005**: Create `OpportunityCard` component (1-2h)
5. **FE-006**: Create `ComplexityBar` component (1h)
6. **FE-007**: Update all redirects (War Room → Waiting Room) (30min)

**Total Effort**: ~10-13 hours over 2-3 days

**Success Criteria**:
- ✅ Waiting Room dual-view functional (35% logs + 65% message)
- ✅ Message completes before redirect button appears
- ✅ Valorization calculates $ dynamically based on hourly rate
- ✅ All 69 E2E tests passing
- ✅ Mobile responsive (tested on iOS/Android)

---

## Additional Documentation

- **STATE.md**: Current operational status and metrics
- **TASKS.md**: Prioritized task backlog with effort estimates
- **README.md**: Quick start guide
- **CLAUDE.md**: Claude Code Web context and guidelines

---

**Architecture Version**: Phase 2 - Waiting Room Transformation
**Last Updated**: 2025-10-27
**Maintainer**: Visionaire Team
