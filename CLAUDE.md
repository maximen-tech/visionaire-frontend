# Claude Code Web - Frontend Setup

## Environment Configuration

### sessionStart Hook
```bash
# Install Node dependencies
npm install

# Setup environment
cp .env.example .env.local

# Verify installations
node --version
npm --version
npx next --version
```

### Network Access
- **Mode**: Limited (default allowlist)
- **Required Domains**:
  - registry.npmjs.org (npm packages)
  - github.com (git operations)
  - vercel.com (deployment checks)

### Tests Before Code
```bash
# Always run type check + lint FIRST
npm run lint
npx tsc --noEmit
```

## Critical Context for Claude Code Web

**Current Priority**: Phase 2 - Waiting Room + Valorisation
**Critical Components**: 
  - `app/waiting-room/[id]/page.tsx` (SSE + Progressive Message)
  - `components/ProgressiveMessage.tsx` (5-phase storytelling)
  - `components/OpportunityCard.tsx` (Time opportunities)
**Test Strategy**: E2E Playwright tests (DO NOT run in cloud, local only)
**Git Strategy**: Work on branch `feature/phase2-frontend`
```

---

### **2. Workflow Optimisé avec Claude Code Web**

#### **Nouveau Workflow Desktop → Cloud → PR**
```
┌─────────────────────────────────────────────────────────────┐
│         CLAUDE DESKTOP (Toi - Stratégie)                    │
│                                                              │
│  1. Review Documentation (TASKS.md, STATE.md)               │
│  2. Créer Spec Détaillée (.claude/specs/task-name.md)       │
│  3. Identifier Tâche Prioritaire (ex: BE-003)               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│      INITIATE TASK VIA CLAUDE CODE WEB                      │
│      https://claude.ai/code                                 │
│                                                              │
│  1. Select Repository: visionaire-bff                       │
│  2. Select Branch: main (or feature/phase2-backend)         │
│  3. Paste Spec from Desktop:                                │
│                                                              │
│     "Implement BE-003: Parse Financial Impacts              │
│                                                              │
│      Context:                                               │
│      - Read visionaire-bff/TASKS.md task BE-003             │
│      - Read visionaire-bff/ARCHITECTURE.md                  │
│      - File: app/tassks/analysis_tasks.py                    │
│                                                              │
│      Requirements:                                          │
│      - Create parse_financial_impact(text: str) -> int      │
│      - Support formats: '12 000 $', '12000$', '12k$'        │
│      - Add unit tests in tests/test_parsers.py              │
│      - Run tests BEFORE writing code                        │
│                                                              │
│      Success Criteria:                                      │
│      - All tests pass (pytest)                              │
│      - No breaking changes to existing API                  │
│      - Update STATE.md: BE-003 IN_PROGRESS → DONE          │
│                                                              │
│      Branch: feature/be-003-parse-financial-impacts"        │
│                                                              │
│  4. Click "Start Task"                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│      CLAUDE CODE WEB EXECUTION (Autonomous)                 │
│                                                              │
│  • Clones repo to Anthropic-managed VM                      │
│  • Runs sessionStart hook (pip install)                     │
│  • Reads CLAUDE.md context                                  │
│  • Analyzes code architecture                               │
│  • Writes tests FIRST (TDD approach)                        │
│  • Implements parse_financial_impact()                      │
│  • Runs pytest validation                                   │
│  • Updates STATE.md automatically                           │
│  • Commits with Conventional Commits format                 │
│  • Pushes to branch feature/be-003-parse-financial-impacts  │
│                                                              │
│  Duration: ~15-30 minutes (autonomous)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         NOTIFICATION & PR CREATION                          │
│                                                              │
│  • Claude Code Web notifies: "Task Complete ✅"             │
│  • Click "Create Pull Request" button                       │
│  • PR auto-created on GitHub with:                          │
│    - Title: "feat(backend): implement financial parser"     │
│    - Description: Auto-generated from commits               │
│    - Files changed: Detailed diff                           │
│    - Tests: All passing ✅                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│      CLAUDE DESKTOP REVIEW (Toi)                            │
│                                                              │
│  1. Review PR on GitHub                                     │
│  2. Check code quality, tests, conventions                  │
│  3. Approve & Merge OR Request changes                      │
│  4. Update TASKS.md: Move BE-003 to DONE                    │
│  5. Initiate next task (FE-006, FE-005...)                  │
└─────────────────────────────────────────────────────────────┘
```

---

### **3. Tâches Idéales pour Claude Code Web**

Selon la doc, **Claude Code Web excelle pour** :

✅ **Backend Tasks (Parfait pour Phase 2)** :
- ✅ **BE-003** (Parse Financial Impacts) - Well-defined, tests-driven
- ✅ **BE-002** (AI Prompts Optimization) - Code analysis + refactoring
- ✅ **BE-004** (AI Tests) - Mock fixtures + unit tests

✅ **Frontend Components** :
- ✅ **FE-006** (ComplexityBar) - Isolated component, clear spec
- ✅ **FE-005** (OpportunityCard) - Isolated component, clear spec
- ✅ **FE-007** (Update Redirects) - Search & replace task

⚠️ **Modéré pour Claude Code Web** :
- ⚠️ **FE-003** (ProgressiveMessage) - Complexe UX, requires steering
- ⚠️ **FE-002** (Waiting Room Route) - Multiple interactions, SSE logic

❌ **Moins Idéal pour Cloud** :
- ❌ **FE-009** (E2E Playwright Tests) - Require browser, mieux en local
- ❌ **FE-010** (Visual Snapshots) - Require screenshots, local only

---

### **4. Workflow Parallèle Optimisé**

**Stratégie : 2 Sessions Parallèles (Backend + Frontend)**

#### **Session 1 : Backend Critical Path** 🔴
```
claude.ai/code → visionaire-bff
Task: "Implement BE-003 + BE-002 + BE-004 (backend Phase 2 critical)"
Branch: feature/phase2-backend
Duration: ~4-6h autonomous
```

#### **Session 2 : Frontend Components** 🔵
```
claude.ai/code → visionaire-frontend  
Task: "Implement FE-006 + FE-005 + FE-007 (UI components Phase 2)"
Branch: feature/phase2-frontend-components
Duration: ~3-4h autonomous# PROJECT CONTEXT: Vision'AI're - Analyseur Maturité Digitale (PHASE 2)

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