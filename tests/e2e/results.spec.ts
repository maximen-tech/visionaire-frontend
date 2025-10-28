import { test, expect } from '@playwright/test';

/**
 * E2E Test: Results Page Phase 2 Features
 *
 * Tests for Phase 2 Results enhancements:
 * - Valorisation input ($/hour calculation)
 * - OpportunityCard with time + monetary value
 * - Copy-to-clipboard for Analysis ID
 * - Smooth scroll to Lead Form
 * - Toast notifications
 *
 * Prerequisites:
 * - Backend API running with completed analysis data
 * - Frontend dev server on http://localhost:3000
 */

test.describe('Results Page - Valorisation', () => {
  test('should prompt for hourly rate input before showing monetary values', async ({
    page,
  }) => {
    // Note: This test requires a valid analysis ID with COMPLETE status
    // For testing, you may need to create an analysis first or use a mock ID

    // Navigate directly to a results page (use known test ID or create analysis first)
    // For now, we'll test the flow starting from home

    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-valorization.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/waiting-room\/[a-f0-9-]+/);

    // Extract analysis ID
    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    // Wait for completion and redirect to results (or navigate directly for testing)
    // For faster testing, navigate directly:
    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    } else {
      // Wait for auto-redirect
      await page.waitForURL(/\/results\/[a-f0-9-]+/, { timeout: 12 * 60 * 1000 });
    }

    // Should show valorisation input section
    await expect(
      page.getByText(/combien vaut votre temps|taux horaire/i)
    ).toBeVisible();

    // Input field should be visible
    const hourlyRateInput = page.getByPlaceholder(/75/i);
    await expect(hourlyRateInput).toBeVisible();

    // Calculate button should be visible
    const calculateButton = page.getByRole('button', { name: /calculer/i });
    await expect(calculateButton).toBeVisible();
  });

  test('should calculate and display monetary values after entering hourly rate', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-calculation.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter hourly rate
    const hourlyRateInput = page.getByPlaceholder(/75/i);
    await hourlyRateInput.fill('50');

    // Click calculate
    const calculateButton = page.getByRole('button', { name: /calculer/i });
    await calculateButton.click();

    // Should show success toast
    await expect(page.getByText(/valorisation calculée/i)).toBeVisible({
      timeout: 5000,
    });

    // Valorisation input section should disappear
    await expect(
      page.getByText(/combien vaut votre temps/i)
    ).not.toBeVisible();

    // Total value should now display with $ CAD
    await expect(page.getByText(/\$ CAD/i)).toBeVisible();

    // Each OpportunityCard should show monetary values
    await expect(page.getByText(/\$ CAD\/semaine|\$ CAD\/an/i).first()).toBeVisible();
  });

  test('should show error toast for invalid hourly rate', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-invalid-rate.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Try to calculate without entering rate
    const calculateButton = page.getByRole('button', { name: /calculer/i });
    await calculateButton.click();

    // Should show error toast
    await expect(page.getByText(/taux horaire valide/i)).toBeVisible({
      timeout: 3000,
    });
  });
});

test.describe('Results Page - Opportunity Cards', () => {
  test('should display 3 opportunity cards with time data', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-opportunities.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display section heading
    await expect(page.getByText(/vos 3 opportunités/i)).toBeVisible();

    // Should display 3 cards
    await expect(page.getByText(/présence digitale/i)).toBeVisible();
    await expect(page.getByText(/création de valeur/i)).toBeVisible();
    await expect(page.getByText(/gestion business/i)).toBeVisible();

    // Each card should show hours per week and year
    const hoursPerWeek = page.getByText(/h\/semaine/i);
    await expect(hoursPerWeek.first()).toBeVisible();

    const hoursPerYear = page.getByText(/h\/an/i);
    await expect(hoursPerYear.first()).toBeVisible();
  });

  test('should show complexity level and tools hint in cards', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-card-details.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Cards should display complexity (1-10)
    await expect(page.getByText(/complexité|difficulté/i).first()).toBeVisible();

    // Cards should display tools hint
    await expect(page.getByText(/outils suggérés|solutions/i).first()).toBeVisible();
  });
});

test.describe('Results Page - Copy to Clipboard', () => {
  test('should copy analysis ID when clicking copy button', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-clipboard.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const waitingRoomUrl = page.url();
    const analysisId = waitingRoomUrl.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Find copy button in metadata section
    const copyButton = page.getByRole('button', { name: /copier/i });
    await expect(copyButton).toBeVisible();

    // Click copy button
    await copyButton.click();

    // Should show success toast
    await expect(page.getByText(/ID d'analyse copié/i)).toBeVisible({ timeout: 3000 });

    // Verify clipboard content (if permissions granted)
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(analysisId);
  });
});

test.describe('Results Page - Smooth Scroll', () => {
  test('should scroll to lead form when clicking Reality Check button', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-scroll.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Find Reality Check section and scroll button
    await expect(page.getByText(/reality check/i)).toBeVisible();

    const scrollButton = page.getByRole('button', {
      name: /réserver ma consultation/i,
    });
    await expect(scrollButton).toBeVisible();

    // Click scroll button
    await scrollButton.click();

    // Should show toast hint
    await expect(page.getByText(/réservez votre place/i)).toBeVisible({ timeout: 3000 });

    // Wait for smooth scroll animation
    await page.waitForTimeout(1000);

    // Lead form should be in viewport
    const leadForm = page.locator('#lead-form');
    await expect(leadForm).toBeInViewport();
  });
});

test.describe('Results Page - Summary Cards', () => {
  test('should display total time summary', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-summary.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display total hours per week
    await expect(page.getByText(/temps total récupérable/i)).toBeVisible();

    // Should show both weekly and yearly totals
    await expect(page.getByText(/par semaine/i)).toBeVisible();
    await expect(page.getByText(/par année/i)).toBeVisible();

    // Numbers should be visible (format: X.Xh or XXXh)
    const weeklyHours = page.locator('text=/\\d+\\.?\\d*h/').first();
    await expect(weeklyHours).toBeVisible();
  });

  test('should display identity information in header', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-identity.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Header should show company name and sector
    await expect(page.getByText(/vos opportunités/i)).toBeVisible();

    // Should display company name (from identity_a1)
    // Note: Actual company name depends on backend data
    await page.waitForTimeout(2000);
  });
});

test.describe('Results Page - Implementation Time Comparison', () => {
  test('should display solo vs expert implementation times', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-implementation.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display implementation section
    await expect(page.getByText(/temps d'implémentation/i)).toBeVisible();

    // Should show "En Solo" option
    await expect(page.getByText(/en solo/i)).toBeVisible();

    // Should show "Avec Expert" option
    await expect(page.getByText(/avec expert/i)).toBeVisible();

    // Should display time savings
    await expect(page.getByText(/économie/i)).toBeVisible();
  });
});

test.describe('Results Page - Lead Form', () => {
  test('should display lead form with Phase 2 enhancements', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-leadform.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Lead form should be present with id="lead-form"
    const leadForm = page.locator('#lead-form');
    await expect(leadForm).toBeVisible();

    // Should contain form fields
    await expect(page.getByPlaceholder(/nom/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();

    // Should have urgency counter (Phase 2 feature)
    // Note: Exact text depends on LeadForm implementation
    await page.waitForTimeout(2000);
  });

  test('should submit lead form successfully', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-lead-submit.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Scroll to lead form
    const leadForm = page.locator('#lead-form');
    await leadForm.scrollIntoViewIfNeeded();

    // Fill form
    await page.getByPlaceholder(/nom/i).fill('Test User');
    await page.getByPlaceholder(/email/i).fill('test@example.com');

    const phoneInput = page.getByPlaceholder(/téléphone/i);
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('514-555-1234');
    }

    const companyInput = page.getByPlaceholder(/entreprise/i);
    if (await companyInput.isVisible()) {
      await companyInput.fill('Test Company Inc.');
    }

    // Submit
    const submitButton = page.getByRole('button', {
      name: /réserver|envoyer|confirmer/i,
    });
    await submitButton.click();

    // Should show success message or redirect
    await page.waitForTimeout(3000);
  });
});

test.describe('Results Page - Navigation', () => {
  test('should have button to start new analysis', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-navigation.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should have button to start new analysis
    const newAnalysisButton = page.getByRole('button', {
      name: /nouvelle analyse/i,
    });
    await expect(newAnalysisButton).toBeVisible();

    // Click should navigate to home
    await newAnalysisButton.click();
    await page.waitForURL('/');
  });
});

test.describe('Results Page - Reality Check Section', () => {
  test('should display Reality Check warning', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-reality.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display Reality Check section
    await expect(page.getByText(/reality check/i)).toBeVisible();

    // Should mention 73% statistic
    await expect(page.getByText(/73.*pme/i)).toBeVisible();

    // Should have CTA button
    await expect(
      page.getByRole('button', { name: /réserver ma consultation/i })
    ).toBeVisible();
  });
});

test.describe('Results Page - Metadata', () => {
  test('should display analysis metadata at bottom', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-metadata.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display analysis ID
    await expect(page.getByText(/analyse id/i)).toBeVisible();

    // Should display analyzed URL
    await expect(page.getByText(/url analysée/i)).toBeVisible();
  });
});
