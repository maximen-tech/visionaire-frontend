# PROJECT CONTEXT: Vision'AI're - Analyseur Maturité Digitale (PHASE 2)

## 🎯 MISSION
MVP SaaS B2B : Analyse automatisée focus **TEMPS SAUVÉ** en 2 minutes.

**Phase 2 (Oct 2025) - Frontend Transformation:**
- ✅ Backend déployé (time-focused API)
- 🔄 "War Room" → "Waiting Room" (Salle d'Attente Virtuelle)
- 🔄 Dual View layout (Logs 35% + Message 65%)
- 🔄 Progressive storytelling (5 phases typewriter)
- 🔄 Enhanced Results avec valorisation input ($/h)
- 🔄 Optimized lead conversion form

**Status:** Backend 100% | Frontend 0% → 100%

## 1. BASH COMMANDS (High Frequency)

### Frontend (visionaire-frontend)
- `npm run dev` : Start Next.js dev (port 3000)
- `npm run build` : Production build
- `npm run lint:fix` : Fix linting
- `npm run test:e2e` : Run Playwright tests
- `npm install [package]` : Add dependency

## 2. CODE STYLE (Non-Negotiable Directives)

### Frontend (TypeScript/Next.js)
- Language: TypeScript strict mode
- Framework: Next.js 15.0.2 (App Router ONLY)
- React: 19 (hooks: useState, useEffect)
- Styling: Tailwind CSS
- Forms: React Hook Form + Zod
- Imports: Absolute paths (@/components/*)
- Naming: Components PascalCase, functions camelCase
- ⚠️ NO any type: Always explicit typing
- Currency: "X $ CAD" (espace avant $, style québécois)

## 3. WORKFLOW CRITICAL (Phase 2)

### New Route Structure
```
app/
├─ waiting-room/[id]/page.tsx  (NEW: formerly War Room)
├─ results/[id]/page.tsx       (ENHANCED: valorisation)
└─ page.tsx                    (homepage)
```

### New Components
```
components/
├─ ProgressiveMessage.tsx      (NEW: 5-phase storytelling)
├─ LogStream.tsx               (existing)
├─ OpportunityCard.tsx         (NEW: time opportunity display)
└─ LeadConversionForm.tsx      (ENHANCED)
```

### Critical UX Rules
1. **Message completes BEFORE redirect** (même si analyse terminée)
2. **Typewriter speed: 20ms/char** (ajustable)
3. **Pause 3 sec après message** avant bouton redirect
4. **Valorisation input requis** avant afficher $ values
5. **Transitions smooth** (fade, pas de cuts)

## 4. ARCHITECTURE PATTERNS

### Backend API Response (Phase 2)
```typescript
interface AnalysisResults {
  analysis_id: string;
  status: string;
  url: string;
  identity_a1: {
    company_name: string;
    owner_first_name: string | null;  // Peut être null!
    sector: string;
    size: string;
    tier: string;
  };
  digital_presence: TimeOpportunity;
  value_creation: TimeOpportunity;
  business_management: TimeOpportunity;
  total_hours_per_week: number;
  total_hours_per_year: number;
  implementation_time_solo: { hours: number; description: string };
  implementation_time_expert: { hours: number; description: string };
}

interface TimeOpportunity {
  hours_per_week: number;
  hours_per_year: number;
  problem_teaser: string;
  complexity_level: number;  // 1-10
  tools_hint: string;
}
```

### State Management (Waiting Room)
```typescript
const [phase, setPhase] = useState(1); // 1-5
const [progress, setProgress] = useState(0);
const [identityData, setIdentityData] = useState(null);
const [timeData, setTimeData] = useState(null);
const [messageComplete, setMessageComplete] = useState(false);
const [showRedirectButton, setShowRedirectButton] = useState(false);
```

### State Management (Results Page)
```typescript
const [hourlyRate, setHourlyRate] = useState(null);
const [showValorization, setShowValorization] = useState(false);
```

## 5. TESTING STRATEGY

### E2E Tests (À mettre à jour)
- [ ] Rename war-room.spec.ts → waiting-room.spec.ts
- [ ] Test progressive message (5 phases)
- [ ] Test valorisation input flow
- [ ] Test message complete before redirect
- [ ] Update visual regression snapshots

## 6. DEPLOYMENT

### Environment Variables
```
NEXT_PUBLIC_API_URL=https://visionaire-bff-production.up.railway.app
```

### Vercel
- Auto-deploy on push to main
- Build command: `npm run build`
- Output: `.next/`

## 7. PHASE 2 PRIORITIES (Frontend)

**TO DO (Cette session) :**
- 🔄 Create /waiting-room/[id] route
- 🔄 Build ProgressiveMessage component
- 🔄 Implement typewriter effect
- 🔄 Update /results/[id] with valorisation
- 🔄 Create OpportunityCard component
- 🔄 Enhance LeadConversionForm
- 🔄 Update all redirects

**Success Criteria :**
- ✅ Waiting Room Dual View functional
- ✅ Message completes before redirect
- ✅ Valorisation calculates $ dynamically
- ✅ Lead form has urgency elements
- ✅ Mobile responsive

## 8. PHASE MESSAGES (Content)

### Phase 1 (0-20%): Bienvenue
```
Bonjour [Nom]! Félicitations de prendre action...
```

### Phase 2 (20-45%): Découverte
```
Notre IA vient de scanner... ✓ Votre entreprise: [Nom]
```

### Phase 3 (45-75%): Analyse
```
L'IA compare votre présence digitale...
```

### Phase 4 (75-95%): Révélation
```
Opportunité 1: [X]h/sem, Opportunité 2: [Y]h/sem...
```

### Phase 5 (95-100%): Invitation
```
Total: [Z] heures/an! Voulez-vous savoir comment?
```

## 9. NOTES IMPORTANTES

### Fallbacks
- `owner_first_name` null → "Monsieur/Madame"
- Missing data → Afficher placeholders
- API error → Message user-friendly

### Performance
- Lazy load components (React.lazy)
- Optimize images (next/image)
- SSE: Auto-reconnect on disconnect

### Accessibility
- ARIA labels sur formulaires
- Keyboard navigation
- Screen reader compatible

## 10. EXPERT ROLE

<role>
Senior Frontend Engineer spécialisé en:
- Next.js 15 App Router
- React 19 hooks
- TypeScript strict
- Tailwind CSS
- UX/Conversion optimization
- Real-time SSE streams

Mission: Créer une expérience Waiting Room immersive
qui démontre la puissance de l'IA et convertit leads.

Principe: Time > Money. Suspense > Information dump.
</role>