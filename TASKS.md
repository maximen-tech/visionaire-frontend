# Visionaire Frontend - Task Backlog

## P0 Tasks (Critical - This Week)

### FE-002: Create Waiting Room Route
**Effort**: Medium (3-4h) | **Priority**: P0 | **Status**: Not Started

**Problem**: Current "War Room" needs transformation to "Waiting Room" with dual-view layout and progressive storytelling.

**Implementation**:
1. Create `/app/waiting-room/[id]/page.tsx` (2h)
2. Implement dual-view layout: 35% logs (left) + 65% message (right) (1h)
3. Integrate SSE connection with `useSSE` hook (30min)
4. Add responsive mobile layout (stacked views) (30min)

**Success Criteria**:
- Dual-view layout functional on desktop
- SSE connection established and receiving events
- Progress bar synced with backend events
- Mobile responsive (stacked views)

**Blocks**: None
**Files**: `app/waiting-room/[id]/page.tsx` (new), `hooks/useSSE.ts` (existing)

---

### FE-003: Build ProgressiveMessage Component
**Effort**: Medium (2h) | **Priority**: P0 | **Status**: Not Started

**Problem**: Need immersive storytelling experience during 35-second analysis wait time.

**Implementation**:
1. Create component with 5 phase logic (1h):
   - Phase 1 (0-20%): Bienvenue
   - Phase 2 (20-45%): Découverte
   - Phase 3 (45-75%): Analyse
   - Phase 4 (75-95%): Révélation
   - Phase 5 (95-100%): Invitation
2. Implement typewriter effect (20ms/char) (30min)
3. Add 3-second pause before redirect button (30min)

**Success Criteria**:
- Message completes BEFORE redirect button appears
- Typewriter smooth at 20ms/char
- Dynamic content insertion (name, company, hours)
- Phase transitions smooth (no cuts)

**Blocks**: None
**Files**: `components/ProgressiveMessage.tsx` (new)

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

### FE-006: Create ComplexityBar Component
**Effort**: Small (1h) | **Priority**: P0 | **Status**: Not Started

**Implementation**:
1. Create visual bar (10 segments) (30min)
2. Fill bars based on complexity level (1-10) (15min)
3. Add Tailwind styling (15min)

**Success Criteria**:
- Visual representation clear (filled vs unfilled bars)
- Responsive on all screen sizes

**Blocks**: None
**Files**: `components/ComplexityBar.tsx` (new)

---

### FE-007: Update All Redirects
**Effort**: Small (30min) | **Priority**: P0 | **Status**: Not Started

**Implementation**:
1. Update homepage redirect: /war-room/[id] → /waiting-room/[id] (10min)
2. Update all internal links (10min)
3. Update E2E test expectations (10min)

**Success Criteria**:
- All redirects point to /waiting-room/[id]
- No broken links

**Blocks**: None
**Files**: `app/page.tsx`, tests

---

## P0 Summary (This Week - 10-13 hours total)

| Task | Effort | Blocks | Critical Path |
|------|--------|--------|---------------|
| FE-002 | 3-4h | None | Day 1 |
| FE-003 | 2h | None | Day 1-2 |
| FE-006 | 1h | None | Day 2 |
| FE-007 | 30min | None | Day 2 |
| FE-005 | 1-2h | None | Day 2-3 |
| FE-004 | 2-3h | BE-003 | Day 3 (wait for backend) |

**Execution Order**:
1. FE-002 (Day 1) - Unblock waiting room development
2. FE-003 (Day 1-2) - Parallel with FE-002
3. FE-006 (Day 2) - Needed for FE-005
4. FE-007 (Day 2) - Quick redirect updates
5. FE-005 (Day 2-3) - Integrate ComplexityBar
6. FE-004 (Day 3) - Wait for BE-003, then implement

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

**Phase 2 Completion**: 0% → 100% by Friday Week 44

- ✅ Waiting Room operational (FE-002, FE-003)
- ✅ Valorization functional (FE-004, FE-005, FE-006)
- ✅ All redirects updated (FE-007)
- ✅ E2E tests passing (FE-009)

**Last Updated**: 2025-10-27 | **Total Outstanding**: 23 hours (~3 days)
