import { test, expect } from '@playwright/test';

/**
 * E2E Test: Visual Regression Testing
 *
 * Captures screenshots and compares them against baselines
 * to detect unintended visual changes.
 *
 * Note: First run will create baseline screenshots
 * Subsequent runs will compare against baselines
 *
 * To update baselines: npm run test:e2e -- --update-snapshots
 */

test.describe('Visual Regression', () => {
  test('home page should match visual baseline', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Home page visual baseline captured');
  });

  test('home page hero section should match baseline', async ({ page }) => {
    await page.goto('/');

    // Screenshot specific section
    const hero = page.locator('main').first();
    await expect(hero).toHaveScreenshot('hero-section.png', {
      animations: 'disabled',
    });

    console.log('✅ Hero section visual baseline captured');
  });

  test('home page form should match baseline', async ({ page }) => {
    await page.goto('/');

    const form = page.locator('form').first();
    await expect(form).toHaveScreenshot('analysis-form.png', {
      animations: 'disabled',
    });

    console.log('✅ Form visual baseline captured');
  });

  test('home page with filled form should match baseline', async ({ page }) => {
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/URL de votre entreprise/i);
    await urlInput.fill('https://example.com');

    // Wait a bit for any animations
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('home-page-filled-form.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Filled form visual baseline captured');
  });

  test('home page error state should match baseline', async ({ page }) => {
    await page.goto('/');

    // Mock API error
    await page.route('**/api/v1/analysis/start', (route) => {
      route.abort('failed');
    });

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    // Wait for error message
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('home-page-error-state.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Error state visual baseline captured');
  });

  test('War Room page should match baseline', async ({ page }) => {
    // Mock APIs to avoid long wait
    await page.route('**/api/v1/analysis/start', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'visual-test-id',
          status: 'INITIATED',
          message: 'Analysis started',
        }),
      });
    });

    await page.route('**/api/v1/analysis/*/stream', async (route) => {
      const event = {
        status: 'RUNNING_A1',
        progress_percentage: 25,
        log_message: 'Démarrage de l\'analyse A1...',
        timestamp: new Date().toISOString(),
        phase: 'A1',
      };

      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: `data: ${JSON.stringify(event)}\n\n`,
      });
    });

    await page.goto('/');
    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://visual-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 });

    // Wait for War Room to load
    await page.waitForTimeout(3000);

    await expect(page).toHaveScreenshot('war-room-page.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [page.locator('text=/\\d{2}:\\d{2}:\\d{2}/')], // Mask timestamps
    });

    console.log('✅ War Room visual baseline captured');
  });

  test('War Room progress bar should match baseline', async ({ page }) => {
    await page.route('**/api/v1/analysis/start', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'progress-test-id',
          status: 'INITIATED',
          message: 'Analysis started',
        }),
      });
    });

    await page.route('**/api/v1/analysis/*/stream', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: `data: ${JSON.stringify({
          status: 'RUNNING_A2',
          progress_percentage: 75,
          log_message: 'Analyse A2 en cours...',
          timestamp: new Date().toISOString(),
          phase: 'A2',
        })}\n\n`,
      });
    });

    await page.goto('/');
    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://progress-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 });
    await page.waitForTimeout(2000);

    const progressBar = page.locator('[role="progressbar"]').first();
    await expect(progressBar).toHaveScreenshot('progress-bar-75-percent.png', {
      animations: 'disabled',
    });

    console.log('✅ Progress bar visual baseline captured');
  });

  test('Results page should match baseline', async ({ page }) => {
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'visual-results-id',
          status: 'COMPLETE',
          url: 'https://visual-test.com',
          identity_a1: {
            sector: 'Services Professionnels',
            estimated_size: '50-100',
            tier: 'Tier 2',
          },
          score_a2: {
            score: 72,
            benchmark: 85,
            interpretation: 'Performance satisfaisante',
          },
          top_3_gaps: [
            {
              title: 'Performance Web',
              impact_financial_monthly: 12000,
              ia_opportunity: 'Monitoring prédictif',
            },
            {
              title: 'SEO',
              impact_financial_monthly: 8000,
              ia_opportunity: 'Optimisation IA',
            },
            {
              title: 'Conversion',
              impact_financial_monthly: 15000,
              ia_opportunity: 'Personnalisation',
            },
          ],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    await page.goto('/results/visual-results-id');

    // Wait for results to load
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('results-page.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [page.locator('text=/\\d{4}-\\d{2}-\\d{2}/')], // Mask dates
    });

    console.log('✅ Results page visual baseline captured');
  });

  test('Results page A1 section should match baseline', async ({ page }) => {
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'a1-visual-id',
          status: 'COMPLETE',
          url: 'https://a1-test.com',
          identity_a1: {
            sector: 'E-commerce',
            estimated_size: '100-500',
            tier: 'Tier 1',
          },
          score_a2: { score: 80, benchmark: 85, interpretation: 'Bon' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    await page.goto('/results/a1-visual-id');
    await page.waitForTimeout(2000);

    const a1Section = page.getByText(/identité/i).locator('..').first();
    await expect(a1Section).toHaveScreenshot('results-a1-section.png', {
      animations: 'disabled',
    });

    console.log('✅ A1 section visual baseline captured');
  });

  test('Results page Top 3 Gaps should match baseline', async ({ page }) => {
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'gaps-visual-id',
          status: 'COMPLETE',
          url: 'https://gaps-test.com',
          identity_a1: { sector: 'Tech', estimated_size: '10-50', tier: 'Tier 3' },
          score_a2: { score: 65, benchmark: 75, interpretation: 'Moyen' },
          top_3_gaps: [
            {
              title: 'Gap 1',
              impact_financial_monthly: 10000,
              ia_opportunity: 'Solution 1',
            },
            {
              title: 'Gap 2',
              impact_financial_monthly: 8000,
              ia_opportunity: 'Solution 2',
            },
            {
              title: 'Gap 3',
              impact_financial_monthly: 6000,
              ia_opportunity: 'Solution 3',
            },
          ],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    await page.goto('/results/gaps-visual-id');
    await page.waitForTimeout(2000);

    const gapsSection = page.getByText(/top 3/i).locator('..').first();
    await expect(gapsSection).toHaveScreenshot('results-gaps-section.png', {
      animations: 'disabled',
    });

    console.log('✅ Gaps section visual baseline captured');
  });
});

test.describe('Mobile Visual Regression', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('home page mobile should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('home-page-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Mobile home page visual baseline captured');
  });

  test('War Room mobile should match baseline', async ({ page }) => {
    await page.route('**/api/v1/analysis/start', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'mobile-war-id',
          status: 'INITIATED',
          message: 'Started',
        }),
      });
    });

    await page.route('**/api/v1/analysis/*/stream', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: `data: ${JSON.stringify({
          status: 'RUNNING_A1',
          progress_percentage: 30,
          log_message: 'Running...',
          timestamp: new Date().toISOString(),
          phase: 'A1',
        })}\n\n`,
      });
    });

    await page.goto('/');
    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://mobile-test.com');
    await page.getByRole('button', { name: /analyser/i }).first().click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 });
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('war-room-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [page.locator('text=/\\d{2}:\\d{2}:\\d{2}/')],
    });

    console.log('✅ Mobile War Room visual baseline captured');
  });
});

test.describe('Dark Mode Visual Regression', () => {
  test.use({ colorScheme: 'dark' });

  test('home page dark mode should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('home-page-dark-mode.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Dark mode home page visual baseline captured');
  });
});
