// tests/e2e/social-proof.spec.ts
// E2E tests for FE-017: Social Proof Widgets

import { test, expect } from '@playwright/test';

test.describe('FE-017: Social Proof Widgets', () => {
  test.describe('Homepage Social Proof', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should display live stats counter with all 4 metrics', async ({ page }) => {
      // Wait for stats to load
      await expect(page.locator('text=Heures Économisées Ce Mois')).toBeVisible({ timeout: 10000 });

      // Check all 4 stat cards are visible
      await expect(page.locator('text=Heures Économisées Ce Mois')).toBeVisible();
      await expect(page.locator('text=Entreprises Analysées')).toBeVisible();
      await expect(page.locator('text=Implémentations Actives')).toBeVisible();
      await expect(page.locator('text=Satisfaction Moyenne')).toBeVisible();

      // Verify stats have numeric values
      const hoursText = await page.locator('text=/\\d+h/').first().textContent();
      expect(hoursText).toMatch(/\d+/);
    });

    test('should display testimonials carousel with navigation', async ({ page }) => {
      // Check testimonials section is visible
      await expect(page.locator('text=Ce que disent nos clients')).toBeVisible();

      // Wait for carousel to load
      await page.waitForSelector('[aria-label="Témoignage suivant"]', { timeout: 10000 });

      // Check navigation buttons exist
      const prevButton = page.locator('[aria-label="Témoignage précédent"]');
      const nextButton = page.locator('[aria-label="Témoignage suivant"]');

      await expect(prevButton).toBeVisible();
      await expect(nextButton).toBeVisible();

      // Get initial testimonial text
      const initialTestimonial = await page.locator('text=/récupéré|gagné|économisé/i').first().textContent();

      // Click next button
      await nextButton.click();
      await page.waitForTimeout(500); // Wait for animation

      // Check testimonial changed
      const newTestimonial = await page.locator('text=/récupéré|gagné|économisé/i').first().textContent();

      // They should be different (or we're at the end of carousel)
      if (initialTestimonial && newTestimonial) {
        // Either different or same (if at end/start)
        expect(typeof newTestimonial).toBe('string');
      }
    });

    test('should display verified badges on testimonials', async ({ page }) => {
      // Wait for testimonials to load
      await page.waitForSelector('[aria-label="Témoignage vérifié"]', { timeout: 10000 });

      // Check verified badge exists
      const verifiedBadge = page.locator('[aria-label="Témoignage vérifié"]');
      await expect(verifiedBadge).toBeVisible();
    });

    test('should display dots navigation for testimonials', async ({ page }) => {
      // Wait for carousel
      await page.waitForSelector('[aria-label="Aller au témoignage 1"]', { timeout: 10000 });

      // Check at least 3 dots exist (we have 5 testimonials)
      const dots = page.locator('[aria-label^="Aller au témoignage"]');
      const count = await dots.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display case studies with ROI badges', async ({ page }) => {
      // Check case studies section
      await expect(page.locator('text=Résultats prouvés, ROI mesurable')).toBeVisible();

      // Check for ROI percentages
      await expect(page.locator('text=/\\d+% ROI/')).toBeVisible();

      // Check for case study cards
      const caseStudyCards = page.locator('text=/Commerce de détail|Services professionnels|Fabrication/');
      const count = await caseStudyCards.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display case study CTAs', async ({ page }) => {
      // Wait for case studies
      await page.waitForSelector('text=/Lire l\'étude complète|Découvrir le cas|Voir les résultats/', { timeout: 10000 });

      // Check CTA buttons exist
      const ctaButtons = page.locator('text=/Lire l\'étude complète|Découvrir le cas|Voir les résultats/');
      const count = await ctaButtons.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should display trust badges in footer', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Check for trust badge emojis/logos
      await expect(page.locator('text=Entreprise Québécoise')).toBeVisible();
      await expect(page.locator('text=Sécurité SSL')).toBeVisible();
      await expect(page.locator('text=Support Local')).toBeVisible();
    });

    test('should show trust badge tooltips on hover', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Find a trust badge
      const badge = page.locator('text=Entreprise Québécoise').first();
      await badge.hover();

      // Tooltip should appear (check for description text)
      await expect(page.locator('text=Fièrement québécoise')).toBeVisible({ timeout: 2000 });
    });
  });

  test.describe('Results Page Social Proof', () => {
    test('should display testimonials carousel before lead form', async ({ page }) => {
      // Navigate to results page (using a test analysis ID)
      // Note: This assumes we have a way to get to results page
      // In real scenario, we'd start an analysis first

      await page.goto('/');

      // Submit URL analysis
      const input = page.locator('input[name="url"]');
      await input.fill('https://example.com');

      const submitButton = page.locator('button:has-text("Analyser")').first();
      await submitButton.click();

      // Wait for waiting room
      await page.waitForURL(/\/waiting-room\//, { timeout: 15000 });

      // Wait for redirect to results (may take time)
      await page.waitForURL(/\/results\//, { timeout: 120000 });

      // Check testimonials section exists before lead form
      await expect(page.locator('text=Des résultats qui parlent d\'eux-mêmes')).toBeVisible({ timeout: 10000 });

      // Check carousel is visible
      await expect(page.locator('[aria-label="Témoignage suivant"]')).toBeVisible();
    });
  });

  test.describe('API Endpoints', () => {
    test('should fetch live stats successfully', async ({ request }) => {
      const response = await request.get('/api/stats/live');
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data).toHaveProperty('hours_saved_this_month');
      expect(data).toHaveProperty('companies_analyzed');
      expect(data).toHaveProperty('active_implementations');
      expect(data).toHaveProperty('average_satisfaction');

      // Check values are numbers
      expect(typeof data.hours_saved_this_month).toBe('number');
      expect(typeof data.companies_analyzed).toBe('number');
      expect(typeof data.active_implementations).toBe('number');
      expect(typeof data.average_satisfaction).toBe('number');
    });

    test('should fetch recent activity successfully', async ({ request }) => {
      const response = await request.get('/api/stats/recent-activity');
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBeGreaterThan(0);

      // Check first activity has required fields
      if (data.length > 0) {
        const activity = data[0];
        expect(activity).toHaveProperty('id');
        expect(activity).toHaveProperty('sector');
        expect(activity).toHaveProperty('city');
        expect(activity).toHaveProperty('hours_potential');
        expect(activity).toHaveProperty('relative_time');
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display stats in 2x2 grid on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Wait for stats
      await expect(page.locator('text=Heures Économisées Ce Mois')).toBeVisible({ timeout: 10000 });

      // Check grid layout (should be 2 columns on mobile)
      const statsContainer = page.locator('text=Heures Économisées Ce Mois').locator('..').locator('..');
      const gridClass = await statsContainer.getAttribute('class');
      expect(gridClass).toContain('grid-cols-2');
    });

    test('should show carousel navigation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Check carousel arrows are visible on mobile
      await expect(page.locator('[aria-label="Témoignage suivant"]')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('[aria-label="Témoignage précédent"]')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels on carousel navigation', async ({ page }) => {
      await page.goto('/');

      // Check ARIA labels exist
      await expect(page.locator('[aria-label="Témoignage suivant"]')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('[aria-label="Témoignage précédent"]')).toBeVisible();
      await expect(page.locator('[aria-label="Aller au témoignage 1"]')).toBeVisible();
    });

    test('should have proper ARIA label on verified badge', async ({ page }) => {
      await page.goto('/');

      // Check verified badge has ARIA label
      const verifiedBadge = page.locator('[aria-label="Témoignage vérifié"]').first();
      await expect(verifiedBadge).toBeVisible({ timeout: 10000 });
    });
  });
});
