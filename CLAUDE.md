# PROJECT CONTEXT: Vision'AI're - Week 2 Implementation Sprint

Mission: Implement secondary pages + SEO + Accessibility + Performance optimization
Phase: Week 2 of 3 (Secondary Pages → Optimization → Deployment)
Status: Week 1 COMPLETE (Homepage + Content). Week 2 ACTIVE (Implementation + Polish).

## 🎯 WEEK 2 OBJECTIVES

<week2_goals>
**Primary Deliverables:**
1. Implement 6 secondary pages (About, FAQ, Pricing, Privacy, Terms, Cookies)
2. SEO optimization (meta tags, structured data, sitemap)
3. Accessibility audit + fixes (WCAG 2.1 AA compliance)
4. Performance optimization (Lighthouse >90 mobile, >95 desktop)
5. Cookie consent implementation (GDPR compliant)
6. Visual enhancements (icons, animations)

**Success Metrics:**
- All pages implemented with generated content (docs/content/)
- Lighthouse scores: Performance >90, Accessibility 100, SEO 100
- Zero accessibility violations (axe-core)
- Bundle size maintained <150 kB First Load JS
- Cookie consent functional and compliant
</week2_goals>

---

## 📝 FREQUENT COMMANDS

### Implementation
```bash
# Development server
npm run dev

# Check existing content
cat docs/content/about.md
cat docs/content/faq.md
cat docs/content/pricing.md

# Create new page
mkdir -p app/about && touch app/about/page.tsx

# Install dependencies
npm install lucide-react          # Professional icons
npm install react-cookie-consent  # GDPR cookie banner
npm install next-seo              # SEO optimization
```

### Testing & Validation
```bash
# Build check
npm run build

# Lighthouse audit (requires dev server running)
npx lighthouse http://localhost:3000 --view
npx lighthouse http://localhost:3000/about --view

# Accessibility audit
npm install -D @axe-core/cli
npx axe http://localhost:3000 --exit

# Bundle analysis
npm run build
npx @next/bundle-analyzer

# Check meta tags
curl -I http://localhost:3000
curl http://localhost:3000 | grep -i "<meta"
```

### SEO
```bash
# Generate sitemap (manual for now)
touch app/sitemap.ts

# Verify robots.txt
cat public/robots.txt

# Check structured data
# Visit: https://search.google.com/test/rich-results
```

---

## 🚨 NON-NEGOTIABLES (Week 2 Specific)

<critical_rules_week2>
**Implementation:**
- Use existing content from docs/content/ (zero copywriting, pure implementation)
- Reuse components from components/ui/ (Button, Card, Badge, Alert, Input)
- Follow homepage structure (Header → Sections → Footer)
- Mobile-first responsive (test 375px, 768px, 1024px)

**SEO (MANDATORY):**
- Every page needs <title> (50-60 chars) + <meta name="description"> (150-160 chars)
- Every page needs Open Graph tags (og:title, og:description, og:image)
- H1 once per page (matches title but not identical)
- Internal linking: Header nav + Footer + contextual links
- Structured data: Organization (all pages), FAQPage (FAQ), WebPage (legal)

**Accessibility (WCAG 2.1 AA):**
- Contrast minimum 4.5:1 (gray-600 on white, gray-900 on white compliant)
- All interactive elements keyboard accessible (Tab, Enter, Space)
- Skip link: "Skip to content" (first focusable element)
- Focus indicators visible: ring-4 ring-blue-500
- Form labels: htmlFor + id association
- Images: alt text (descriptive, not keyword stuffing)
- Headings: hierarchical (no skipping H2→H4)

**Performance:**
- Code splitting: Use dynamic imports for heavy components
- Image optimization: next/image for all images (if added)
- Font optimization: Already using system fonts (Inter)
- Critical CSS inline: Next.js handles automatically
- Lazy loading: Below-the-fold content

**Cookie Consent (GDPR):**
- Banner appears on first visit (not logged in)
- Clear options: Accept All, Reject All, Customize
- Respects user choice (localStorage or cookies)
- Links to Cookie Policy page
- Analytics blocked until consent
</critical_rules_week2>

---

## 🏗️ IMPLEMENTATION WORKFLOW

<workflow_week2>
**Phase 1: Secondary Pages (Priority 1) - 2-3 hours**

1. About Page (app/about/page.tsx)
   - Content: docs/content/about.md
   - Structure: Hero → Mission → Problem → Approach → Values
   - Components: Hero section, 4 value Cards
   - SEO: Title "À Propos | Vision'AI're", Description from content

2. FAQ Page (app/faq/page.tsx)
   - Content: docs/content/faq.md
   - Structure: Hero → 7 Category Sections (accordion UI)
   - Components: Accordion (create new), Badge for categories
   - SEO: Title "FAQ | Vision'AI're", FAQPage structured data

3. Pricing Page (app/pricing/page.tsx)
   - Content: docs/content/pricing.md
   - Structure: Hero → Free/Pro comparison → FAQ
   - Components: Pricing Cards, comparison table, Badge ("Coming Soon")
   - SEO: Title "Tarifs | Vision'AI're", emphasis Free tier

4. Privacy Policy (app/legal/privacy/page.tsx)
   - Content: docs/content/legal/privacy.md
   - Structure: Hero → TL;DR → Full policy (sections)
   - Components: Alert (TL;DR highlight), simple text layout
   - SEO: Title "Politique de Confidentialité | Vision'AI're", noindex

5. Terms of Service (app/legal/terms/page.tsx)
   - Content: docs/content/legal/terms.md
   - Structure: Hero → TL;DR → Full terms (sections)
   - Components: Alert (TL;DR highlight), simple text layout
   - SEO: Title "Conditions d'Utilisation | Vision'AI're", noindex

6. Cookie Policy (app/legal/cookies/page.tsx)
   - Content: docs/content/legal/cookies.md
   - Structure: Hero → What/Why/How → Management
   - Components: Alert (implementation notes), table for cookie types
   - SEO: Title "Politique de Cookies | Vision'AI're", noindex

**Phase 2: SEO Optimization (Priority 2) - 1-2 hours**

7. Global SEO Setup:
   - Create app/layout.tsx metadata (default title, description)
   - Create app/sitemap.ts (dynamic sitemap generation)
   - Create app/robots.txt or public/robots.txt
   - Add Open Graph image (public/og-image.png - 1200x630)

8. Page-Specific SEO:
   - Add metadata export to each page.tsx
   - Structured data for FAQ (JSON-LD)
   - Structured data for Organization (all pages)
   - Canonical URLs for all pages

9. Internal Linking:
   - Update Header navigation (add About, FAQ, Pricing links)
   - Update Footer (add Legal links)
   - Add contextual links (FAQ → Pricing, About → Homepage CTA)

**Phase 3: Accessibility Audit (Priority 3) - 1-2 hours**

10. Automated Audit:
    ```bash
    npm install -D @axe-core/cli
    npx axe http://localhost:3000 --exit
    npx axe http://localhost:3000/about --exit
    npx axe http://localhost:3000/faq --exit
    ```

11. Manual Audit:
    - Keyboard navigation: Tab through all pages (no traps)
    - Screen reader: Test with NVDA (Windows) or VoiceOver (Mac)
    - Color contrast: Verify with WebAIM Contrast Checker
    - Focus indicators: Verify ring-4 visible on all interactive elements

12. Common Fixes:
    - Add aria-label to icon-only buttons
    - Ensure form labels have htmlFor
    - Add skip link to all pages
    - Verify heading hierarchy (H1 → H2 → H3, no skips)

**Phase 4: Performance Optimization (Priority 4) - 1 hour**

13. Lighthouse Audits:
    ```bash
    # Homepage
    npx lighthouse http://localhost:3000 --preset=desktop --view
    npx lighthouse http://localhost:3000 --preset=mobile --view
    
    # Secondary pages
    npx lighthouse http://localhost:3000/about --preset=mobile --view
    npx lighthouse http://localhost:3000/faq --preset=mobile --view
    ```

14. Common Optimizations:
    - Remove unused dependencies (check package.json)
    - Dynamic imports for Accordion component (FAQ page)
    - Lazy load below-the-fold images (if added)
    - Minify CSS (Next.js handles, verify in production build)

15. Bundle Analysis:
    ```bash
    npm run build
    npx @next/bundle-analyzer
    ```
    Target: First Load JS <150 kB per page

**Phase 5: Cookie Consent (Priority 5) - 1 hour**

16. Install & Configure:
    ```bash
    npm install react-cookie-consent
    ```

17. Implement Banner:
    - Create components/CookieBanner.tsx
    - Add to app/layout.tsx (global)
    - Link to /legal/cookies page
    - Options: Accept All, Reject All, Customize (future)

18. Analytics Gating:
    - Block GA4 script until consent
    - Use localStorage to store preference
    - Implement in app/layout.tsx

**Phase 6: Visual Enhancements (Priority 6 - Optional) - 1 hour**

19. Icon System:
    ```bash
    npm install lucide-react
    ```
    - Replace emojis with lucide icons (CheckCircle, XCircle, AlertCircle)
    - Add icons to Features (app/page.tsx)
    - Add icons to How It Works steps

20. Animations (Subtle):
    - Intersection Observer for fade-in on scroll
    - Create lib/hooks/useInView.ts
    - Apply to section headings (optional, Week 3 if time)
</workflow_week2>

---

## 📚 REFERENCE DOCUMENTATION

<references_week2>
**Generated Content (Week 1):**
- @docs/content/about.md - About page content (400 words)
- @docs/content/faq.md - FAQ page content (28 questions, 7 categories)
- @docs/content/pricing.md - Pricing page content (Free/Pro tiers)
- @docs/content/legal/privacy.md - Privacy policy (3,500 words, GDPR)
- @docs/content/legal/terms.md - Terms of service (4,000 words)
- @docs/content/legal/cookies.md - Cookie policy (3,000 words)

**Week 1 Implementation (Reuse These):**
- @components/ui/Button.tsx - Primary, Secondary, Ghost variants
- @components/ui/Card.tsx - Default, Feature, Outlined variants
- @components/ui/Badge.tsx - Default, Success, Warning, Info
- @components/ui/Alert.tsx - Success, Error, Warning, Info
- @components/ui/Input.tsx - Form input with error state
- @app/page.tsx - Homepage structure (reference for layout patterns)

**External Resources:**
- Next.js Metadata API: nextjs.org/docs/app/api-reference/functions/generate-metadata
- Structured Data: schema.org (Organization, FAQPage, WebPage)
- WCAG 2.1 Quick Reference: w3.org/WAI/WCAG21/quickref/
- Lighthouse Scoring: web.dev/performance-scoring/
- Cookie Consent Best Practices: cookiebot.com/en/gdpr-cookies/
</references_week2>

---

## ⚠️ CRITICAL FRICTION POINTS (Week 2)

<friction_points_week2>
**Content Import Pitfalls:**
- ❌ Rewriting content from scratch → ✅ Copy verbatim from docs/content/*.md
- ❌ Changing brand voice → ✅ Use generated content as-is (already compliant)
- ❌ Adding new sections not in content → ✅ Stick to generated structure

**SEO Pitfalls:**
- ❌ Duplicate title tags → ✅ Unique title per page (50-60 chars)
- ❌ Missing meta descriptions → ✅ Every page needs description (150-160 chars)
- ❌ No structured data → ✅ Add JSON-LD for FAQ, Organization
- ❌ Broken internal links → ✅ Test all links after implementation

**Accessibility Pitfalls:**
- ❌ Icon buttons without aria-label → ✅ Add descriptive labels
- ❌ Low contrast text → ✅ Minimum gray-600 (4.5:1 ratio)
- ❌ Keyboard traps in Accordion → ✅ Test Tab, Enter, Space keys
- ❌ Missing skip link → ✅ Add to all pages (first focusable element)

**Performance Pitfalls:**
- ❌ Large bundle on FAQ page → ✅ Dynamic import Accordion component
- ❌ Blocking third-party scripts → ✅ Load analytics after consent
- ❌ Unoptimized fonts → ✅ Already using system fonts (Inter)

**Cookie Consent Pitfalls:**
- ❌ Banner on every page load → ✅ Check localStorage, show once
- ❌ No link to Cookie Policy → ✅ Add prominent link in banner
- ❌ Analytics run before consent → ✅ Gate GA4 script with consent check
</friction_points_week2>

---

## 🎯 SUCCESS CRITERIA (Week 2)

<success_metrics_week2>
**Implementation:**
- ✅ 6 pages implemented (About, FAQ, Pricing, Privacy, Terms, Cookies)
- ✅ All content from docs/content/ used verbatim
- ✅ Navigation updated (Header: About, FAQ, Pricing | Footer: Legal links)
- ✅ Mobile responsive (test 375px, 768px, 1024px)

**SEO:**
- ✅ Every page has unique <title> and <meta name="description">
- ✅ Open Graph tags on all pages
- ✅ Sitemap generated (app/sitemap.ts)
- ✅ robots.txt configured
- ✅ Structured data: Organization + FAQPage
- ✅ Lighthouse SEO score: 100

**Accessibility:**
- ✅ axe-core: 0 violations
- ✅ Keyboard navigation functional (no traps)
- ✅ Focus indicators visible (ring-4)
- ✅ Skip link present on all pages
- ✅ Contrast ratio minimum 4.5:1
- ✅ Lighthouse Accessibility score: 100

**Performance:**
- ✅ Lighthouse Performance: >90 mobile, >95 desktop
- ✅ First Load JS: <150 kB per page
- ✅ First Contentful Paint: <1.8s mobile 3G
- ✅ Cumulative Layout Shift: <0.1

**Cookie Consent:**
- ✅ Banner appears on first visit
- ✅ User choice persisted (localStorage)
- ✅ Analytics gated by consent
- ✅ Link to Cookie Policy in banner
</success_metrics_week2>

---

## 📊 WEEK 2 PRIORITIES

<priorities_week2>
**HIGH PRIORITY (Must Complete):**
1. ✅ Implement About page
2. ✅ Implement FAQ page (most complex - Accordion UI)
3. ✅ Implement Pricing page
4. ✅ Add SEO meta tags to ALL pages
5. ✅ Run accessibility audit + fix violations
6. ✅ Run Lighthouse audits (target >90 mobile)

**MEDIUM PRIORITY (Should Complete):**
7. ✅ Implement Privacy Policy page
8. ✅ Implement Terms of Service page
9. ✅ Implement Cookie Policy page
10. ✅ Add Cookie Consent banner
11. ✅ Generate sitemap
12. ✅ Add structured data (FAQPage)

**LOW PRIORITY (Nice to Have):**
13. 🟡 Replace emojis with lucide-react icons
14. 🟡 Add subtle entrance animations
15. 🟡 Optimize bundle size further
16. 🟡 Add Open Graph image (og-image.png)
</priorities_week2>

---

## 🔄 TESTING PROTOCOL (Week 2)

<testing_protocol_week2>
**After Each Page Implementation:**
```bash
# 1. Build check
npm run build

# 2. Visual check
npm run dev
# Open http://localhost:3000/[page]

# 3. Mobile responsive check
# DevTools → Toggle device toolbar → Test iPhone SE (375px)

# 4. Keyboard navigation check
# Tab through page, verify focus indicators
```

**After All Pages Complete:**
```bash
# 1. Accessibility audit
npx axe http://localhost:3000 --exit
npx axe http://localhost:3000/about --exit
npx axe http://localhost:3000/faq --exit
npx axe http://localhost:3000/pricing --exit

# 2. Lighthouse audits (all pages)
npx lighthouse http://localhost:3000 --preset=mobile --view
npx lighthouse http://localhost:3000/about --preset=mobile --view
npx lighthouse http://localhost:3000/faq --preset=mobile --view

# 3. SEO check
curl http://localhost:3000 | grep -i "<title"
curl http://localhost:3000/about | grep -i "<meta name=\"description\""

# 4. Bundle analysis
npx @next/bundle-analyzer
```

**Manual Testing Checklist:**
- [ ] All pages render correctly (no layout breaks)
- [ ] All internal links work (nav, footer, contextual)
- [ ] All external links open in new tab (target="_blank")
- [ ] Forms work (if any on new pages)
- [ ] Cookie banner appears on first visit
- [ ] Cookie banner respects user choice
- [ ] Analytics blocked without consent
- [ ] Mobile: No horizontal scroll, tap targets >44px
- [ ] Keyboard: Can navigate entire site with Tab/Enter
- [ ] Screen reader: Page structure makes sense (test with NVDA/VoiceOver)
</testing_protocol_week2>

---

## 📝 COMMIT STRATEGY (Week 2)

<commit_strategy>
**Branching:**
```bash
# Continue on feature/marketing-content-week1 OR create new branch
git checkout -b feature/week2-secondary-pages
```

**Commit Messages (Conventional Commits):**
```bash
# After each page
git add app/about/page.tsx docs/
git commit -m "feat(about): implement About page with generated content"

git add app/faq/page.tsx components/ui/Accordion.tsx
git commit -m "feat(faq): implement FAQ page with accordion UI (28 questions)"

# After SEO work
git add app/layout.tsx app/sitemap.ts
git commit -m "feat(seo): add meta tags, structured data, and sitemap"

# After accessibility fixes
git add app/ components/
git commit -m "fix(a11y): add skip links, aria-labels, improve contrast"

# After performance optimization
git commit -m "perf: optimize bundle size and lazy load components"

# After cookie consent
git add components/CookieBanner.tsx app/layout.tsx
git commit -m "feat(gdpr): implement cookie consent banner"
```

**Final PR:**
```bash
git push -u origin feature/week2-secondary-pages
gh pr create --title "feat: Week 2 - Secondary Pages + SEO + Accessibility" \
  --body "Implements 6 secondary pages, SEO optimization, accessibility compliance, and cookie consent.

## Deliverables
- 6 pages: About, FAQ, Pricing, Privacy, Terms, Cookies
- SEO: Meta tags, structured data, sitemap
- Accessibility: WCAG 2.1 AA compliant, axe-core 0 violations
- Performance: Lighthouse >90 mobile, >95 desktop
- Cookie consent: GDPR compliant banner

## Testing
- ✅ Build passes
- ✅ Lighthouse audits pass targets
- ✅ Accessibility audit passes
- ✅ Mobile responsive verified
- ✅ Keyboard navigation functional

Closes #[issue-number]"
```
</commit_strategy>

---

## 🎯 OUTPUT PROTOCOL (Week 2)

<output_protocol_week2>
**After Each Phase:**
1. **Summarize** what was created/modified
2. **Show metrics**: Lighthouse scores, bundle size, accessibility violations
3. **Highlight decisions**: Trade-offs, technical choices
4. **Request approval** before proceeding to next phase

**Intermediate Checkpoints:**
- After Phase 1 (Pages): "6 pages implemented. Review content before SEO?"
- After Phase 2 (SEO): "Meta tags added. Sitemap generated. Proceed to accessibility?"
- After Phase 3 (A11y): "0 violations found. Run Lighthouse audits?"
- After Phase 4 (Perf): "Scores achieved. Implement cookie consent?"

**Final Deliverable:**
- Complete summary with Lighthouse scores (all pages)
- Accessibility audit results (axe-core output)
- Bundle size comparison (Week 1 vs Week 2)
- Git commands to review changes
- PR description (ready to copy-paste)
- Week 3 preparation (deployment checklist)
</output_protocol_week2>

---

END OF CLAUDE.md
Version: 2.0 - Week 2 Implementation Sprint
Last Updated: 2025-10-26
Previous: Week 1 - Content Generation + Homepage (COMPLETE)
Current: Week 2 - Secondary Pages + Optimization (ACTIVE)
Next: Week 3 - Deployment + Monitoring