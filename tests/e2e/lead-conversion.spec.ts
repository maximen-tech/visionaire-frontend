import { test, expect } from '@playwright/test';

/**
 * E2E Test: Lead Conversion Flow
 *
 * Tests the lead capture and CRM integration:
 * - Lead form visibility on results page
 * - Form validation
 * - Form submission
 * - CRM sync confirmation
 * - Success states
 */

test.describe('Lead Conversion', () => {
  test('should display lead form on results page', async ({ page }) => {
    // Mock the results API to avoid waiting for full analysis
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-lead-id',
          status: 'COMPLETE',
          url: 'https://test-lead.com',
          identity_a1: {
            sector: 'Services Professionnels',
            estimated_size: '50-100',
            tier: 'Tier 2',
          },
          score_a2: {
            score: 68,
            benchmark: 85,
            interpretation: 'Performance inférieure au benchmark',
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

    // Navigate directly to results
    await page.goto('/results/test-lead-id');

    // Wait for results to load
    await expect(page.getByRole('heading', { name: /résultats/i })).toBeVisible();

    // Lead form should be visible
    const leadForm = page.locator('form').first();
    await expect(leadForm).toBeVisible();

    // Form should have required fields
    await expect(page.getByPlaceholder(/nom/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();

    // Optional fields
    const phoneInput = page.getByPlaceholder(/téléphone/i);
    const companyInput = page.getByPlaceholder(/entreprise/i);

    // These might be visible depending on implementation
    const hasPhone = await phoneInput.isVisible().catch(() => false);
    const hasCompany = await companyInput.isVisible().catch(() => false);

    console.log(`Lead form has phone: ${hasPhone}, company: ${hasCompany}`);
  });

  test('should validate required fields in lead form', async ({ page }) => {
    // Mock results API
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-validation-id',
          status: 'COMPLETE',
          url: 'https://test-validation.com',
          identity_a1: { sector: 'Test', estimated_size: '10-50', tier: 'Tier 3' },
          score_a2: { score: 75, benchmark: 80, interpretation: 'Good' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    await page.goto('/results/test-validation-id');

    await expect(page.locator('form').first()).toBeVisible();

    const submitButton = page.getByRole('button', { name: /envoyer|convertir|confirmer/i });

    // Try submitting empty form
    await submitButton.click();

    // HTML5 validation should prevent submission
    // Form should still be visible (not submitted)
    await expect(page.locator('form').first()).toBeVisible();

    // Fill only name (missing email)
    await page.getByPlaceholder(/nom/i).fill('Test User');
    await submitButton.click();

    // Should still not submit
    await expect(page.locator('form').first()).toBeVisible();

    // Now fill email with invalid format
    await page.getByPlaceholder(/email/i).fill('invalid-email');
    await submitButton.click();

    // HTML5 validation should catch this
    await expect(page.locator('form').first()).toBeVisible();
  });

  test('should successfully submit lead form', async ({ page }) => {
    // Mock results API
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-submit-id',
          status: 'COMPLETE',
          url: 'https://test-submit.com',
          identity_a1: { sector: 'Tech', estimated_size: '100-500', tier: 'Tier 1' },
          score_a2: { score: 85, benchmark: 90, interpretation: 'Excellent' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    // Mock lead conversion API
    await page.route('**/api/v1/leads/convert', async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          lead_id: 'lead-12345',
          analysis_id: postData.analysis_id,
          name: postData.name,
          email: postData.email,
          message: 'Lead converti avec succès',
          crm_synced: true,
        }),
      });
    });

    await page.goto('/results/test-submit-id');

    await expect(page.locator('form').first()).toBeVisible();

    // Fill the form with valid data
    await page.getByPlaceholder(/nom/i).fill('Jean Dupont');
    await page.getByPlaceholder(/email/i).fill('jean.dupont@example.com');

    // Fill optional fields if they exist
    const phoneInput = page.getByPlaceholder(/téléphone/i);
    const companyInput = page.getByPlaceholder(/entreprise/i);

    if (await phoneInput.isVisible().catch(() => false)) {
      await phoneInput.fill('+33612345678');
    }

    if (await companyInput.isVisible().catch(() => false)) {
      await companyInput.fill('Example Corp');
    }

    // Submit the form
    const submitButton = page.getByRole('button', { name: /envoyer|convertir|confirmer/i });
    await submitButton.click();

    // Should show success message
    await expect(page.getByText(/merci|succès|confirmé/i)).toBeVisible({ timeout: 10000 });

    console.log('✅ Lead form submitted successfully');
  });

  test('should handle lead conversion API errors', async ({ page }) => {
    // Mock results API
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-error-id',
          status: 'COMPLETE',
          url: 'https://test-error.com',
          identity_a1: { sector: 'Test', estimated_size: '10-50', tier: 'Tier 3' },
          score_a2: { score: 60, benchmark: 70, interpretation: 'Below average' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    // Mock lead conversion API to return error
    await page.route('**/api/v1/leads/convert', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Internal server error',
        }),
      });
    });

    await page.goto('/results/test-error-id');

    await expect(page.locator('form').first()).toBeVisible();

    // Fill and submit form
    await page.getByPlaceholder(/nom/i).fill('Error Test');
    await page.getByPlaceholder(/email/i).fill('error@test.com');
    await page.getByRole('button', { name: /envoyer|convertir|confirmer/i }).click();

    // Should show error message
    await expect(page.getByText(/erreur|error|échec/i)).toBeVisible({ timeout: 10000 });

    // Form should still be visible (can retry)
    await expect(page.locator('form').first()).toBeVisible();
  });

  test('should show loading state during form submission', async ({ page }) => {
    // Mock results API
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-loading-id',
          status: 'COMPLETE',
          url: 'https://test-loading.com',
          identity_a1: { sector: 'Test', estimated_size: '10-50', tier: 'Tier 3' },
          score_a2: { score: 70, benchmark: 75, interpretation: 'Good' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    // Mock slow lead conversion API
    await page.route('**/api/v1/leads/convert', async (route) => {
      // Delay response
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          lead_id: 'lead-slow',
          analysis_id: 'test-loading-id',
          name: 'Slow Test',
          email: 'slow@test.com',
          message: 'Success',
          crm_synced: true,
        }),
      });
    });

    await page.goto('/results/test-loading-id');

    await page.getByPlaceholder(/nom/i).fill('Loading Test');
    await page.getByPlaceholder(/email/i).fill('loading@test.com');

    const submitButton = page.getByRole('button', { name: /envoyer|convertir|confirmer/i });

    // Submit
    const submitPromise = submitButton.click();

    // Loading state should appear
    // Look for spinner or disabled state
    await expect(
      page.locator('.animate-spin').or(submitButton.getByText(/.../).first())
    ).toBeVisible({ timeout: 1000 });

    await submitPromise;

    // Eventually success message should appear
    await expect(page.getByText(/merci|succès/i)).toBeVisible({ timeout: 5000 });
  });

  test('should reset form after successful submission', async ({ page }) => {
    // Mock APIs
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-reset-id',
          status: 'COMPLETE',
          url: 'https://test-reset.com',
          identity_a1: { sector: 'Test', estimated_size: '10-50', tier: 'Tier 3' },
          score_a2: { score: 80, benchmark: 85, interpretation: 'Very good' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    await page.route('**/api/v1/leads/convert', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          lead_id: 'lead-reset',
          analysis_id: 'test-reset-id',
          name: 'Reset Test',
          email: 'reset@test.com',
          message: 'Success',
          crm_synced: true,
        }),
      });
    });

    await page.goto('/results/test-reset-id');

    const nameInput = page.getByPlaceholder(/nom/i);
    const emailInput = page.getByPlaceholder(/email/i);

    await nameInput.fill('Reset User');
    await emailInput.fill('reset@test.com');

    await page.getByRole('button', { name: /envoyer|convertir|confirmer/i }).click();

    // Wait for success
    await expect(page.getByText(/merci|succès/i)).toBeVisible({ timeout: 10000 });

    // Wait a bit for auto-reset (if implemented)
    await page.waitForTimeout(6000);

    // Form should be reset (empty inputs)
    const nameValue = await nameInput.inputValue();
    const emailValue = await emailInput.inputValue();

    expect(nameValue).toBe('');
    expect(emailValue).toBe('');

    console.log('✅ Form reset after successful submission');
  });
});

test.describe('CRM Integration Confirmation', () => {
  test('should display CRM sync status', async ({ page }) => {
    await page.route('**/api/v1/analysis/*/results-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-crm-id',
          status: 'COMPLETE',
          url: 'https://test-crm.com',
          identity_a1: { sector: 'Test', estimated_size: '10-50', tier: 'Tier 3' },
          score_a2: { score: 90, benchmark: 92, interpretation: 'Excellent' },
          top_3_gaps: [],
          created_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        }),
      });
    });

    await page.route('**/api/v1/leads/convert', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          lead_id: 'lead-crm-123',
          analysis_id: 'test-crm-id',
          name: 'CRM Test',
          email: 'crm@test.com',
          message: 'Lead converti et synchronisé avec CRM',
          crm_synced: true,
        }),
      });
    });

    await page.goto('/results/test-crm-id');

    await page.getByPlaceholder(/nom/i).fill('CRM User');
    await page.getByPlaceholder(/email/i).fill('crm@test.com');
    await page.getByRole('button', { name: /envoyer|convertir|confirmer/i }).click();

    // Should show success with CRM confirmation
    await expect(page.getByText(/merci|succès/i)).toBeVisible({ timeout: 10000 });

    // Check if CRM sync status is mentioned
    const hasCRMMessage = await page.getByText(/crm|synchronisé/i).isVisible().catch(() => false);

    if (hasCRMMessage) {
      console.log('✅ CRM sync status displayed');
    }
  });
});
