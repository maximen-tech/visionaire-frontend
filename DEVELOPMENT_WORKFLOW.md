# Development Workflow - Vision'AI're Frontend

**Version**: 1.0 | **Last Updated**: 2025-10-28

---

## 1. Process Desktop ’ Code (Recevoir Specs)

### Workflow
1. Desktop crée spec dans `.claude/specs/feature-name.md`
2. Desktop update TASKS.md avec nouvelle tâche
3. Desktop update STATE.md (section "Actions Requises")
4. Code lit spec ’ pose questions si unclear
5. Code implémente ’ update TASKS.md status

### Spec Template
```markdown
# SPEC: [Feature Name]
Objectif: [What to build]
Requirements: [List]
UI/UX Changes: [Components, routes]
Success Criteria: [Checklist]
Priority: P0/P1/P2 | Effort: S/M/L/XL
```

---

## 2. Process Code ’ Desktop (Reporter Changements)

### Workflow
1. Code termine feature
2. Code update STATE.md + TASKS.md
3. Code crée report dans `.claude/reports/feature-name.md`
4. Desktop review ’ feedback ou approve

### Report Template
```markdown
# REPORT: [Feature Name]
Status: DONE/BLOCKED/IN_PROGRESS
What Was Done: [List]
Files Changed: [Components, pages]
Tests: E2E passing, Visual regression updated
Deployment: Vercel preview URL
Next Steps: [If applicable]
```

---

## 3. Conventions Git

### Branches
- `main`: Production (protected)
- `feature/name`: New features
- `fix/name`: Bug fixes
- `docs/name`: Documentation

### Commit Messages (Conventional Commits)
```
<type>(<scope>): <subject>

feat(waiting-room): add progressive message component
fix(results): correct currency formatting
docs(readme): update deployment instructions
style(ui): adjust mobile responsive layout
```

**Types**: feat, fix, docs, style, refactor, test, chore

---

## 4. Checklist Pré-Commit

### Automated (Git Hook)
- ESLint (`npm run lint`)
- TypeScript check (`tsc --noEmit`)
- Format check (Prettier, if configured)

### Manual
- [ ] Build successful (`npm run build`)
- [ ] E2E tests passing (`npm run test:e2e`)
- [ ] Mobile responsive tested
- [ ] Dark mode tested (if applicable)
- [ ] README updated (if applicable)
- [ ] STATE.md updated
- [ ] TASKS.md updated
- [ ] No console errors in dev tools
- [ ] No TypeScript errors

---

## 5. Code Quality Standards

### TypeScript Style
- **Strict mode**: Enabled
- **Type safety**: No `any` types (use `unknown` if needed)
- **Naming**: Components PascalCase, functions camelCase
- **Imports**: Absolute paths (`@/components/...`)

### Example
```typescript
// components/ProgressiveMessage.tsx
import { useState, useEffect } from 'react';

interface ProgressiveMessageProps {
  phase: number;
  progress: number;
  onComplete: () => void;
}

export default function ProgressiveMessage({
  phase,
  progress,
  onComplete,
}: ProgressiveMessageProps) {
  const [displayedText, setDisplayedText] = useState('');

  // Implementation
  return <div>{displayedText}</div>;
}
```

---

## 6. Component Guidelines

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { SomeType } from '@/lib/types';

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export default function Component({ props }: ComponentProps) {
  // 4. State
  const [state, setState] = useState();

  // 5. Effects
  useEffect(() => {
    // ...
  }, []);

  // 6. Handlers
  const handleClick = () => {
    // ...
  };

  // 7. Render
  return <div>...</div>;
}
```

### Component Best Practices
- **Single responsibility**: One component = one purpose
- **Props interface**: Always define prop types
- **Memoization**: Use `useMemo`, `useCallback` for expensive operations
- **Accessibility**: ARIA labels, keyboard nav
- **Error boundaries**: Wrap components that may fail

---

## 7. Testing Strategy

### E2E Testing (Playwright)

**Commands**:
```bash
npm run test:e2e                # Run all tests (headless)
npm run test:e2e:ui             # Interactive UI mode
npm run test:e2e:headed         # Visible browser
npm run test:e2e:debug          # Debug mode
npm run test:e2e:report         # View HTML report
```

**Writing Tests**:
```typescript
// tests/e2e/feature.spec.ts
import { test, expect } from '@playwright/test';

test('should complete waiting room flow', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="url-input"]', 'https://example.com');
  await page.click('[data-testid="submit-button"]');

  // Wait for redirect
  await expect(page).toHaveURL(/\/waiting-room\/.+/);

  // Verify progressive message appears
  await expect(page.locator('[data-testid="progressive-message"]')).toBeVisible();
});
```

**Test Data Attributes**:
- Use `data-testid="component-name"` for test selectors
- Avoid relying on CSS classes or IDs (they change)

---

## 8. Deployment Process

### Flow
1. **Local**: Test locally ’ commit ’ push
2. **CI**: GitHub Actions runs tests + build
3. **Preview**: Vercel auto-deploys preview (PR)
4. **Production**: Merge to `main` ’ Vercel auto-deploys
5. **Verify**: Check production URL + Sentry

### Vercel Preview
- Every PR gets preview deployment
- URL: `visionaire-frontend-[pr-hash].vercel.app`
- Test before merge

### Rollback
- Vercel Dashboard ’ Deployments ’ Previous ’ Promote

---

## 9. Responsive Design

### Breakpoints (Tailwind)
```typescript
// tailwind.config.ts
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Testing
- Use browser dev tools (responsive mode)
- Test on: iPhone SE, iPhone 12, iPad, Desktop (1920px)
- Verify: Touch targets e 44x44px
- Check: Text readable, no horizontal scroll

---

## 10. Accessibility (A11y)

### WCAG 2.1 Level AA

**Requirements**:
- Color contrast e 4.5:1 (text)
- Keyboard navigation (Tab, Enter, Space, Esc)
- Screen reader compatible (ARIA labels)
- Focus indicators visible
- Form labels associated with inputs

**Testing**:
```bash
# Automated audit
npm run test:e2e  # Includes a11y tests

# Manual audit
npx @axe-core/cli http://localhost:3000
```

---

## 11. Performance Optimization

### Best Practices
- **Images**: Use `next/image` (automatic optimization)
- **Fonts**: Use `next/font` (self-hosted, no external requests)
- **Code splitting**: Automatic per-route (Next.js)
- **Lazy loading**: `React.lazy()` for heavy components
- **Memoization**: `useMemo`, `React.memo` for expensive renders

### Metrics (Core Web Vitals)
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Testing
```bash
# Lighthouse audit (Chrome DevTools)
# Run on production URL
```

---

## 12. Phase 2 Specifics

### Critical UX Rules
1. **Waiting Room Message**: Must complete BEFORE redirect
2. **Typewriter Speed**: 20ms/char (adjustable prop)
3. **Pause After Complete**: 3 seconds, then show button
4. **Valorisation Input**: Required to show $ values
5. **Currency Format**: "1 200 $ CAD" (espace avant $)

### Implementation Checklist
- [ ] ProgressiveMessage component (5 phases)
- [ ] Typewriter effect functional
- [ ] OpportunityCard component (hours + $)
- [ ] ComplexityBar component (1-10 visual)
- [ ] Hourly rate input (Results page)
- [ ] Dynamic $ calculation
- [ ] Currency formatter utility
- [ ] Mobile responsive (dual view ’ stacked)
- [ ] All E2E tests updated
- [ ] Visual regression snapshots updated

---

## 13. Troubleshooting

### Build Errors
1. `npm run build` to reproduce
2. Check TypeScript errors (`tsc --noEmit`)
3. Check ESLint errors (`npm run lint`)
4. Clear `.next` cache: `rm -rf .next`
5. Reinstall deps: `rm -rf node_modules && npm install`

### E2E Tests Failing
1. Check dev server running (`npm run dev`)
2. View detailed report (`npm run test:e2e:report`)
3. Debug specific test (`npm run test:e2e:debug`)
4. Update selectors if UI changed
5. Re-capture snapshots if visual changes

### SSE Connection Issues
1. Check backend API URL (`.env.local`)
2. Check CORS configuration (backend)
3. Check EventSource connection (browser console)
4. Test with curl: `curl -N [API_URL]/stream`

---

## 14. Security Guidelines

### Client-Side Security
- **HTML Sanitization**: Use `isomorphic-dompurify`
- **HTTPS Only**: Enforce in production
- **CSP Headers**: Set via `middleware.ts`
- **XSS Prevention**: Never use `dangerouslySetInnerHTML` without sanitization

### GDPR Compliance
- Cookie consent banner (react-cookie-consent)
- Analytics opt-out option
- Privacy policy page

---

## 15. Communication

### Daily (Async)
- Update STATE.md (status, progress)
- Check TASKS.md (priorities)
- Report blockers immediately

### Weekly (Review)
- Review completed tasks (DONE section)
- Refine backlog (TASKS.md)
- Plan next sprint (P0 ’ P1)

### When to Ask Desktop
- Unclear UX requirements
- Design decisions (layout, colors, interactions)
- Priority conflicts
- Content copy (text, labels)

---

## Resources

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Playwright**: https://playwright.dev/
- **Vercel**: https://vercel.com/docs

---

**Maintained by**: Claude Code + Claude Desktop
