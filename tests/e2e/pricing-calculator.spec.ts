// tests/e2e/pricing-calculator.spec.ts
// E2E tests for FE-020: Pricing Calculator Widget

import { test, expect } from '@playwright/test';

test.describe('FE-020: Pricing Calculator Widget', () => {
  test.describe('ROI Calculator Component', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should display ROI calculator with default values', async ({ page }) => {
      // Check calculator title is visible
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Check sliders are visible
      await expect(page.locator('text=/Votre taux horaire/')).toBeVisible();
      await expect(page.locator('text=/Heures économisées/')).toBeVisible();

      // Check result cards are visible
      await expect(page.locator('text=Économies Annuelles')).toBeVisible();
      await expect(page.locator('text=/Coût d\'Implémentation/')).toBeVisible();
      await expect(page.locator('text=ROI')).toBeVisible();
      await expect(page.locator('text=Seuil de Rentabilité')).toBeVisible();
    });

    test('should update calculations when hourly rate slider changes', async ({ page }) => {
      await page.goto('/');

      // Wait for calculator to load
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Get initial annual savings value
      const initialSavings = await page.locator('text=Économies Annuelles').locator('..').locator('text=/\\d+/').first().textContent();

      // Move hourly rate slider
      const hourlyRateSlider = page.locator('input[type="range"]').first();
      await hourlyRateSlider.fill('100'); // Set to $100/h
      await page.waitForTimeout(500); // Wait for calculation

      // Get new annual savings value
      const newSavings = await page.locator('text=Économies Annuelles').locator('..').locator('text=/\\d+/').first().textContent();

      // Values should be different
      expect(initialSavings).not.toBe(newSavings);
    });

    test('should update calculations when hours per week slider changes', async ({ page }) => {
      await page.goto('/');

      // Wait for calculator to load
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Get initial break-even value
      const initialBreakEven = await page.locator('text=Seuil de Rentabilité').locator('..').locator('div').filter({ hasText: /semaine|mois/ }).first().textContent();

      // Move hours per week slider
      const hoursSlider = page.locator('input[type="range"]').nth(1);
      await hoursSlider.fill('20'); // Set to 20h/week
      await page.waitForTimeout(500); // Wait for calculation

      // Get new break-even value
      const newBreakEven = await page.locator('text=Seuil de Rentabilité').locator('..').locator('div').filter({ hasText: /semaine|mois/ }).first().textContent();

      // Values should be different
      expect(initialBreakEven).not.toBe(newBreakEven);
    });

    test('should display ROI rating message', async ({ page }) => {
      await page.goto('/');

      // Wait for calculator to load
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Check for ROI message (should have one of the rating messages)
      const ratingMessage = page.locator('text=/ROI exceptionnel|Excellent ROI|Bon ROI|ROI acceptable|ROI faible/');
      await expect(ratingMessage).toBeVisible({ timeout: 5000 });
    });

    test('should show confetti when ROI exceeds 500%', async ({ page }) => {
      await page.goto('/');

      // Wait for calculator to load
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Set high values to trigger >500% ROI
      const hourlyRateSlider = page.locator('input[type="range"]').first();
      const hoursSlider = page.locator('input[type="range"]').nth(1);

      await hourlyRateSlider.fill('200'); // High hourly rate
      await hoursSlider.fill('30'); // Many hours saved
      await page.waitForTimeout(1000);

      // Check for exceptional ROI message
      await expect(page.locator('text=/ROI exceptionnel/')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Comparison Matrix Component', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should display comparison matrix with DIY and Expert columns', async ({ page }) => {
      // Scroll to comparison matrix
      await page.evaluate(() => {
        const element = document.querySelector('text=DIY vs Expert');
        if (element) element.scrollIntoView();
      });

      // Check table headers
      await expect(page.locator('text=DIY (Gratuit)')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=/Expert \\(Avec Vision/')).toBeVisible();

      // Check "Recommandé" badge
      await expect(page.locator('text=Recommandé')).toBeVisible();
    });

    test('should display all 8 comparison criteria', async ({ page }) => {
      await page.goto('/');

      // Check for key criteria
      await expect(page.locator('text=/Temps d\'implémentation/')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=Connaissances techniques')).toBeVisible();
      await expect(page.locator('text=/Sélection d\'outils/')).toBeVisible();
      await expect(page.locator('text=/Support d\'intégration/')).toBeVisible();
      await expect(page.locator('text=Maintenance')).toBeVisible();
      await expect(page.locator('text=Coût initial')).toBeVisible();
      await expect(page.locator('text=Taux de réussite')).toBeVisible();
      await expect(page.locator('text=Support continu')).toBeVisible();
    });

    test('should show tooltips on hover', async ({ page }) => {
      await page.goto('/');

      // Wait for comparison matrix
      await page.waitForSelector('text=Connaissances techniques', { timeout: 10000 });

      // Find a row with tooltip indicator
      const criteriaWithTooltip = page.locator('text=Connaissances techniques');
      await criteriaWithTooltip.hover();

      // Tooltip should appear
      await expect(page.locator('text=/Niveau de compétence/')).toBeVisible({ timeout: 2000 });
    });

    test('should display CTA buttons', async ({ page }) => {
      await page.goto('/');

      // Check both CTA buttons exist
      await expect(page.locator('text=/Commencer en DIY/')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=/Réserver une Consultation Expert/')).toBeVisible();
    });
  });

  test.describe('Payment Plans Component', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should display all 4 pricing plans', async ({ page }) => {
      // Scroll to payment plans
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));

      // Check all 4 plan names
      await expect(page.locator('text=DIY (Gratuit)').first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=Starter').first()).toBeVisible();
      await expect(page.locator('text=Expert').first()).toBeVisible();
      await expect(page.locator('text=Enterprise').first()).toBeVisible();
    });

    test('should display "Plus Populaire" badge on popular plan', async ({ page }) => {
      await page.goto('/');

      // Wait for plans to load and check for popular badge
      await expect(page.locator('text=Plus Populaire')).toBeVisible({ timeout: 10000 });
    });

    test('should display prices for each plan', async ({ page }) => {
      await page.goto('/');

      // Check pricing is visible
      await expect(page.locator('text=/0 \\$/')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=/499 \\$/')).toBeVisible();
      await expect(page.locator('text=/1 499 \\$/')).toBeVisible();
      await expect(page.locator('text=Sur mesure')).toBeVisible();
    });

    test('should display feature lists for each plan', async ({ page }) => {
      await page.goto('/');

      // Check for checkmarks (features)
      const checkmarks = page.locator('svg[class*="lucide-check"]');
      const count = await checkmarks.count();

      // Should have many features across 4 plans
      expect(count).toBeGreaterThanOrEqual(10);
    });

    test('should display CTA buttons for each plan', async ({ page }) => {
      await page.goto('/');

      // Check CTAs exist
      await expect(page.locator('text=Commencer Gratuitement')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=Réserver Consultation')).toBeVisible();
      await expect(page.locator('text=/Obtenir l\'Expert/')).toBeVisible();
      await expect(page.locator('text=/Contacter l\'Équipe/')).toBeVisible();
    });
  });

  test.describe('Results Page Integration', () => {
    test('should display pricing widget on results page with pre-filled data', async ({ page }) => {
      // Navigate to homepage and submit analysis
      await page.goto('/');

      const input = page.locator('input[name="url"]');
      await input.fill('https://example.com');

      const submitButton = page.locator('button:has-text("Analyser")').first();
      await submitButton.click();

      // Wait for waiting room
      await page.waitForURL(/\/waiting-room\//, { timeout: 15000 });

      // Wait for redirect to results
      await page.waitForURL(/\/results\//, { timeout: 120000 });

      // Scroll to pricing widget
      await page.evaluate(() => {
        const element = document.querySelector('text=Calculateur de ROI');
        if (element) element.scrollIntoView();
      });

      // Check pricing widget is visible
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Check that sliders are pre-filled (not at default min values)
      const hourlyRateValue = await page.locator('input[type="range"]').first().inputValue();
      expect(Number(hourlyRateValue)).toBeGreaterThanOrEqual(20);
    });
  });

  test.describe('Responsive Design', () => {
    test('should display calculator in single column on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Wait for calculator
      await expect(page.locator('text=Calculateur de ROI')).toBeVisible({ timeout: 10000 });

      // Result cards should stack vertically
      const resultsGrid = page.locator('text=Économies Annuelles').locator('..').locator('..');
      const gridClass = await resultsGrid.getAttribute('class');
      expect(gridClass).toContain('grid-cols-1');
    });

    test('should display payment plans in single column on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Plans should stack vertically on mobile
      await expect(page.locator('text=DIY (Gratuit)').first()).toBeVisible({ timeout: 10000 });
    });

    test('should make comparison matrix scrollable on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Table should be in overflow container
      const tableContainer = page.locator('text=DIY (Gratuit)').locator('..').locator('..');
      const overflowClass = await tableContainer.getAttribute('class');
      expect(overflowClass).toContain('overflow-x-auto');
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible slider labels', async ({ page }) => {
      await page.goto('/');

      // Check slider labels exist
      await expect(page.locator('label:has-text("Votre taux horaire")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('label:has-text("Heures économisées")')).toBeVisible();
    });

    test('should have accessible button labels', async ({ page }) => {
      await page.goto('/');

      // Check all CTA buttons are accessible
      const ctaButtons = page.locator('a[class*="bg-gradient"]');
      const count = await ctaButtons.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');

      // Check h2 and h3 headings exist
      await expect(page.locator('h2:has-text("Calculateur de ROI")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('h3:has-text("Choisissez votre formule")')).toBeVisible();
    });
  });
});
