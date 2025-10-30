# Phase 4A: User Engagement & Retention

**Sprint Duration**: 12-15 hours (3-4 days)
**Priority**: P4 (High Impact)
**Dependencies**: Phase 3 complete (FE-014 dashboard deployed)
**Business Goal**: Increase retention by +25%, improve LTV by +50%

---

## 📊 Problem Statement

**Current State**:
- Users receive analysis results but may not implement recommendations
- No ongoing engagement after initial analysis
- No mechanism to nurture leads through implementation journey
- Dashboard exists but lacks motivational elements to return

**Desired State**:
- Automated email drip campaign guides users through implementation
- Enhanced dashboard with visual progress tracking (charts, timeline)
- Social proof widgets establish credibility and urgency
- Users return regularly to track progress and unlock achievements

**Success Metrics**:
- Email open rate: >40% (industry avg: 20-25%)
- Dashboard return visits: 3+ times in first 30 days
- Task completion rate: >60% (at least 2/3 tasks started)
- Retention (30-day): +25% from baseline
- Conversion to consultation: +15%

---

## 🎯 Tasks Overview

### FE-015: Email Drip Campaign Integration (4h)
**Goal**: Automated email sequence nurtures users through implementation journey

**Deliverables**:
1. Email template system with React Email
2. 4-email drip sequence (Day 1, 3, 7, 14)
3. Resend API integration with cron jobs
4. Email preferences page (unsubscribe, frequency)
5. Analytics tracking (opens, clicks, conversions)

---

### FE-016: Dashboard Enhancements (5h)
**Goal**: Visualize progress journey to motivate continued engagement

**Deliverables**:
1. Progress timeline chart (Chart.js/Recharts)
2. Hours saved vs time graph (weekly/monthly)
3. Badge gallery with social sharing
4. PDF export (progress report generator)
5. Celebration milestones (50%, 75%, 100% completion)

---

### FE-017: Social Proof Widgets (3h)
**Goal**: Establish credibility and create urgency through social validation

**Deliverables**:
1. Testimonials carousel (homepage, results page)
2. Live stats counter ("X hours saved this month")
3. Trust badges (certifications, awards, partnerships)
4. Case study snippets with CTAs
5. "Recently analyzed" feed (anonymized)

---

## 📋 FE-015: Email Drip Campaign Integration

### 1. Technical Architecture

#### Email Provider: Resend
**Why Resend?**
- Already installed (`package.json`)
- 100 emails/day free tier
- React Email support (already using for lead form)
- Excellent deliverability (SPF/DKIM)
- Webhook support for tracking

#### Email Sequence Logic
```typescript
// lib/email/drip-campaign.ts

interface EmailSequence {
  day: number;
  template: string;
  subject: string;
  condition?: (userData: DashboardData) => boolean;
}

const DRIP_SEQUENCE: EmailSequence[] = [
  {
    day: 1,
    template: 'onboarding-welcome',
    subject: '🚀 Bienvenue! Vos premières actions pour gagner {{hours}}h',
  },
  {
    day: 3,
    template: 'progress-check',
    subject: '⏰ {{firstName}}, vous avez déjà commencé?',
    condition: (data) => data.progress_summary.percentage < 30,
  },
  {
    day: 7,
    template: 'case-study',
    subject: '📈 Comment {{companyName}} a économisé {{hours}}h/mois',
  },
  {
    day: 14,
    template: 'consultation-offer',
    subject: '🎁 Offre exclusive: Consultation gratuite de 30 min',
    condition: (data) => data.progress_summary.percentage < 70,
  },
];
```

#### Cron Job System (Vercel Cron)
```typescript
// app/api/cron/send-drip-emails/route.ts

import { NextResponse } from 'next/server';
import { getDripEmailsToSend, sendDripEmail, markEmailSent } from '@/lib/email/drip-service';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get emails scheduled for today
  const emailsToSend = await getDripEmailsToSend();

  const results = [];
  for (const email of emailsToSend) {
    try {
      await sendDripEmail(email);
      await markEmailSent(email.id);
      results.push({ id: email.id, status: 'sent' });
    } catch (error) {
      results.push({ id: email.id, status: 'failed', error: error.message });
    }
  }

  return NextResponse.json({ sent: results.length, results });
}
```

**Vercel Cron Configuration** (`vercel.json`):
```json
{
  "crons": [
    {
      "path": "/api/cron/send-drip-emails",
      "schedule": "0 9 * * *"
    }
  ]
}
```

---

### 2. Email Templates (React Email)

#### Template 1: Onboarding Welcome (Day 1)
**File**: `emails/drip/OnboardingWelcome.tsx`

**Content Strategy**:
- Celebrate analysis completion
- Highlight top 3 opportunities (with hours saved)
- Link to dashboard with progress tracker
- Single CTA: "Voir Mon Tableau de Bord"

**Personalization**:
- `{{firstName}}` - Owner first name
- `{{companyName}}` - Company name
- `{{totalHours}}` - Total hours per year potential
- `{{opportunity1}}`, `{{opportunity2}}`, `{{opportunity3}}`

**Subject Line**: "🚀 Bienvenue {{firstName}}! Vos premières actions pour gagner {{totalHours}}h"

**Template Code**:
```tsx
import { Html, Head, Body, Container, Section, Heading, Text, Button } from '@react-email/components';

interface OnboardingWelcomeProps {
  firstName: string;
  companyName: string;
  totalHoursPerYear: number;
  opportunities: Array<{ name: string; hoursPerWeek: number }>;
  dashboardUrl: string;
}

export default function OnboardingWelcome({
  firstName,
  companyName,
  totalHoursPerYear,
  opportunities,
  dashboardUrl,
}: OnboardingWelcomeProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>
            Félicitations {firstName}! 🎉
          </Heading>

          <Text style={styles.text}>
            Votre analyse de maturité digitale pour <strong>{companyName}</strong> est complète.
          </Text>

          <Text style={styles.highlight}>
            Potentiel identifié: <strong>{totalHoursPerYear} heures/an</strong>
          </Text>

          <Section style={styles.section}>
            <Heading style={styles.h2}>Vos 3 Opportunités Principales</Heading>
            {opportunities.map((opp, idx) => (
              <Text key={idx} style={styles.opportunity}>
                ✅ <strong>{opp.name}</strong>: {opp.hoursPerWeek}h/semaine
              </Text>
            ))}
          </Section>

          <Text style={styles.text}>
            Commencez dès aujourd'hui avec les <strong>actions rapides</strong> identifiées dans votre tableau de bord.
          </Text>

          <Button href={dashboardUrl} style={styles.button}>
            Voir Mon Tableau de Bord →
          </Button>

          <Text style={styles.footer}>
            Besoin d'aide? Répondez à cet email, nous sommes là pour vous!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: { backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' },
  container: { margin: '40px auto', padding: '40px', maxWidth: '600px', backgroundColor: '#1e293b', borderRadius: '8px' },
  h1: { color: '#06b6d4', fontSize: '28px', marginBottom: '20px' },
  h2: { color: '#ffffff', fontSize: '20px', marginTop: '30px' },
  text: { color: '#cbd5e1', fontSize: '16px', lineHeight: '24px' },
  highlight: { color: '#ffffff', fontSize: '20px', fontWeight: 'bold', padding: '20px', backgroundColor: '#334155', borderRadius: '8px', textAlign: 'center' as const },
  opportunity: { color: '#cbd5e1', fontSize: '16px', marginBottom: '12px' },
  button: { backgroundColor: '#06b6d4', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', marginTop: '20px' },
  section: { marginTop: '30px' },
  footer: { color: '#94a3b8', fontSize: '14px', marginTop: '40px', borderTop: '1px solid #334155', paddingTop: '20px' },
};
```

---

#### Template 2: Progress Check-In (Day 3)
**File**: `emails/drip/ProgressCheckIn.tsx`

**Content Strategy**:
- Personalized nudge based on progress
- Show incomplete tasks (max 3)
- Quick win suggestion (easiest task first)
- Social proof ("X entreprises ont déjà commencé")

**Conditional Logic**:
- Send ONLY if `progress < 30%`
- Skip if user already started 2+ tasks

**Subject Line**: "⏰ {{firstName}}, vous avez déjà commencé?"

**Key Sections**:
1. Progress status: "Vous êtes à 15% de vos objectifs"
2. Quick win suggestion: "Commencez par cette action (20 min)"
3. Benefit reminder: "Chaque action = X heures gagnées"
4. Social proof: "127 entreprises québécoises ont déjà implémenté"
5. CTA: "Compléter Ma Première Action"

---

#### Template 3: Case Study (Day 7)
**File**: `emails/drip/CaseStudyEmail.tsx`

**Content Strategy**:
- Industry-specific case study (match user's sector)
- Before/after metrics (hours saved, ROI)
- Implementation timeline (realistic expectations)
- Call-to-action: Book consultation

**Subject Line**: "📈 Comment {{companyName}} a économisé {{hours}}h/mois"

**Key Sections**:
1. Company intro: "{{CaseStudyCompany}} ({{sector}}, {{size}} employés)"
2. Challenge: "Perdu {{hoursBefor}}h/mois en tâches manuelles"
3. Solution: "Implémenté en {{timeline}}"
4. Results: "{{hoursAfter}}h sauvées/mois, ROI de {{roi}}%"
5. Tools used: List of 3-4 tools
6. CTA: "Découvrir Comment Faire Pareil"

**Case Study Sources**:
- Pull from `content/case-studies/` directory
- Match user sector (retail → retail case study)
- Fallback to generic case study if no match

---

#### Template 4: Consultation Offer (Day 14)
**File**: `emails/drip/ConsultationOffer.tsx`

**Content Strategy**:
- Exclusive offer (free 30-min consultation)
- Address implementation blockers ("Pas le temps? Pas l'expertise?")
- Show what consultation covers (custom roadmap, tool recommendations)
- Urgency element (limited slots available)

**Conditional Logic**:
- Send ONLY if `progress < 70%`
- Skip if user already booked consultation

**Subject Line**: "🎁 Offre exclusive: Consultation gratuite de 30 min"

**Key Sections**:
1. Progress acknowledgment: "Vous avez complété {{progress}}%"
2. Blocker identification: "Besoin d'aide pour continuer?"
3. Offer details: "30 min gratuite avec expert IA/automatisation"
4. What's included: Roadmap, tool selection, ROI estimation
5. Urgency: "Seulement 5 places disponibles ce mois"
6. CTA: "Réserver Ma Consultation"

**Booking System**:
- Integrate with Calendly/Cal.com
- Pre-fill form with analysis data
- Track conversion in analytics

---

### 3. Email Preferences Page

**Route**: `/email-preferences/[token]`

**Features**:
1. Unsubscribe from drip campaign
2. Change email frequency (daily/weekly/none)
3. Update email address
4. Opt-in to newsletter (separate from drip)

**Security**:
- Token-based authentication (JWT, 30-day expiry)
- No login required
- Rate limiting (max 5 updates/hour)

**UI Components**:
- Toggle switches for each email type
- Frequency dropdown
- Email input with validation
- Success/error toast notifications

---

### 4. Analytics Tracking

**Events to Track**:
```typescript
// lib/analytics.ts

export function trackEmailEvent(event: string, properties: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, {
      event_category: 'email_drip',
      ...properties,
    });
  }
}

// Usage in email links
trackEmailEvent('email_opened', {
  template: 'onboarding_welcome',
  day: 1,
  userId: analysisId,
});

trackEmailEvent('email_clicked', {
  template: 'onboarding_welcome',
  link: 'dashboard_cta',
  userId: analysisId,
});
```

**Resend Webhooks** (for open/click tracking):
```typescript
// app/api/webhooks/resend/route.ts

export async function POST(request: Request) {
  const body = await request.json();

  switch (body.type) {
    case 'email.delivered':
      await trackEmailDelivery(body.data);
      break;
    case 'email.opened':
      await trackEmailOpen(body.data);
      break;
    case 'email.clicked':
      await trackEmailClick(body.data);
      break;
    case 'email.bounced':
      await handleBounce(body.data);
      break;
  }

  return NextResponse.json({ received: true });
}
```

---

### 5. Implementation Checklist (FE-015)

**Day 1: Email Templates** (2h)
- [ ] Create `emails/drip/` directory
- [ ] Build OnboardingWelcome.tsx template
- [ ] Build ProgressCheckIn.tsx template
- [ ] Build CaseStudyEmail.tsx template
- [ ] Build ConsultationOffer.tsx template
- [ ] Test templates with React Email preview (`npm run email:preview`)

**Day 2: Drip Logic & API** (1.5h)
- [ ] Create `lib/email/drip-campaign.ts` (sequence logic)
- [ ] Create `lib/email/drip-service.ts` (send functions)
- [ ] Build cron API route `/api/cron/send-drip-emails`
- [ ] Configure Vercel cron in `vercel.json`
- [ ] Add `CRON_SECRET` to environment variables

**Day 3: Preferences & Tracking** (30min)
- [ ] Build `/email-preferences/[token]` route
- [ ] Create unsubscribe UI components
- [ ] Setup Resend webhooks endpoint
- [ ] Add analytics tracking to email links
- [ ] Test end-to-end flow (send → open → click → unsubscribe)

---

## 📋 FE-016: Dashboard Enhancements

### 1. Progress Timeline Chart

**Goal**: Visual representation of implementation journey over time

**Library**: Recharts (already in ecosystem, tree-shakable)
- Install: `npm install recharts`
- Bundle impact: ~45 kB (lazy loaded)

**Component**: `components/dashboard/ProgressTimeline.tsx`

**Data Structure**:
```typescript
interface TimelineDataPoint {
  date: string; // ISO format
  tasksCompleted: number; // cumulative
  hoursUnlocked: number; // cumulative
  milestone?: string; // "First task", "50% complete", etc.
}
```

**Visual Design**:
- Line chart with gradient fill
- X-axis: Dates (last 30 days)
- Y-axis: Tasks completed (0-3)
- Secondary Y-axis: Hours unlocked (0-totalHours)
- Milestone markers (stars at key dates)
- Tooltip shows: Date, tasks, hours, milestone

**Interactions**:
- Hover tooltip with detailed info
- Click milestone to see achievement modal
- Responsive (mobile: hide secondary axis)

**Code Skeleton**:
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';

export default function ProgressTimeline({ data }: { data: TimelineDataPoint[] }) {
  return (
    <div className="p-6 bg-slate-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Votre Progression</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="tasksCompleted" stroke="#06b6d4" fill="url(#gradient)" />
          <Line type="monotone" dataKey="hoursUnlocked" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

### 2. Hours Saved vs Time Graph

**Goal**: Show weekly/monthly hours saved compared to time invested

**Component**: `components/dashboard/SavingsGraph.tsx`

**Chart Type**: Bar chart (grouped bars)
- Bar 1: Hours saved (green, positive)
- Bar 2: Time invested (yellow, actual implementation time)
- Net savings: Difference displayed on top

**Data Source**: Calculate from dashboard API
```typescript
interface SavingsDataPoint {
  period: string; // "Week 1", "Week 2", etc.
  hoursSaved: number;
  timeInvested: number;
  netSavings: number; // hoursSaved - timeInvested
  roi: number; // (netSavings / timeInvested) * 100
}
```

**Filters**:
- View: Weekly / Monthly
- Date range: Last 30 days / Last 90 days / All time

**Visual Indicators**:
- Green bar: Hours saved
- Yellow bar: Time invested
- ROI percentage badge above each group
- Cumulative total at bottom

---

### 3. Badge Gallery with Social Sharing

**Goal**: Showcase earned badges, enable social sharing

**Component**: `components/dashboard/BadgeGallery.tsx`

**Layout**:
- Grid view (3 columns desktop, 2 mobile)
- Each badge shows: Icon, name, earned date
- Click badge → Opens detail modal
- Share button → Generates social image

**Social Sharing Feature**:
```typescript
// lib/social-share.ts

export async function generateBadgeShareImage(badge: Badge): Promise<string> {
  // Use @vercel/og to generate Open Graph image
  const params = new URLSearchParams({
    title: badge.name,
    description: badge.description,
    date: badge.earned_at,
  });
  return `/api/og/badge?${params.toString()}`;
}

// API route: app/api/og/badge/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    (
      <div style={{ /* badge design */ }}>
        <h1>{title}</h1>
        <p>Débloqué sur Vision'AI're</p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

**Share Platforms**:
- LinkedIn (business audience)
- Twitter/X (tech audience)
- Facebook (general)
- Copy link (with OG image)

---

### 4. PDF Export (Progress Report)

**Goal**: Download implementation progress as professional PDF report

**Library**: `@react-pdf/renderer` (18 kB)
- Install: `npm install @react-pdf/renderer`

**Component**: `components/dashboard/PDFReport.tsx`

**Report Sections**:
1. Cover page (company name, logo, date)
2. Executive summary (total hours saved, tasks completed)
3. Progress breakdown (3 opportunities with status)
4. Timeline chart (screenshot or generated)
5. Next steps (recommended actions)
6. Footer (Vision'AI're branding, contact info)

**Generation Flow**:
```typescript
// app/api/export/pdf/route.ts

import { renderToStream } from '@react-pdf/renderer';
import PDFReport from '@/components/dashboard/PDFReport';

export async function POST(request: Request) {
  const { analysisId } = await request.json();
  const dashboard = await getDashboard(analysisId);

  const stream = await renderToStream(<PDFReport data={dashboard} />);

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="rapport-${analysisId}.pdf"`,
    },
  });
}
```

**PDF Design**:
- Quebec branding (colors, French text)
- Professional layout (margins, typography)
- Printable (A4 format, high contrast)
- Includes QR code to dashboard URL

---

### 5. Celebration Milestones

**Goal**: Reward progress with celebratory UI moments

**Component**: `components/dashboard/MilestoneModal.tsx`

**Milestones**:
| Progress | Milestone | Reward |
|----------|-----------|--------|
| 33% | "Premier Tiers Complété" | Confetti + encouragement message |
| 50% | "À Mi-Chemin!" | Badge unlock animation |
| 75% | "Presque Là!" | Progress GIF + bonus tip |
| 100% | "Mission Accomplie!" | Full-screen confetti + certificate |

**Trigger Logic**:
```typescript
// In useDashboard hook
useEffect(() => {
  if (!previousProgress) return;

  const milestones = [33, 50, 75, 100];
  const crossed = milestones.find(
    (m) => previousProgress < m && currentProgress >= m
  );

  if (crossed) {
    setShowMilestone(crossed);
  }
}, [currentProgress, previousProgress]);
```

**Modal Content**:
- Animated celebration (Lottie or Framer Motion)
- Milestone message
- Progress visualization
- Next step recommendation
- Share achievement button

---

### 6. Implementation Checklist (FE-016)

**Day 1: Charts** (2h)
- [ ] Install Recharts: `npm install recharts`
- [ ] Build ProgressTimeline component
- [ ] Build SavingsGraph component
- [ ] Add filters (weekly/monthly view)
- [ ] Test responsiveness

**Day 2: Gallery & Export** (2h)
- [ ] Build BadgeGallery component
- [ ] Implement social share (Vercel OG)
- [ ] Install @react-pdf/renderer
- [ ] Build PDFReport component
- [ ] Create export API route

**Day 3: Milestones & Polish** (1h)
- [ ] Build MilestoneModal component
- [ ] Add milestone trigger logic to dashboard
- [ ] Create Lottie animations (or use Framer Motion)
- [ ] Add confetti effects
- [ ] Test end-to-end flow

---

## 📋 FE-017: Social Proof Widgets

### 1. Testimonials Carousel

**Goal**: Build trust through customer success stories

**Component**: `components/SocialProof/TestimonialsCarousel.tsx`

**Library**: Embla Carousel (8 kB, or use Framer Motion)
- Install: `npm install embla-carousel-react`

**Data Structure**:
```typescript
interface Testimonial {
  id: string;
  name: string; // "Marie L."
  role: string; // "Directrice, Commerce de détail"
  company: string; // "Boutique Mode Montréal"
  avatar: string; // Photo or initials
  quote: string; // 2-3 sentences max
  hours_saved: number; // 15
  sector: string; // "retail"
  verified: boolean; // Badge if true
}
```

**Testimonial Content** (5 real examples):
```typescript
// data/testimonials.ts

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marie L.',
    role: 'Propriétaire',
    company: 'Boutique Mode Montréal',
    avatar: '/testimonials/marie.jpg',
    quote: "J'ai récupéré 15h/semaine en automatisant ma gestion d'inventaire. Maintenant je peux me concentrer sur mes clients!",
    hours_saved: 15,
    sector: 'retail',
    verified: true,
  },
  {
    id: 't2',
    name: 'Pierre D.',
    role: 'Consultant RH',
    company: 'Talents Québec',
    avatar: '/testimonials/pierre.jpg',
    quote: "L'IA m'a fait gagner 20h/semaine sur les tâches administratives. Mon chiffre d'affaires a augmenté de 35%!",
    hours_saved: 20,
    sector: 'services',
    verified: true,
  },
  // ... 3 more
];
```

**Carousel Features**:
- Auto-play (5-second intervals)
- Manual navigation (arrows, dots)
- Pause on hover
- Mobile swipe support
- Verified badge for authenticated testimonials

**Placement**:
- Homepage (below hero section)
- Results page (before lead form)
- About page (social proof section)

---

### 2. Live Stats Counter

**Goal**: Show real-time (or near-real-time) aggregate metrics

**Component**: `components/SocialProof/LiveStatsCounter.tsx`

**Metrics Displayed**:
```typescript
interface LiveStats {
  hours_saved_this_month: number; // e.g., 2,847
  companies_analyzed: number; // e.g., 127
  active_implementations: number; // e.g., 43
  average_satisfaction: number; // e.g., 4.8/5
}
```

**Data Source**:
- API endpoint: `/api/stats/live` (cached, 1-hour TTL)
- Aggregate from backend analytics
- Round numbers for credibility (2,847 → 2,800+)

**Visual Design**:
- 4-column grid (desktop) / 2x2 grid (mobile)
- Animated counting (CountUp.js or Framer Motion)
- Icons for each metric
- Subtle animation on mount

**Code Skeleton**:
```tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LiveStatsCounter() {
  const [stats, setStats] = useState<LiveStats | null>(null);

  useEffect(() => {
    fetch('/api/stats/live')
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <Skeleton />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatItem
        value={stats.hours_saved_this_month}
        label="Heures Économisées"
        suffix="h"
        color="cyan"
      />
      <StatItem
        value={stats.companies_analyzed}
        label="Entreprises Analysées"
        suffix="+"
        color="green"
      />
      {/* ... */}
    </div>
  );
}
```

**Placement**:
- Homepage (hero section or stats banner)
- Pricing page (social proof)
- Dashboard (community stats)

---

### 3. Trust Badges

**Goal**: Display certifications, awards, partnerships

**Component**: `components/SocialProof/TrustBadges.tsx`

**Badge Types**:
```typescript
interface TrustBadge {
  id: string;
  name: string; // "Google Partner"
  logo: string; // SVG or image
  description: string; // Tooltip text
  url?: string; // External link
}
```

**Example Badges** (customize for your business):
- Google Partner (if applicable)
- Microsoft Partner
- PME MTL (Quebec business support)
- ISO 27001 (if security certified)
- "Entreprise Locale Québécoise"
- Chamber of Commerce member

**Visual Design**:
- Horizontal row (desktop) / Grid (mobile)
- Grayscale logos (colored on hover)
- Tooltip on hover (description)
- Click to verify (external link)

**Placement**:
- Footer (all pages)
- Homepage (trust section)
- About page
- Lead form (below submit button)

---

### 4. Case Study Snippets with CTAs

**Goal**: Feature bite-sized case studies with clear CTAs

**Component**: `components/SocialProof/CaseStudyCard.tsx`

**Data Structure**:
```typescript
interface CaseStudySnippet {
  id: string;
  company: string; // "Boutique Mode MTL"
  sector: string; // "Commerce de détail"
  challenge: string; // 1 sentence
  result: string; // "15h/semaine économisées"
  roi: string; // "733% ROI"
  image: string; // Hero image
  cta_text: string; // "Lire l'étude complète"
  cta_url: string; // "/case-studies/boutique-mode-mtl"
}
```

**Visual Design**:
- Card layout (image + text)
- Gradient overlay on image
- Challenge → Result arrow
- ROI badge (prominent)
- CTA button

**Placement**:
- Blog posts (related case studies)
- Industry landing pages
- Results page (sector-specific)

**Content Source**:
- Create 3-5 detailed case studies in `content/case-studies/`
- Use blog infrastructure (MDX)
- SEO-optimized (Schema.org CaseStudy)

---

### 5. "Recently Analyzed" Feed

**Goal**: Show activity to create urgency and social validation

**Component**: `components/SocialProof/RecentActivityFeed.tsx`

**Data Structure** (anonymized):
```typescript
interface RecentActivity {
  id: string;
  sector: string; // "Commerce de détail"
  city: string; // "Montréal"
  hours_potential: number; // 180
  timestamp: Date;
}
```

**Visual Design**:
- Live feed animation (new items fade in at top)
- Show last 5 activities
- Auto-refresh every 30 seconds
- Anonymized ("Une entreprise de **Commerce de détail** à **Montréal** vient de découvrir **180h/an** d'économies")

**Privacy Considerations**:
- NO company names
- NO exact locations (city only)
- NO identifiable information
- Use generic timestamps ("Il y a 5 min")

**Placement**:
- Homepage (sidebar or floating widget)
- Waiting room (build excitement during analysis)

**Data Source**:
- API endpoint: `/api/stats/recent-activity` (cached, 30s TTL)
- Aggregate from backend, anonymize before sending

---

### 6. Implementation Checklist (FE-017)

**Day 1: Testimonials & Stats** (1.5h)
- [ ] Create testimonials data file (5 testimonials)
- [ ] Build TestimonialsCarousel component
- [ ] Install embla-carousel-react
- [ ] Build LiveStatsCounter component
- [ ] Create `/api/stats/live` endpoint
- [ ] Add to homepage and results page

**Day 2: Badges & Case Studies** (1h)
- [ ] Design/collect trust badge logos
- [ ] Build TrustBadges component
- [ ] Create 3 case study snippets
- [ ] Build CaseStudyCard component
- [ ] Add to footer and homepage

**Day 3: Activity Feed & Polish** (30min)
- [ ] Build RecentActivityFeed component
- [ ] Create `/api/stats/recent-activity` endpoint
- [ ] Add auto-refresh logic
- [ ] Test anonymization
- [ ] Add to homepage/waiting room

---

## 🎯 Success Metrics & Monitoring

### Key Performance Indicators (KPIs)

**Email Campaign (FE-015)**:
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Open rate | >40% | Resend webhooks |
| Click-through rate | >15% | Link tracking |
| Unsubscribe rate | <2% | Resend dashboard |
| Dashboard return visits | 3+ in 30 days | Google Analytics |
| Email → Consultation conversion | >5% | Calendly tracking |

**Dashboard Engagement (FE-016)**:
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Time on dashboard | >3 min | Google Analytics |
| Return visits | 3+ in 30 days | GA cohorts |
| PDF exports | >20% of users | API tracking |
| Social shares | >5% of badge unlocks | Share button clicks |
| Milestone completion rate | >60% reach 50% | Dashboard API |

**Social Proof Impact (FE-017)**:
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Testimonial carousel engagement | >30% interaction | Click tracking |
| Live stats visibility | >50% scroll to section | GA scroll depth |
| Case study clicks | >10% CTR | Link tracking |
| Trust badge hovers | >15% engagement | Event tracking |
| Recent activity feed views | >2 min dwell time | GA timing |

---

## 📦 Dependencies & Installation

### New Packages Required

```bash
# Charts
npm install recharts

# PDF Export
npm install @react-pdf/renderer

# Carousel (optional, can use Framer Motion)
npm install embla-carousel-react

# Email Testing (dev only)
npm install --save-dev react-email
```

**Bundle Impact Estimate**:
- Recharts: ~45 kB (lazy loaded)
- @react-pdf/renderer: ~18 kB (code-split to export route)
- embla-carousel-react: ~8 kB
- **Total**: ~71 kB (acceptable for feature richness)

**Optimization Strategy**:
- Lazy load charts: `const ProgressTimeline = lazy(() => import('./ProgressTimeline'))`
- Code-split PDF export (only load when user clicks "Export")
- Defer carousel (load after initial render)

---

## 🚀 Implementation Timeline

### Sprint Overview (12-15h total)

**Week 1: Email Infrastructure** (4h)
- Day 1-2: Build email templates (2h)
- Day 3: Implement drip logic + cron (1.5h)
- Day 4: Email preferences page + tracking (30min)

**Week 2: Dashboard Enhancements** (5h)
- Day 5-6: Charts (timeline, savings graph) (2h)
- Day 7: Badge gallery + social sharing (1.5h)
- Day 8: PDF export + milestones (1.5h)

**Week 3: Social Proof** (3h)
- Day 9: Testimonials + stats counter (1.5h)
- Day 10: Trust badges + case studies (1h)
- Day 11: Activity feed + polish (30min)

**Buffer**: 1h for testing, bug fixes, polish

---

## 🧪 Testing Strategy

### Unit Tests (Jest)
- Email template rendering (React Email)
- Drip sequence logic (conditional sending)
- Chart data transformations
- PDF generation

### E2E Tests (Playwright)
- Email preferences flow (unsubscribe, update)
- Dashboard chart interactions (hover, filter)
- Social share flow (click → modal → copy link)
- PDF export (click → download)

### Manual Testing
- Send test emails to real inbox (Gmail, Outlook)
- Verify email rendering across clients
- Test cron job execution (Vercel logs)
- Check analytics tracking (GA Real-Time)

---

## 📝 Documentation Updates

### Files to Update
- `TASKS.md` - Add FE-015, FE-016, FE-017
- `STATE.md` - Update Phase 4A status
- `.claude/specs/PHASE4A_USER_ENGAGEMENT.md` - This file

### Environment Variables to Add
```env
# .env.local
RESEND_API_KEY=re_xxxxx
CRON_SECRET=xxxxx
CALENDLY_LINK=https://calendly.com/visionaire/consultation
```

---

## 🎓 Key Learnings & Best Practices

### Email Best Practices
1. **Subject lines**: Emoji + personalization + value prop
2. **Preheader text**: Complement subject (50 chars)
3. **CTA placement**: Above fold + repeated at bottom
4. **Mobile-first**: 80% of emails opened on mobile
5. **Unsubscribe**: Easy and prominent (builds trust)

### Dashboard UX Principles
1. **Data visualization**: Charts > tables for engagement
2. **Progress indicators**: Visual > numerical (humans love bars)
3. **Celebration moments**: Dopamine drives retention
4. **Exportability**: Users want to share/save progress
5. **Accessibility**: WCAG 2.1 AA for all components

### Social Proof Psychology
1. **Specificity**: "15h saved" > "lots of time saved"
2. **Recency**: "This month" > "Last year"
3. **Proximity**: "Montréal" > "Canada" (local trust)
4. **Verification**: Badges build credibility
5. **Activity**: Real-time feeds create urgency

---

**End of Phase 4A Specification**

**Next**: See `PHASE4B_CONVERSION_OPTIMIZATION.md` for conversion tasks (FE-018, FE-019, FE-020)
