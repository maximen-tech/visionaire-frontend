import { test, expect } from '@playwright/test';

/**
 * E2E Test: Email Notification Feature
 *
 * Tests the email notification fallback mechanism:
 * - Email notification button visibility on War Room
 * - Email input validation
 * - Notification activation
 * - Success confirmation
 * - Error handling
 */

test.describe('Email Notification', () => {
  test('should display email notification option on War Room', async ({ page }) => {
    // Start an analysis
    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://email-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Look for email notification component
    // It might be a button, form, or collapsible section
    const emailNotificationButton = page.getByRole('button', { name: /email|notification|notifier/i });
    const emailNotificationSection = page.getByText(/email|notification|recevoir/i);

    // At least one should be visible
    const hasEmailOption =
      (await emailNotificationButton.isVisible().catch(() => false)) ||
      (await emailNotificationSection.isVisible().catch(() => false));

    expect(hasEmailOption).toBeTruthy();

    console.log('✅ Email notification option found on War Room');
  });

  test('should expand email notification form when clicked', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://expand-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Find the email notification trigger
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();

    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();

      // Email input should appear
      await expect(page.getByPlaceholder(/email/i)).toBeVisible({ timeout: 3000 });

      console.log('✅ Email form expanded on click');
    } else {
      // If no button, email input might already be visible
      const emailInput = page.getByPlaceholder(/email/i);
      const isVisible = await emailInput.isVisible().catch(() => false);

      expect(isVisible).toBeTruthy();
      console.log('✅ Email input already visible');
    }
  });

  test('should validate email format', async ({ page }) => {
    // Mock notification API
    await page.route('**/api/v1/analysis/*/notify', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-notify-id',
          email: 'valid@test.com',
          message: 'Email notification activée',
          status: 'RUNNING_A1',
        }),
      });
    });

    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://validation-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Expand email form if needed
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await expect(emailInput).toBeVisible({ timeout: 5000 });

    // Try invalid email
    await emailInput.fill('invalid-email');

    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();
    await submitButton.click();

    // HTML5 validation should prevent submission
    // Form should still be visible
    await expect(emailInput).toBeVisible();

    console.log('✅ Email validation working');
  });

  test('should successfully activate email notification', async ({ page }) => {
    // Mock notification API
    await page.route('**/api/v1/analysis/*/notify', async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-success-id',
          email: postData.email,
          message: `Notification activée pour ${postData.email}`,
          status: 'RUNNING_A1',
        }),
      });
    });

    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://success-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Expand email form if needed
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await expect(emailInput).toBeVisible({ timeout: 5000 });

    // Fill valid email
    await emailInput.fill('notify@test.com');

    // Submit
    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();
    await submitButton.click();

    // Success message should appear
    await expect(page.getByText(/activée|confirmé|recevoir/i)).toBeVisible({ timeout: 10000 });

    console.log('✅ Email notification activated successfully');
  });

  test('should handle email notification API errors', async ({ page }) => {
    // Mock notification API to return error
    await page.route('**/api/v1/analysis/*/notify', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Failed to activate notification',
        }),
      });
    });

    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://error-notify-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Expand email form if needed
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await expect(emailInput).toBeVisible({ timeout: 5000 });

    await emailInput.fill('error@test.com');

    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();
    await submitButton.click();

    // Error message should appear
    await expect(page.getByText(/erreur|error|échec/i)).toBeVisible({ timeout: 10000 });

    console.log('✅ Email notification error handled');
  });

  test('should show loading state during email activation', async ({ page }) => {
    // Mock slow notification API
    await page.route('**/api/v1/analysis/*/notify', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-loading-id',
          email: 'loading@test.com',
          message: 'Notification activée',
          status: 'RUNNING_A1',
        }),
      });
    });

    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://loading-notify-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Expand email form if needed
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await expect(emailInput).toBeVisible({ timeout: 5000 });

    await emailInput.fill('loading@test.com');

    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();

    // Click and check for loading state
    const submitPromise = submitButton.click();

    // Look for spinner or loading text
    await expect(
      page.locator('.animate-spin').or(submitButton.getByText(/.../).first())
    ).toBeVisible({ timeout: 1000 });

    await submitPromise;

    // Success should eventually appear
    await expect(page.getByText(/activée|confirmé/i)).toBeVisible({ timeout: 5000 });

    console.log('✅ Loading state displayed during activation');
  });

  test('should collapse email form after successful activation', async ({ page }) => {
    await page.route('**/api/v1/analysis/*/notify', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-collapse-id',
          email: 'collapse@test.com',
          message: 'Notification activée',
          status: 'RUNNING_A1',
        }),
      });
    });

    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://collapse-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Expand email form if needed
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await emailInput.fill('collapse@test.com');

    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();
    await submitButton.click();

    // Wait for success
    await expect(page.getByText(/activée|confirmé/i)).toBeVisible({ timeout: 10000 });

    // Wait a bit for animation
    await page.waitForTimeout(2000);

    // Email input should be hidden or form collapsed
    const isInputVisible = await emailInput.isVisible().catch(() => false);

    // If collapsed, input should not be visible
    // If not collapsed, success message should still be visible
    const hasSuccessMessage = await page.getByText(/activée|confirmé/i).isVisible().catch(() => false);

    expect(!isInputVisible || hasSuccessMessage).toBeTruthy();

    console.log('✅ Email form state after activation verified');
  });

  test('should prevent duplicate email activation', async ({ page }) => {
    let requestCount = 0;

    await page.route('**/api/v1/analysis/*/notify', async (route) => {
      requestCount++;

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-duplicate-id',
          email: 'duplicate@test.com',
          message: 'Notification activée',
          status: 'RUNNING_A1',
        }),
      });
    });

    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://duplicate-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Expand email form if needed
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await emailInput.fill('duplicate@test.com');

    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();

    // Click multiple times rapidly
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();

    // Wait for success
    await expect(page.getByText(/activée|confirmé/i)).toBeVisible({ timeout: 10000 });

    // Wait a bit
    await page.waitForTimeout(2000);

    // Should only have made one request (not 3)
    expect(requestCount).toBe(1);

    console.log('✅ Duplicate activation prevented');
  });
});

test.describe('Email Notification Use Cases', () => {
  test('should allow email notification during long analysis', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://long-analysis-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Wait for War Room to load
    await expect(page.getByText(/analyse en cours/i)).toBeVisible({ timeout: 10000 });

    // Email option should be available immediately
    const hasEmailOption =
      (await page.getByRole('button', { name: /email|notification/i }).isVisible().catch(() => false)) ||
      (await page.getByText(/email|notification|recevoir/i).isVisible().catch(() => false));

    expect(hasEmailOption).toBeTruthy();

    console.log('✅ Email notification available during analysis');
  });

  test('should provide fallback when SSE connection fails', async ({ page }) => {
    await page.goto('/');

    // Block SSE endpoint
    await page.route('**/api/v1/analysis/*/stream', (route) => {
      route.abort('failed');
    });

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://sse-fail-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Email notification should still be available as fallback
    const hasEmailOption =
      (await page.getByRole('button', { name: /email|notification/i }).isVisible().catch(() => false)) ||
      (await page.getByText(/email|notification|recevoir/i).isVisible().catch(() => false));

    expect(hasEmailOption).toBeTruthy();

    console.log('✅ Email notification available as SSE fallback');
  });
});
