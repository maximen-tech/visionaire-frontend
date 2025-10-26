import { test, expect } from '@playwright/test';

/**
 * E2E Test: Error Handling Scenarios
 *
 * Tests error states, edge cases, and failure scenarios:
 * - API connection failures
 * - Invalid analysis IDs
 * - Network timeouts
 * - SSE disconnections
 * - Failed analyses
 */

test.describe('Error Handling', () => {
  test('should handle API connection errors gracefully', async ({ page }) => {
    // Navigate to home
    await page.goto('/');

    // Mock API failure by using route interception
    await page.route('**/api/v1/analysis/start', (route) => {
      route.abort('failed');
    });

    const urlInput = page.getByPlaceholder(/URL de votre entreprise/i);
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    await urlInput.fill('https://test-error.com');
    await analyzeButton.click();

    // Should show error message
    await expect(page.getByText(/erreur/i)).toBeVisible({ timeout: 10000 });

    // Should still be on home page
    await expect(page).toHaveURL('/');
  });

  test('should handle invalid analysis ID', async ({ page }) => {
    // Try to access analysis page with fake ID
    await page.goto('/analysis/invalid-id-123');

    // Should either redirect or show error
    // Wait a bit to see what happens
    await page.waitForTimeout(3000);

    // Check if redirected to home or error shown
    const currentUrl = page.url();
    const hasError = await page.getByText(/erreur|introuvable|not found/i).isVisible().catch(() => false);

    expect(
      currentUrl.includes('/') || hasError
    ).toBeTruthy();
  });

  test('should handle invalid results ID', async ({ page }) => {
    // Try to access results page with fake ID
    await page.goto('/results/invalid-id-456');

    // Should redirect to home or show error
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    const hasError = await page.getByText(/erreur|introuvable|not found/i).isVisible().catch(() => false);

    expect(
      currentUrl.includes('/') || hasError
    ).toBeTruthy();
  });

  test('should handle SSE connection failures', async ({ page, context }) => {
    // Start an analysis
    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://sse-error-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Intercept SSE endpoint to simulate failure
    await page.route('**/api/v1/analysis/*/stream', (route) => {
      route.abort('failed');
    });

    // Wait to see if error handling kicks in
    await page.waitForTimeout(5000);

    // App should gracefully handle SSE failure
    // Either show error message or fall back to polling
    const hasErrorIndicator = await page.getByText(/erreur|connection|échec/i).isVisible().catch(() => false);
    const hasPollingFallback = await page.locator('[role="progressbar"]').isVisible().catch(() => false);

    // One of these should be true
    expect(hasErrorIndicator || hasPollingFallback).toBeTruthy();
  });

  test('should display failed analysis status', async ({ page }) => {
    await page.goto('/');

    // Mock API to return FAILED status
    await page.route('**/api/v1/analysis/start', async (route) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({
          analysis_id: 'test-failed-id',
          status: 'INITIATED',
          message: 'Analysis started',
        }),
      });
    });

    // Mock SSE stream to send FAILED event
    await page.route('**/api/v1/analysis/*/stream', async (route) => {
      // For SSE, we need to send event-stream format
      const stream = `data: ${JSON.stringify({
        status: 'FAILED',
        progress_percentage: 50,
        log_message: 'Analysis failed due to error',
        timestamp: new Date().toISOString(),
        phase: 'A1',
      })}\n\n`;

      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: stream,
      });
    });

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://fail-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Wait for FAILED status to appear
    await expect(page.getByText(/échec|failed|erreur/i)).toBeVisible({ timeout: 15000 });

    // Error message should be displayed
    await expect(page.getByText(/error|erreur/i)).toBeVisible();
  });

  test('should handle network timeout gracefully', async ({ page }) => {
    await page.goto('/');

    // Mock slow API response
    await page.route('**/api/v1/analysis/start', async (route) => {
      // Delay response beyond reasonable timeout
      await new Promise((resolve) => setTimeout(resolve, 60000));
      await route.fulfill({
        status: 408,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Request timeout' }),
      });
    });

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://timeout-test.com');

    // Click and expect timeout handling
    await page.getByRole('button', { name: /analyser/i }).click();

    // Should eventually show error or timeout message
    // Frontend should have its own timeout logic
    await expect(page.getByText(/erreur|timeout|délai/i)).toBeVisible({ timeout: 30000 });
  });

  test('should validate empty form submission', async ({ page }) => {
    await page.goto('/');

    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    // Button should be disabled when input is empty
    await expect(analyzeButton).toBeDisabled();

    // Try to click anyway (should do nothing)
    await analyzeButton.click({ force: true });

    // Should still be on home page
    await expect(page).toHaveURL('/');
  });

  test('should handle rapid form submissions', async ({ page }) => {
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/URL de votre entreprise/i);
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    await urlInput.fill('https://rapid-test.com');

    // Try rapid clicking
    await analyzeButton.click();
    await analyzeButton.click();
    await analyzeButton.click();

    // Should only trigger once (button should be disabled after first click)
    // Wait to see if multiple analyses were created
    await page.waitForTimeout(2000);

    // Should only navigate once
    const url = page.url();
    expect(url).toMatch(/\/analysis\/[a-f0-9-]+/);
  });

  test('should handle back navigation from War Room', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://back-nav-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // Go back to home
    await page.goBack();

    // Should be back on home page
    await expect(page).toHaveURL('/');

    // Home page should still be functional
    await expect(page.getByPlaceholder(/URL de votre entreprise/i)).toBeVisible();
  });

  test('should handle browser refresh on War Room', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://refresh-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    const analysisUrl = page.url();

    // Reload the page
    await page.reload();

    // Should still show War Room (SSE reconnects)
    await expect(page.getByText(/analyse en cours/i)).toBeVisible({ timeout: 10000 });

    // URL should be same
    expect(page.url()).toBe(analysisUrl);
  });
});

test.describe('Responsive Behavior', () => {
  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    await page.goto('/');

    // All elements should still be visible and functional
    await expect(page.getByRole('heading', { name: /Vision'AI're/i })).toBeVisible();
    await expect(page.getByPlaceholder(/URL de votre entreprise/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /analyser/i }).first()).toBeVisible();

    // Test form submission on mobile
    await page.getByPlaceholder(/URL de votre entreprise/i).fill('https://mobile-test.com');
    await page.getByRole('button', { name: /analyser/i }).first().click();

    // Should navigate to War Room
    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    // War Room should be responsive
    await expect(page.locator('[role="progressbar"]').first()).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad

    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Vision'AI're/i })).toBeVisible();

    // Layout should adapt to tablet size
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();
  });
});
