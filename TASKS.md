# Visionaire Frontend - Task Backlog

## P0 Tasks (Critical - This Week)

### FE-002: Create Waiting Room Route ✅ DONE
**Effort**: Medium (3-4h) | **Priority**: P0 | **Status**: ✅ Complete (already implemented)

**Implementation** (Completed):
1. ✅ Created `/app/waiting-room/[id]/page.tsx` with full SSE integration
2. ✅ Implemented dual-view layout: 35% logs (left) + 65% message (right)
3. ✅ Integrated SSE connection with retry logic (exponential backoff, max 3 attempts)
4. ✅ Added responsive mobile layout (stacked views with order-1/order-2)
5. ✅ Analytics tracking (Google Analytics + Sentry)
6. ✅ Error handling with toast notifications
7. ✅ Blueprint grid background + GlassmorphicCard design system

**Success Criteria** (All Met):
- ✅ Dual-view layout functional on desktop
- ✅ SSE connection established and receiving events
- ✅ Progress bar synced with backend events
- ✅ Mobile responsive (stacked views)
- ✅ Message completion with 3-second pause before redirect
- ✅ Dark mode support
- ✅ Analytics and error monitoring

**Files**:
  - `app/waiting-room/[id]/page.tsx` (fully implemented)
  - `components/LogStream.tsx` (terminal-style logs)
  - `components/ProgressBar.tsx` (animated progress)
  - `components/ProgressiveMessage.tsx` (5-phase storytelling)
  - `lib/animations.ts` (Framer Motion variants)

**Notes**:
- Route was already fully implemented before this task
- Implementation exceeds specifications with analytics, error monitoring, retry logic
- FE-003 (ProgressiveMessage) was also already complete

---

### FE-003: Build ProgressiveMessage Component ✅ DONE
**Effort**: Medium (2h) | **Priority**: P0 | **Status**: ✅ Complete (already implemented)

**Implementation** (Completed):
1. ✅ Created component with 5-phase logic:
   - Phase 1 (0-20%): Bienvenue (greeting with first name)
   - Phase 2 (20-45%): Découverte (company identification)
   - Phase 3 (45-75%): Analyse (comparison to standards)
   - Phase 4 (75-95%): Révélation (opportunity breakdown)
   - Phase 5 (95-100%): Invitation (total hours + CTA)
2. ✅ Implemented typewriter effect (20ms/char) with smooth character-by-character animation
3. ✅ Added 3-second pause before triggering onComplete callback
4. ✅ Dynamic content insertion (firstName, companyName, sector, size, totalHours)
5. ✅ Phase badge and progress dots UI
6. ✅ Smooth transitions with Framer Motion (AnimatePresence)
7. ✅ GlassmorphicCard design with gradient styling

**Success Criteria** (All Met):
- ✅ Message completes BEFORE redirect button appears (3s pause enforced)
- ✅ Typewriter smooth at 20ms/char (TYPING_SPEED constant)
- ✅ Dynamic content insertion (identityData, totalHours)
- ✅ Phase transitions smooth (no cuts, fadeIn animation)
- ✅ Fallback handling for null data (Monsieur/Madame, placeholder text)
- ✅ Progress indicator (phase dots + percentage)

**Files**:
  - `components/ProgressiveMessage.tsx` (fully implemented with 180 lines)
  - `lib/animations.ts` (fadeIn variant)
  - `components/design-system/GlassmorphicCard.tsx` (used for styling)

**Notes**:
- Component was already fully implemented before this task
- Exceeds specifications with advanced UI (phase badge, progress dots, glassmorphic design)
- Used in FE-002 (Waiting Room route)

---

### FE-004: Enhance Results Page - Valorisation ⚠️ BLOCKS BY BE-003
**Effort**: Medium (2-3h) | **Priority**: P0 | **Status**: BLOCKED

**Problem**: Results page doesn't show financial valorization - users can't see $ value of time saved.

**Blocker**: BE-003 (Backend must parse "15000-25000" → {min: 15000, max: 25000})

**Implementation**:
1. Add hourly rate input field (1h)
2. Calculate weekly/annual $ savings (30min)
3. Display valorization dynamically (1h)
4. Format as "X $ CAD" (Quebec style) (30min)

**Success Criteria**:
- Hourly rate input validated ($20-$500/h range)
- Weekly savings = rate × total_hours_per_week
- Annual savings = rate × total_hours_per_year
- Display format: "1,300 $ CAD/year"

**Blocks**: None (once BE-003 complete)
**Files**: `app/results/[id]/page.tsx`, `components/ValorizationInput.tsx` (new)

---

### FE-005: Create OpportunityCard Component
**Effort**: Small (1-2h) | **Priority**: P0 | **Status**: Not Started

**Implementation**:
1. Create card component (30min)
2. Display time savings (hours/week, hours/year) (15min)
3. Add complexity bar integration (15min)
4. Calculate $ value if hourly rate provided (30min)

**Success Criteria**:
- 3 cards displayed (Digital, Value, Business)
- Complexity bar visible
- $ value shown when hourly rate input

**Blocks**: None
**Files**: `components/OpportunityCard.tsx` (new)

---

### FE-006: Create ComplexityBar Component ✅ DONE
**Effort**: Small (1h) | **Priority**: P0 | **Status**: ✅ Complete (2025-10-28)

**Implementation** (Completed):
1. ✅ Updated component with animated gradient fill using Framer Motion
2. ✅ Added props: `showLabel`, `height`, `className`
3. ✅ Implemented full ARIA attributes for accessibility
4. ✅ Created 7 comprehensive unit tests (all passing)
5. ✅ Dark mode support with Tailwind classes
6. ✅ TypeScript strict mode compliance

**Success Criteria** (All Met):
- ✅ Visual progress bar with gradient colors (green/yellow/red)
- ✅ Smooth animation on mount (800ms ease-out)
- ✅ Responsive on all screen sizes
- ✅ Accessibility compliant (role="progressbar", ARIA labels)
- ✅ Unit tests: 7/7 passing
- ✅ TypeScript compilation: No errors

**Blocks**: None
**Files**:
  - `components/ComplexityBar.tsx` (updated with Framer Motion)
  - `components/__tests__/ComplexityBar.test.tsx` (new - 7 tests)
  - `jest.config.js` (new - Jest setup for unit testing)
  - `jest.setup.js` (new - Testing Library setup)

**Notes**:
- Storybook story skipped (Storybook not configured in project)
- Component ready for use in FE-005 (OpportunityCard)

---

### FE-007: Update All Redirects ✅ N/A
**Effort**: Small (30min) | **Priority**: P0 | **Status**: ✅ N/A (already using /waiting-room)

**Notes**:
- All routes already use `/waiting-room/[id]` path
- No war-room references found in codebase
- E2E tests already target correct routes
- No action required

---

## P0 Summary (This Week - 3-5 hours remaining)

| Task | Effort | Status | Completion Date |
|------|--------|--------|-----------------|
| FE-006 | 1h | ✅ DONE | 2025-10-28 |
| FE-002 | 3-4h | ✅ DONE | Already implemented |
| FE-003 | 2h | ✅ DONE | Already implemented |
| FE-007 | 30min | ✅ N/A | Already using /waiting-room |
| FE-005 | 1-2h | Not Started | **NEXT PRIORITY** |
| FE-004 | 2-3h | BLOCKED | Waiting for BE-003 |

**Progress**: 4/6 tasks complete (67%)

**Execution Order**:
1. ✅ FE-006 - **COMPLETE** - ComplexityBar component
2. ✅ FE-002 - **COMPLETE** - Waiting Room route (already implemented)
3. ✅ FE-003 - **COMPLETE** - ProgressiveMessage (already implemented)
4. ✅ FE-007 - **N/A** - Routes already correct
5. FE-005 - **NEXT PRIORITY** - OpportunityCard (can use ComplexityBar)
6. FE-004 - **BLOCKED** - Valorization (waiting for BE-003)

---

## P1 Tasks (Important - Next Week)

### FE-008: Enhance Lead Form
**Effort**: Small (1-2h) | **Priority**: P1

**Implementation**:
- Add urgency badge: "⏰ Limited spots - Act now"
- Add social proof: "Join 200+ businesses"
- Add trust signals: SSL badge, privacy link

**Success Criteria**: Conversion rate increase from 18% → 25%

---

### FE-009: Update E2E Tests
**Effort**: Medium (2h) | **Priority**: P1

**Implementation**:
- Rename war-room.spec.ts → waiting-room.spec.ts
- Update all test assertions for new components
- Add tests for ProgressiveMessage phases
- Validate 69+ tests passing

**Success Criteria**: All tests green

---

## P2 Tasks (Future)

### FE-010: Improve SSE Reconnection UX
**Effort**: Medium (2-3h) | **Priority**: P2
- Better reconnection UI on mobile network changes

### FE-011: Adaptive Typewriter Timing
**Effort**: Small (1h) | **Priority**: P2
- Detect device performance, adjust 20ms → 50ms on low-end phones

---

## Success Metrics

**Phase 2 Completion**: 67% → 100% by Friday Week 44

- ✅ Waiting Room operational (FE-002, FE-003) - **COMPLETE**
- ⏳ Valorization functional (FE-004, ✅ FE-005, ✅ FE-006) - Waiting for FE-005
- ✅ All redirects updated (FE-007) - **N/A** (already correct)
- ⏳ E2E tests passing (FE-009) - Next week

**Progress**:
- ✅ FE-006 Complete (ComplexityBar) - 1h
- ✅ FE-002 Complete (Waiting Room) - Already implemented
- ✅ FE-003 Complete (ProgressiveMessage) - Already implemented
- ✅ FE-007 N/A (Routes already correct)
- Remaining: FE-005 (1-2h), FE-004 BLOCKED (2-3h)

**Last Updated**: 2025-10-28 | **Total Outstanding**: 3-5 hours (1 day if unblocked)
