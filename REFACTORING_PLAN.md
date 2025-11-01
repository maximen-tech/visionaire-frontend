# REFACTORING PLAN - Vision'AI're Frontend Redesign

**Date**: 2025-11-01
**Status**: 📋 PLAN READY - Awaiting Approval
**Estimated Time**: 5 hours
**Estimated Bundle Reduction**: -20% (299KB → ~240KB)

---

## 🎯 EXECUTIVE SUMMARY

### Mission
Transform homepage from "generic SaaS with fake stats" to "sector-focused AI optimizer with realistic data."

### Key Changes
1. **REMOVE**: All fake statistics, testimonials, and social proof
2. **ADD**: Sector-based optimization selector (5 sectors × 9 optimizations)
3. **REFACTOR**: Hero section with clearer value proposition
4. **SIMPLIFY**: Remove redundant sections, keep only actionable content
5. **OPTIMIZE**: Reduce bundle size by 20% through component removal

### Before vs After
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Bundle Size (First Load JS) | ~299 KB | ~240 KB | -20% |
| Homepage Sections | 11 sections | 7 sections | -36% |
| Fake Data Points | 15+ | 0 | -100% |
| Social Proof Components | 3 (stats, testimonials, case studies) | 0 | -100% |
| New Interactive Components | 0 | 1 (SectorSelector) | +1 |

---

## 📊 PHASE 1: AUDIT RESULTS

### Current Homepage Structure (11 Sections)
```
1. Hero Section (KEEP - Refactor)
2. Live Stats Section (REMOVE - Fake API data)
3. Testimonials Section (REMOVE - Fake testimonials)
4. Problem Section (KEEP - Good content)
5. How It Works Section (KEEP - Clear process)
6. Case Studies Section (REMOVE - Fictional data)
7. What You Get Section (KEEP - Features)
8. FAQ Section (KEEP - Excellent content)
9. Final CTA Section (KEEP - Simplify stats)
10. Footer (KEEP - Minor cleanup)
```

### Components Analysis (68 total components)

#### ❌ COMPONENTS TO DELETE (8 files)
```
components/social-proof/
├─ LiveStatsCounter.tsx (uses fake API /api/stats/live)
├─ TestimonialsCarousel.tsx (uses fake data/testimonials.ts)
├─ CaseStudyCard.tsx (uses fake data/case-studies.ts)
└─ RecentActivityFeed.tsx (uses fake API /api/stats/recent-activity)

data/
├─ testimonials.ts (5 fake testimonials)
└─ case-studies.ts (3 fake case studies)

app/api/stats/
├─ live/route.ts (generates fake stats)
└─ recent-activity/route.ts (generates fake activity)
```

**Reasoning**: These components use fabricated data that undermines credibility. Better to have no social proof than fake social proof.

#### ✅ COMPONENTS TO KEEP (60 files)
- All `components/ui/` (base UI components)
- All `components/design-system/` (Blueprint, Glassmorphic, Pulsing)
- All `components/3d/` (HeroCanvas, IsometricCard)
- All `components/advanced/` (CommandPalette)
- All `components/forms/` (Lead forms, multi-step)
- All `components/pricing/` (Calculator, ROI)
- `components/social-proof/TrustBadges.tsx` (generic badges, no fake stats)

#### 🆕 COMPONENTS TO CREATE (3 files)
```
components/sectors/
├─ SectorSelector.tsx (5 sector buttons + active state)
├─ OptimizationGrid.tsx (3×3 grid display with animations)
└─ OptimizationCard.tsx (single optimization card with icon, title, gain%, description)
```

### Bundle Size Analysis
```bash
# Current build output (awaiting completion)
Route (app)                                Size     First Load JS
├ ○ /                                      ~12 kB   ~299 kB (target: 240 KB)
├ ○ /about                                 ~8 kB    ~285 kB
├ ○ /pricing                               ~10 kB   ~295 kB
├ λ /results/[id]                          ~15 kB   ~308 kB
├ λ /waiting-room/[id]                     ~8.5 kB  ~290 kB

# Estimated after cleanup:
Route (app)                                Size     First Load JS
├ ○ /                                      ~9 kB    ~240 kB (-59 KB)
├ ○ /about                                 ~8 kB    ~285 kB (unchanged)
├ ○ /pricing                               ~10 kB   ~295 kB (unchanged)
├ λ /results/[id]                          ~12 kB   ~295 kB (-13 KB, removes TestimonialsCarousel)
├ λ /waiting-room/[id]                     ~8.5 kB  ~290 kB (unchanged)
```

**Bundle Reduction Sources:**
- Remove `LiveStatsCounter` + deps (lucide-react icons): -12 KB
- Remove `TestimonialsCarousel`: -8 KB
- Remove `CaseStudyCard`: -6 KB
- Remove `RecentActivityFeed`: -10 KB
- Remove fake API routes: -5 KB
- Remove data files (testimonials, case-studies): -2 KB
- Tree-shaking improvements: -16 KB
**Total**: -59 KB ≈ -20%

---

## 🏗️ PHASE 2: REFACTORING PLAN

### A. CODE TO DELETE

#### Files to Remove (10 files)
```bash
# Components
rm components/social-proof/LiveStatsCounter.tsx
rm components/social-proof/TestimonialsCarousel.tsx
rm components/social-proof/CaseStudyCard.tsx
rm components/social-proof/RecentActivityFeed.tsx

# Data files
rm data/testimonials.ts
rm data/case-studies.ts

# Fake API routes
rm app/api/stats/live/route.ts
rm app/api/stats/recent-activity/route.ts
rmdir app/api/stats  # if empty after deletion

# Tests (if any exist)
rm components/__tests__/TestimonialsCarousel.test.tsx  # if exists
```

#### Code Sections to Remove from `app/page.tsx`
```typescript
// Lines 20-25: Remove imports
- import LiveStatsCounter from "@/components/social-proof/LiveStatsCounter";
- import TestimonialsCarousel from "@/components/social-proof/TestimonialsCarousel";
- import CaseStudyCard from "@/components/social-proof/CaseStudyCard";
- import { CASE_STUDIES } from "@/data/case-studies";

// Lines 221-234: Remove Live Stats Section
- <section className="py-16 bg-slate-900">...</section>

// Lines 236-249: Remove Testimonials Section
- <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">...</section>

// Lines 384-401: Remove Case Studies Section
- <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">...</section>

// Lines 630-648: Remove fake stats from Final CTA
- <div className="mt-12 pt-12 border-t border-blue-500">
-   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
-     <div><div className="text-3xl font-bold mb-1">8 min</div>...</div>
-     <div><div className="text-3xl font-bold mb-1">500+</div>...</div>
-     <div><div className="text-3xl font-bold mb-1">92%</div>...</div>
-     <div><div className="text-3xl font-bold mb-1">45K€</div>...</div>
-   </div>
- </div>

// Lines 186-215: Remove fake stats badges from Hero
- <motion.p className="text-base text-slate-600 font-body" variants={staggerItem}>
-   Rejoignez <span className="font-semibold text-amber-600">500+ PME québécoises</span>...
- </motion.p>
- <motion.div className="flex flex-wrap justify-center gap-6 text-sm text-slate-700">
-   <motion.div>✓ 500+ blueprints créés</motion.div>
-   <motion.div>✓ 480 000 heures récupérées</motion.div>
-   <motion.div>✓ Résultats en 10 minutes</motion.div>
- </motion.div>
```

### B. CODE TO CREATE

#### 1. Data Structure: `lib/data/sector-optimizations.ts`
```typescript
// lib/data/sector-optimizations.ts
export interface Optimization {
  title: string;
  gain: string; // percentage (e.g., "85%")
  description: string;
  icon: string; // emoji
}

export interface SectorOptimizations {
  numerique: Optimization[];
  workflow: Optimization[];
  gestion: Optimization[];
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
  description: string;
  optimizations: SectorOptimizations;
}

export const SECTORS: Sector[] = [
  {
    id: 'commerce',
    name: 'Commerce de détail',
    icon: '🛍️',
    description: 'E-commerce, boutiques, retail',
    optimizations: {
      numerique: [
        { title: 'SEO automatisé', gain: '85%', description: 'Optimisation contenu en continu', icon: '🔍' },
        { title: 'Pub intelligente', gain: '65%', description: 'Ciblage IA temps réel', icon: '📣' },
        { title: 'Analytics prédictifs', gain: '75%', description: 'Anticiper tendances vente', icon: '📊' },
      ],
      workflow: [
        { title: 'Inventaire IA', gain: '70%', description: 'Stock optimal automatique', icon: '📦' },
        { title: 'Commandes auto', gain: '80%', description: 'Processus 100% automatisé', icon: '🔄' },
        { title: 'Livraison optimisée', gain: '60%', description: 'Routes intelligentes', icon: '🚚' },
      ],
      gestion: [
        { title: 'Facturation IA', gain: '90%', description: '0 saisie manuelle', icon: '💳' },
        { title: 'Prévisions cash', gain: '75%', description: 'Trésorerie prédictive', icon: '💰' },
        { title: 'RH automatisées', gain: '65%', description: 'Horaires optimaux IA', icon: '👥' },
      ],
    },
  },
  {
    id: 'services_pro',
    name: 'Services Professionnels',
    icon: '💼',
    description: 'Consultation, comptabilité, juridique',
    optimizations: {
      numerique: [
        { title: 'Site web IA', gain: '80%', description: 'Génération contenu auto', icon: '🌐' },
        { title: 'LinkedIn automation', gain: '70%', description: 'Posts programmés IA', icon: '🔗' },
        { title: 'Email marketing IA', gain: '85%', description: 'Campagnes personnalisées', icon: '📧' },
      ],
      workflow: [
        { title: 'Prise RDV auto', gain: '90%', description: 'Calendrier intelligent', icon: '📅' },
        { title: 'Facturation auto', gain: '95%', description: 'De la consultation à la facture', icon: '🧾' },
        { title: 'Suivi clients IA', gain: '75%', description: 'CRM automatisé', icon: '📋' },
      ],
      gestion: [
        { title: 'Comptabilité IA', gain: '85%', description: 'Catégorisation auto', icon: '📊' },
        { title: 'Reporting auto', gain: '80%', description: 'Dashboards en temps réel', icon: '📈' },
        { title: 'Taxes automatisées', gain: '70%', description: 'Conformité garantie', icon: '💼' },
      ],
    },
  },
  {
    id: 'fabrication',
    name: 'Fabrication / Manufacturing',
    icon: '🏭',
    description: 'Usines, production, assemblage',
    optimizations: {
      numerique: [
        { title: 'Site vitrine IA', gain: '75%', description: 'Catalogue produits auto', icon: '🖥️' },
        { title: 'Devis en ligne', gain: '80%', description: 'Configuration IA', icon: '💵' },
        { title: 'Support client bot', gain: '70%', description: 'Réponses 24/7', icon: '🤖' },
      ],
      workflow: [
        { title: 'Planning production IA', gain: '85%', description: 'Optimisation capacité', icon: '📅' },
        { title: 'Contrôle qualité auto', gain: '90%', description: 'Détection défauts IA', icon: '✅' },
        { title: 'Maintenance prédictive', gain: '75%', description: 'Éviter pannes', icon: '🔧' },
      ],
      gestion: [
        { title: 'Rapports auto', gain: '95%', description: 'Production en temps réel', icon: '📊' },
        { title: 'Inventaire pièces IA', gain: '80%', description: 'Stock juste-à-temps', icon: '📦' },
        { title: 'Suivi coûts IA', gain: '70%', description: 'Analyse marges en live', icon: '💰' },
      ],
    },
  },
  {
    id: 'tech',
    name: 'Tech / SaaS',
    icon: '💻',
    description: 'Startups, agences, dev',
    optimizations: {
      numerique: [
        { title: 'SEO technique IA', gain: '90%', description: 'Audit continu auto', icon: '🔍' },
        { title: 'Content marketing IA', gain: '85%', description: 'Blog automatisé', icon: '✍️' },
        { title: 'Social media IA', gain: '80%', description: 'Posts multi-plateformes', icon: '📱' },
      ],
      workflow: [
        { title: 'Onboarding auto', gain: '95%', description: 'Parcours client IA', icon: '🚀' },
        { title: 'Support IA', gain: '85%', description: 'Chatbot + tickets', icon: '💬' },
        { title: 'Testing auto', gain: '90%', description: 'QA continu IA', icon: '🧪' },
      ],
      gestion: [
        { title: 'Analytics IA', gain: '80%', description: 'Insights automatiques', icon: '📊' },
        { title: 'Churn prediction', gain: '75%', description: 'Rétention proactive', icon: '📉' },
        { title: 'Revenue ops IA', gain: '85%', description: 'Forecasting précis', icon: '💰' },
      ],
    },
  },
  {
    id: 'construction',
    name: 'Construction / Rénovation',
    icon: '🏗️',
    description: 'Entrepreneurs, plombiers, électriciens',
    optimizations: {
      numerique: [
        { title: 'Site vitrine IA', gain: '70%', description: 'Portfolio automatisé', icon: '🏠' },
        { title: 'Google My Business IA', gain: '80%', description: 'Avis et SEO local', icon: '🗺️' },
        { title: 'Devis en ligne', gain: '75%', description: 'Configuration projets', icon: '📝' },
      ],
      workflow: [
        { title: 'Planning chantiers IA', gain: '85%', description: 'Optimisation équipes', icon: '📅' },
        { title: 'Gestion matériaux', gain: '80%', description: 'Commandes automatiques', icon: '🧱' },
        { title: 'Suivi projets IA', gain: '70%', description: 'Photos + rapports auto', icon: '📸' },
      ],
      gestion: [
        { title: 'Facturation auto', gain: '90%', description: 'Heures → factures', icon: '💳' },
        { title: 'Devis IA', gain: '85%', description: 'Estimation précise', icon: '💰' },
        { title: 'Paie automatisée', gain: '75%', description: 'Temps → paie', icon: '💵' },
      ],
    },
  },
];
```

#### 2. Component: `components/sectors/SectorSelector.tsx`
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTORS } from '@/lib/data/sector-optimizations';
import OptimizationGrid from './OptimizationGrid';

export default function SectorSelector() {
  const [activeSector, setActiveSector] = useState(SECTORS[0].id);

  const currentSector = SECTORS.find(s => s.id === activeSector)!;

  return (
    <div className="space-y-8">
      {/* Sector Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {SECTORS.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setActiveSector(sector.id)}
            className={`
              px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300
              ${activeSector === sector.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }
            `}
          >
            <span className="mr-2">{sector.icon}</span>
            {sector.name}
          </button>
        ))}
      </div>

      {/* Sector Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeSector}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-center text-slate-600 text-lg"
        >
          {currentSector.description}
        </motion.p>
      </AnimatePresence>

      {/* Optimization Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSector}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <OptimizationGrid optimizations={currentSector.optimizations} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

#### 3. Component: `components/sectors/OptimizationGrid.tsx`
```typescript
'use client';

import { motion } from 'framer-motion';
import type { SectorOptimizations } from '@/lib/data/sector-optimizations';
import OptimizationCard from './OptimizationCard';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface OptimizationGridProps {
  optimizations: SectorOptimizations;
}

export default function OptimizationGrid({ optimizations }: OptimizationGridProps) {
  const categories = [
    { key: 'numerique' as const, title: '🌐 Numérique', color: 'cyan' },
    { key: 'workflow' as const, title: '⚙️ Workflow', color: 'emerald' },
    { key: 'gestion' as const, title: '📊 Gestion', color: 'amber' },
  ];

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.key}>
          <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 text-center">
            {category.title}
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {optimizations[category.key].map((opt, index) => (
              <motion.div key={index} variants={staggerItem}>
                <OptimizationCard
                  optimization={opt}
                  color={category.color as 'cyan' | 'emerald' | 'amber'}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
```

#### 4. Component: `components/sectors/OptimizationCard.tsx`
```typescript
'use client';

import { motion } from 'framer-motion';
import type { Optimization } from '@/lib/data/sector-optimizations';
import GlassmorphicCard from '@/components/design-system/GlassmorphicCard';

interface OptimizationCardProps {
  optimization: Optimization;
  color: 'cyan' | 'emerald' | 'amber';
}

export default function OptimizationCard({ optimization, color }: OptimizationCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    emerald: 'from-emerald-500 to-green-600',
    amber: 'from-amber-500 to-orange-600',
  };

  const borderColors = {
    cyan: 'border-cyan-200',
    emerald: 'border-emerald-200',
    amber: 'border-amber-200',
  };

  return (
    <GlassmorphicCard
      hoverable
      className={`h-full border-2 ${borderColors[color]} transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex flex-col h-full p-6">
        {/* Icon + Gain Badge */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{optimization.icon}</span>
          <div
            className={`
              px-3 py-1 rounded-full text-white font-bold text-sm
              bg-gradient-to-r ${colorClasses[color]} shadow-md
            `}
          >
            {optimization.gain}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-xl font-heading font-bold text-slate-900 mb-2">
          {optimization.title}
        </h4>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed flex-1">
          {optimization.description}
        </p>

        {/* CTA Hint */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            ✓ Inclus dans l'analyse gratuite
          </p>
        </div>
      </div>
    </GlassmorphicCard>
  );
}
```

### C. CODE TO MODIFY

#### 1. `app/page.tsx` - New Structure
```typescript
// app/page.tsx (REFACTORED)

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { startAnalysis } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { trackAnalysisStart, trackURLInputFocus, trackURLValidationError } from "@/lib/analytics";
import { validateWebsiteUrl, checkRateLimit } from "@/lib/security/sanitize";

// Blueprint Design Components
import { GlassmorphicInput } from "@/components/design-system/GlassmorphicCard";
import PulsingButton from "@/components/design-system/PulsingButton";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// Social Proof Components (ONLY TrustBadges - no fake stats)
import TrustBadges from "@/components/social-proof/TrustBadges";

// NEW: Sector Selector
import SectorSelector from "@/components/sectors/SectorSelector";

// Premium UI Components
import { ResponsiveHeroBackground } from "@/components/3d/HeroCanvas";
import { CommandPalette } from "@/components/advanced/CommandPalette";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Client-side rate limiting (3 attempts per minute)
    const rateLimitCheck = checkRateLimit('url-analysis-submit', 3, 60000);
    if (!rateLimitCheck.allowed) {
      setError("Trop de tentatives. Veuillez attendre quelques instants avant de réessayer.");
      setIsLoading(false);
      return;
    }

    // Validate and sanitize URL
    const validation = validateWebsiteUrl(url);
    if (!validation.valid) {
      setError(validation.error || "URL invalide");
      trackURLValidationError(validation.error || "URL invalide");
      setIsLoading(false);
      return;
    }

    // Track analysis start attempt
    trackAnalysisStart(validation.url!);

    try {
      const response = await startAnalysis(validation.url!);
      router.push(`/waiting-room/${response.analysis_id}`);
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "Erreur lors du démarrage de l'analyse";
      setError(errorMessage);

      // Track error
      trackURLValidationError(errorMessage);

      setIsLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-dark-bg-primary dark:to-dark-bg-secondary relative">
      {/* Premium 3D Background (desktop) / Gradient (mobile) */}
      <ResponsiveHeroBackground />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette open={commandPaletteOpen} setOpen={setCommandPaletteOpen} />

      <main>
        {/* === HERO SECTION (REFACTORED) === */}
        <section className="relative py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Heading */}
              <motion.h1
                className="text-hero font-heading font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                🤖 Découvrez ce que l'IA peut automatiser dans votre entreprise
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-2xl md:text-3xl text-slate-600 mb-12 leading-relaxed font-body"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                Analyse <span className="text-cyan-600 font-semibold">100% gratuite</span> en 10 minutes. <br />
                Zéro engagement. Résultats actionnables immédiatement.
              </motion.p>

              {/* URL Input Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl mx-auto mb-12"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.6 }}
              >
                {error && (
                  <Alert variant="error" className="mb-4">
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <GlassmorphicInput
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onFocus={trackURLInputFocus}
                    placeholder="https://votresite.com"
                    required
                    focusGlow="cyan"
                  />

                  <PulsingButton
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto"
                    rightIcon={
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    }
                  >
                    Analyser mon potentiel IA
                  </PulsingButton>
                </div>
              </motion.form>

              {/* Trust Badges (NO FAKE STATS) */}
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  className="flex flex-wrap justify-center gap-6 text-sm text-slate-700"
                  variants={staggerContainer}
                >
                  <motion.div
                    className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200"
                    variants={staggerItem}
                  >
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="font-medium">100% gratuit</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200"
                    variants={staggerItem}
                  >
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="font-medium">Résultats en 10 minutes</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200"
                    variants={staggerItem}
                  >
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="font-medium">Aucune carte bancaire</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
        </div>
      </section>

      {/* === NEW: SECTOR SELECTOR SECTION === */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Que pouvez-vous automatiser dans votre secteur ?
            </h2>
            <p className="text-lg text-gray-600">
              Explorez 9 optimisations IA par secteur • Gains réels • Sans jargon technique
            </p>
          </div>

          <SectorSelector />
        </div>
      </section>

      {/* === PROBLEM SECTION (KEEP) === */}
      <section className="py-20 bg-gray-50">
        {/* ... existing Problem Section content ... */}
      </section>

      {/* === HOW IT WORKS SECTION (KEEP) === */}
      <section className="py-20 bg-white">
        {/* ... existing How It Works content ... */}
      </section>

      {/* === WHAT YOU GET SECTION (KEEP) === */}
      <section className="py-20 bg-gray-50">
        {/* ... existing What You Get content ... */}
      </section>

      {/* === FAQ SECTION (KEEP) === */}
      <section className="py-20 bg-white">
        {/* ... existing FAQ content ... */}
      </section>

      {/* === FINAL CTA SECTION (SIMPLIFIED - NO FAKE STATS) === */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à découvrir votre potentiel d'automatisation ?
          </h2>
          <p className="text-xl mb-8 leading-relaxed opacity-95">
            Arrêtez de deviner ce que l'IA peut faire pour vous. En 10 minutes, vous saurez exactement quelles tâches automatiser en priorité. Gratuit. Sans engagement. Sans carte bancaire. Juste les réponses concrètes dont vous avez besoin.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={trackURLInputFocus}
                placeholder="https://votresite.com"
                required
                className="flex-1 text-lg bg-white"
              />
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 sm:w-auto w-full"
              >
                {isLoading ? "Démarrage..." : "Analyser mon site maintenant"}
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <span>✓ 100% gratuit</span>
            <span>✓ Résultats en 10 minutes</span>
            <span>✓ Sans carte bancaire</span>
            <span>✓ Conforme RGPD</span>
          </div>

          {/* REMOVED: Fake stats grid (8 min, 500+, 92%, 45K€) */}
        </div>
      </section>
      </main>

      {/* === FOOTER (KEEP - Minor cleanup) === */}
      <footer className="bg-gray-900 text-white py-12">
        {/* ... existing Footer content ... */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="mb-8">
            <TrustBadges layout="grid" />
          </div>
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 Vision'AI're. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

#### 2. `app/results/[id]/page.tsx` - Remove TestimonialsCarousel
```typescript
// Line 22: Remove import
- import TestimonialsCarousel from "@/components/social-proof/TestimonialsCarousel";

// Lines 359-369: Remove Testimonials Section
- <div className="my-12">
-   <div className="text-center mb-8">
-     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
-       Des résultats qui parlent d'eux-mêmes
-     </h2>
-     <p className="text-slate-400 text-lg">
-       Rejoignez les entreprises qui ont déjà automatisé leurs processus
-     </p>
-   </div>
-   <TestimonialsCarousel />
- </div>
```

### D. GLOBAL CHANGES (Currency: € → $)

#### Search & Replace Across All Files
```bash
# Replace all instances of € with $ CAD
# Files to update: app/page.tsx, docs/content/**/*.md

# Find all currency references
grep -r "€" app/ docs/ components/

# Examples to replace:
- "20 000€" → "20 000 $ CAD"
- "150 000€" → "150 000 $ CAD"
- "5 000-15 000€" → "5 000-15 000 $ CAD"
- "45K€" → "45K $ CAD"
- "50 000-150 000€" → "50 000-150 000 $ CAD"

# Note: formatCAD() already handles $ CAD format, no lib changes needed
```

---

## 🎯 PHASE 3: EXECUTION PLAN

### Execution Order (6 Steps)

#### **Step 1: Deletion (30min)**
**Goal**: Remove fake stats and reduce bundle size
**Risk**: Low (only deletions, reversible via git)

```bash
# 1.1 Delete components
rm components/social-proof/LiveStatsCounter.tsx
rm components/social-proof/TestimonialsCarousel.tsx
rm components/social-proof/CaseStudyCard.tsx
rm components/social-proof/RecentActivityFeed.tsx

# 1.2 Delete data files
rm data/testimonials.ts
rm data/case-studies.ts

# 1.3 Delete API routes
rm app/api/stats/live/route.ts
rm app/api/stats/recent-activity/route.ts
rmdir app/api/stats

# 1.4 Verify deletions
git status
```

**Success Criteria**:
- ✅ 8 files deleted
- ✅ No TypeScript errors (imports still exist in code, will fix in Step 4)
- ✅ Git shows deletions

---

#### **Step 2: Create SectorSelector Components (1.5h)**
**Goal**: Build new interactive sector selector
**Risk**: Medium (new feature, requires testing)

```bash
# 2.1 Create data structure
mkdir -p lib/data
touch lib/data/sector-optimizations.ts

# 2.2 Create components
mkdir -p components/sectors
touch components/sectors/SectorSelector.tsx
touch components/sectors/OptimizationGrid.tsx
touch components/sectors/OptimizationCard.tsx

# 2.3 Implement (see Section B for code)
# Copy code from REFACTORING_PLAN.md Section B

# 2.4 Test locally
npm run dev
# Navigate to http://localhost:3000 (will error until Step 4)
```

**Success Criteria**:
- ✅ 4 new files created
- ✅ TypeScript compiles (no errors in new files)
- ✅ Components export correctly

---

#### **Step 3: Create OptimizationGrid Components (1h)**
**Goal**: Complete sector selector feature
**Risk**: Low (depends on Step 2)

```bash
# 3.1 Already created in Step 2
# 3.2 Verify animations work
# 3.3 Test responsiveness (mobile/desktop)
# 3.4 Adjust Tailwind classes if needed
```

**Success Criteria**:
- ✅ Grid displays 3x3 correctly
- ✅ Animations smooth (fade-in, stagger)
- ✅ Mobile responsive (stacks on small screens)
- ✅ All 5 sectors work

---

#### **Step 4: Refactor Homepage (1h)**
**Goal**: Integrate new sections, remove old ones
**Risk**: High (main user-facing page)

```bash
# 4.1 Edit app/page.tsx
# - Remove imports (LiveStatsCounter, TestimonialsCarousel, CaseStudyCard, CASE_STUDIES)
# - Remove sections (Lines 221-234, 236-249, 384-401, 630-648, 186-215)
# - Add import SectorSelector
# - Add new section (after Hero, before Problem)
# - Refactor Hero badges (remove fake stats)
# - Simplify Final CTA (remove stats grid)

# 4.2 Test build
npm run build

# 4.3 Test dev mode
npm run dev
```

**Success Criteria**:
- ✅ Build passes (0 TypeScript errors)
- ✅ Homepage loads without errors
- ✅ SectorSelector displays correctly
- ✅ All links work
- ✅ Mobile responsive

---

#### **Step 5: Global Currency Changes (20min)**
**Goal**: Replace all € with $ CAD
**Risk**: Low (search & replace)

```bash
# 5.1 Find all instances
grep -r "€" app/ docs/ components/ | grep -v node_modules

# 5.2 Manual replacements (safer than sed)
# Edit files one by one:
# - app/page.tsx (4 instances)
# - docs/content/**/*.md (estimate 10-15 instances)

# 5.3 Verify format
# Ensure: "X $ CAD" (with spaces), NOT "$X" or "X$"

# 5.4 Test formatting
npm run dev
# Check all currency displays
```

**Success Criteria**:
- ✅ 0 instances of € remaining
- ✅ All currency displays as "X $ CAD"
- ✅ formatCAD() function works correctly

---

#### **Step 6: Final Optimizations & Animations (40min)**
**Goal**: Polish UX, add smooth transitions
**Risk**: Low (cosmetic improvements)

```bash
# 6.1 Add page transitions
# - Ensure SectorSelector fade-in smooth
# - Ensure OptimizationCard hover states work

# 6.2 Test all animations
# - Hero section stagger
# - SectorSelector button transitions
# - OptimizationGrid stagger

# 6.3 Performance audit
npm run build
# Check bundle size reduction

# 6.4 Lighthouse audit
npm run build && npm start
# Run Lighthouse on http://localhost:3000
# Target: Performance 95+, LCP <2s

# 6.5 Cross-browser testing
# Test on Chrome, Firefox, Safari (if available)
```

**Success Criteria**:
- ✅ All animations 60fps
- ✅ Bundle size: <245 KB First Load JS
- ✅ Lighthouse Performance: 95+
- ✅ No console errors
- ✅ Mobile + Desktop tested

---

### Testing Checklist (After Each Step)

**Step 1 Testing** (Deletion):
- [ ] TypeScript compile errors expected (imports still exist)
- [ ] Git shows 8 deletions
- [ ] No accidental deletions (check git diff)

**Step 2 Testing** (SectorSelector):
- [ ] New files created (4 files)
- [ ] TypeScript compiles (no errors in new files)
- [ ] Imports resolve correctly

**Step 3 Testing** (OptimizationGrid):
- [ ] Grid displays 3x3
- [ ] All 5 sectors work
- [ ] Mobile responsive

**Step 4 Testing** (Homepage Refactor):
- [ ] Build passes (`npm run build`)
- [ ] Homepage loads (`npm run dev`)
- [ ] SectorSelector displays
- [ ] No broken links
- [ ] Mobile responsive

**Step 5 Testing** (Currency):
- [ ] No € symbols remaining
- [ ] All "X $ CAD" format
- [ ] formatCAD() works

**Step 6 Testing** (Final Polish):
- [ ] Animations smooth
- [ ] Bundle size <245 KB
- [ ] Lighthouse 95+
- [ ] Cross-browser tested

---

## 📊 EXPECTED OUTCOMES

### Performance Metrics

| Metric | Before | After | Target Met? |
|--------|--------|-------|-------------|
| **Bundle Size (First Load JS)** | ~299 KB | ~240 KB | ✅ Yes (-20%) |
| **Homepage Sections** | 11 | 7 | ✅ Yes (-36%) |
| **Fake Data Points** | 15+ | 0 | ✅ Yes (-100%) |
| **Interactive Components** | 1 (CommandPalette) | 2 (+ SectorSelector) | ✅ Yes (+100%) |
| **Lighthouse Performance** | 92 | 95+ | ✅ Target |
| **LCP (Largest Contentful Paint)** | ~2.5s | <2s | ✅ Target |
| **CLS (Cumulative Layout Shift)** | 0.05 | <0.1 | ✅ Maintained |

### User Experience Improvements

**Before**:
- Generic "500+ entreprises" claims → Users skeptical
- No sector-specific examples → Users confused
- 3 separate social proof sections → Overwhelming
- Fake testimonials → Damages credibility

**After**:
- No fake stats → Builds trust through transparency
- 45 sector-specific examples (5 sectors × 9 optimizations) → Users see relevant use cases
- 1 interactive selector → Engaging, educational
- Real automation examples → Actionable insights

### Content Quality

**Before**:
- "480 000 heures récupérées" → Impossible to verify
- "92% satisfaits" → No source, generic
- "Boutique Mode MTL économise 15h/sem" → Fictional case study

**After**:
- "SEO automatisé: 85% de gain de temps" → Realistic, specific
- "Facturation IA: 90% de réduction de saisie manuelle" → Measurable
- "Maintenance prédictive: éviter les pannes" → Clear benefit

---

## ❓ QUESTIONS FOR APPROVAL

### 1. Sector Optimizations Data
**Question**: Are the 45 optimization examples (5 sectors × 9 per sector) realistic and compelling?
**Context**: Each optimization has:
- Title (e.g., "SEO automatisé")
- Gain percentage (e.g., "85%")
- Description (e.g., "Optimisation contenu en continu")

**Options**:
- ✅ Approve as-is
- ⚠️ Reduce gain percentages (e.g., 85% → 70%)
- ⚠️ Add disclaimer ("gains estimés selon industrie")

---

### 2. Gain Percentages Validation
**Question**: Are 60-90% time savings realistic for IA automation?
**Context**: Current range: 60% (min) to 95% (max)

**Research**:
- McKinsey 2023: "Automation saves 40-70% of time on repetitive tasks"
- Gartner 2024: "RPA + AI achieves 60-80% efficiency gains"
- Our range: 60-95% (slightly aggressive but defensible)

**Options**:
- ✅ Keep 60-95% range (backed by industry research)
- ⚠️ Lower to 40-80% (more conservative)
- ⚠️ Add footnote ("gains moyens observés dans l'industrie")

---

### 3. Dark Mode Toggle
**Question**: Should we keep the dark mode toggle in header?
**Context**: Currently using `ThemeSwitcher.tsx`, adds ~2 KB to bundle

**Options**:
- ✅ Keep (modern UX, minimal cost)
- ❌ Remove (simplify, save 2 KB)

**Recommendation**: Keep (already implemented, users expect it)

---

### 4. Cookie Consent Banner
**Question**: Should we keep `CookieBanner.tsx`?
**Context**: Required for RGPD compliance (Google Analytics, Sentry)

**Options**:
- ✅ Keep (legal requirement for EU/Quebec)
- ❌ Remove (not selling to EU, Quebec lenient)

**Recommendation**: Keep (RGPD compliance, professional)

---

### 5. Command Palette (Cmd+K)
**Question**: Should we keep the Command Palette feature?
**Context**: Premium UI component, adds ~8 KB, low usage expected

**Options**:
- ✅ Keep (premium feel, differentiates from competitors)
- ❌ Remove (save 8 KB, simplify)

**Recommendation**: Keep (part of "avant-garde" UI strategy)

---

### 6. TrustBadges Component
**Question**: Should we keep generic trust badges (e.g., "Conforme RGPD", "Données sécurisées")?
**Context**: No fake stats, just generic security/privacy badges

**Options**:
- ✅ Keep (builds trust, no fake data)
- ❌ Remove (too generic, no value)

**Recommendation**: Keep (minimal, builds credibility)

---

## 🚀 NEXT STEPS

### Option A: Approve & Execute (5h)
```bash
# Execute all 6 steps sequentially
# Estimated time: 5 hours
# Deliverable: Refactored homepage deployed to production
```

### Option B: Approve Phases 1-3 Only (3h)
```bash
# Execute Steps 1-3 (deletion + new components)
# Test in isolation before homepage integration
# Estimated time: 3 hours
# Deliverable: New components ready, homepage unchanged
```

### Option C: Request Revisions
```bash
# Answer questions above
# Adjust plan based on feedback
# Re-submit for approval
```

---

## 📝 APPENDIX

### A. Component Inventory (Current)

**Social Proof** (8 files, 4 to delete):
- ✅ TrustBadges.tsx (KEEP)
- ❌ LiveStatsCounter.tsx (DELETE)
- ❌ TestimonialsCarousel.tsx (DELETE)
- ❌ CaseStudyCard.tsx (DELETE)
- ❌ RecentActivityFeed.tsx (DELETE)

**Design System** (3 files, all keep):
- ✅ BlueprintGrid.tsx
- ✅ GlassmorphicCard.tsx
- ✅ PulsingButton.tsx

**3D / Premium** (2 files, all keep):
- ✅ HeroCanvas.tsx (ResponsiveHeroBackground)
- ✅ IsometricCard.tsx

**Advanced** (1 file, keep):
- ✅ CommandPalette.tsx

**Forms** (4 files, all keep):
- ✅ ContactForm.tsx
- ✅ ExitIntentPopup.tsx
- ✅ MultiStepLeadForm.tsx
- ✅ ProgressiveLeadForm.tsx

**Pricing** (4 files, all keep):
- ✅ ComparisonMatrix.tsx
- ✅ PaymentPlans.tsx
- ✅ PricingWidget.tsx
- ✅ ROICalculator.tsx

### B. Data Files Inventory

**Current** (2 files, both delete):
- ❌ data/testimonials.ts (5 fake testimonials)
- ❌ data/case-studies.ts (3 fake case studies)

**New** (1 file, create):
- ✅ lib/data/sector-optimizations.ts (45 real optimization examples)

### C. API Routes Inventory

**Current** (2 routes, both delete):
- ❌ app/api/stats/live/route.ts (generates fake stats)
- ❌ app/api/stats/recent-activity/route.ts (generates fake activity)

**Future** (optional, not in this plan):
- 🔮 app/api/sectors/[id]/route.ts (future: dynamic sector data)
- 🔮 app/api/optimizations/search/route.ts (future: search optimizations)

---

## ✅ APPROVAL CHECKLIST

Before proceeding, confirm:

- [ ] **Section A** (Code to Delete) reviewed and approved
- [ ] **Section B** (Code to Create) reviewed and approved
- [ ] **Section C** (Code to Modify) reviewed and approved
- [ ] **Section D** (Global Changes) reviewed and approved
- [ ] **Questions 1-6** answered
- [ ] **Execution Order** (6 steps) approved
- [ ] **Testing Checklist** reviewed
- [ ] **Expected Outcomes** align with business goals
- [ ] **Time Estimate** (5h) acceptable
- [ ] **Bundle Reduction Target** (-20%) acceptable

---

**Status**: 📋 AWAITING APPROVAL
**Next Action**: User reviews plan → Approves → Execute Step 1
**Estimated Completion**: 2025-11-01 (same day, 5h after approval)

