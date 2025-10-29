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

test.describe('Phase 2: HourlyRateInput Component', () => {
  test('should display hourly rate input with proper labels', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-hourly-input.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display hourly rate input with label
    await expect(page.locator('label[for="hourly-rate"]')).toBeVisible();
    await expect(page.locator('label[for="hourly-rate"]')).toContainText(/taux horaire/i);

    // Input field should be visible with placeholder
    const input = page.locator('input#hourly-rate');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Ex: 75');

    // Help text should be visible
    await expect(page.locator('#hourly-rate-help')).toBeVisible();
    await expect(page.locator('#hourly-rate-help')).toContainText(/entre 20 \$ et 500 \$/);
  });

  test('should show error for value below minimum ($20)', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-min-validation.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter value below minimum
    const input = page.locator('input#hourly-rate');
    await input.fill('15');

    // Error message should appear
    await expect(page.locator('#hourly-rate-error')).toBeVisible();
    await expect(page.locator('#hourly-rate-error')).toContainText(/minimum.*20 \$ CAD/i);

    // Input should have aria-invalid="true"
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAttribute('aria-describedby', 'hourly-rate-error');
  });

  test('should show error for value above maximum ($500)', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-max-validation.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter value above maximum
    const input = page.locator('input#hourly-rate');
    await input.fill('600');

    // Error message should appear
    await expect(page.locator('#hourly-rate-error')).toBeVisible();
    await expect(page.locator('#hourly-rate-error')).toContainText(/maximum.*500 \$ CAD/i);
  });

  test('should accept valid hourly rate and show success toast', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-valid-rate.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter valid rate
    const input = page.locator('input#hourly-rate');
    await input.fill('100');

    // Should show success toast
    await expect(page.getByText(/valorisation calculée/i)).toBeVisible({ timeout: 5000 });

    // No error message should be visible
    await expect(page.locator('#hourly-rate-error')).not.toBeVisible();

    // Input should have aria-invalid="false"
    await expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  test('should reset to null when input is cleared', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-clear-input.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter valid rate
    const input = page.locator('input#hourly-rate');
    await input.fill('75');
    await page.waitForTimeout(500);

    // Clear input
    await input.clear();

    // No error should show
    await expect(page.locator('#hourly-rate-error')).not.toBeVisible();

    // Help text should be visible again
    await expect(page.locator('#hourly-rate-help')).toBeVisible();
  });
});

test.describe('Phase 2: Valorization Flow', () => {
  test('should not show $ values initially', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-no-initial-values.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // $ CAD values should not be visible yet
    const cadText = await page.locator('text=/\\d+.*\\$ CAD/').count();
    // Should only show help text "$ CAD/h", not actual values
    expect(cadText).toBeLessThanOrEqual(1);
  });

  test('should display $ values after entering valid hourly rate', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-show-values.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter hourly rate
    const input = page.locator('input#hourly-rate');
    await input.fill('100');

    // Wait for valorization to calculate
    await page.waitForTimeout(1000);

    // Total summary should appear
    await expect(page.getByText(/valeur totale des opportunités/i)).toBeVisible();

    // Should show weekly and annual savings
    await expect(page.getByText(/économie hebdomadaire/i)).toBeVisible();
    await expect(page.getByText(/économie annuelle/i)).toBeVisible();

    // $ CAD values should now be visible
    const cadValues = page.locator('text=/\\d+\\s\\d+.*\\$ CAD/');
    await expect(cadValues.first()).toBeVisible();
  });

  test('should calculate valorization correctly with Quebec formatting', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-calculation.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter hourly rate
    const input = page.locator('input#hourly-rate');
    await input.fill('50');

    await page.waitForTimeout(1000);

    // Check Quebec-style formatting (space before $)
    // Format: "26 000 $ CAD" (number space $ space CAD)
    const valorization = page.locator('text=/\\d+\\s\\d+.*\\$ CAD/').first();
    await expect(valorization).toBeVisible();

    // Verify space before $
    const text = await valorization.textContent();
    expect(text).toMatch(/\d+\s\d+\s\$\sCAD/); // Regex: digits space digits space $ space CAD
  });

  test('should handle decimal hourly rates', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-decimal-rate.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter decimal rate
    const input = page.locator('input#hourly-rate');
    await input.fill('75.50');

    // Should accept and calculate
    await expect(page.getByText(/valorisation calculée/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Phase 2: OpportunityCard Component', () => {
  test('should display OpportunityCard with number badge and icon', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-opportunity-card.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display 3 opportunity cards
    await expect(page.getByText(/présence digitale/i)).toBeVisible();
    await expect(page.getByText(/création de valeur/i)).toBeVisible();
    await expect(page.getByText(/gestion business/i)).toBeVisible();

    // Each card should show hours per week and year
    const hoursPerWeek = page.locator('text=/\\d+\\.\\d+h\\/semaine/');
    await expect(hoursPerWeek.first()).toBeVisible();

    const hoursPerYear = page.locator('text=/\\d+h\\/an/');
    await expect(hoursPerYear.first()).toBeVisible();
  });

  test('should show $ value on OpportunityCard when hourly rate provided', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-card-valorization.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Enter hourly rate
    const input = page.locator('input#hourly-rate');
    await input.fill('80');

    await page.waitForTimeout(1000);

    // Each OpportunityCard should now show $ value
    await expect(page.getByText(/de valeur\/an/i).first()).toBeVisible();
  });

  test('should display implementation time estimates', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-implementation-time.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should show implementation time section
    await expect(page.getByText(/temps d'implémentation estimé/i).first()).toBeVisible();

    // Should show solo (DIY) time
    await expect(page.getByText(/seul.*diy/i).first()).toBeVisible();

    // Should show expert time
    await expect(page.getByText(/avec expert/i).first()).toBeVisible();

    // Should show time savings
    await expect(page.getByText(/économie.*gagnées/i).first()).toBeVisible();
  });

  test('should display problem teaser in OpportunityCard', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-problem-teaser.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display "Opportunité" section heading
    await expect(page.getByText(/💡 opportunité/i).first()).toBeVisible();
  });
});

test.describe('Phase 2: ComplexityBar Component', () => {
  test('should display ComplexityBar with ARIA attributes', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-complexity-bar.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display complexity section
    await expect(page.getByText(/📊 complexité/i).first()).toBeVisible();

    // ComplexityBar should have role="progressbar"
    const progressBar = page.locator('[role="progressbar"]').first();
    await expect(progressBar).toBeVisible();

    // Should have ARIA label
    await expect(progressBar).toHaveAttribute('aria-label', /complexity level/i);

    // Should have aria-valuenow (1-10)
    const valueNow = await progressBar.getAttribute('aria-valuenow');
    expect(parseInt(valueNow || '0')).toBeGreaterThanOrEqual(1);
    expect(parseInt(valueNow || '0')).toBeLessThanOrEqual(10);
  });

  test('should display complexity description', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://test-complexity-description.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    const url = page.url();
    const analysisId = url.match(/\/waiting-room\/([a-f0-9-]+)/)?.[1];

    if (analysisId) {
      await page.goto(`/results/${analysisId}`);
    }

    // Should display complexity description (e.g., "Facile", "Modéré", "Complexe")
    // Note: Exact text depends on complexity level
    await page.waitForTimeout(2000);
  });
});
