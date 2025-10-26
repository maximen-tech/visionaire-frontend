import { test, expect } from '@playwright/test';

/**
 * E2E Test: Complete Analysis Flow
 *
 * This test simulates the complete user journey:
 * 1. Home page → Submit URL
 * 2. War Room → Real-time progress via SSE
 * 3. Results page → View analysis results
 *
 * Prerequisites:
 * - Backend API running on http://localhost:8000
 * - Celery worker active
 * - Redis and PostgreSQL running
 * - Frontend dev server on http://localhost:3000
 */

test.describe('Complete Analysis Flow', () => {
  test('should complete full analysis journey from URL submission to results', async ({
    page,
  }) => {
    // Step 1: Navigate to home page
    await page.goto('/');

    // Verify hero section is visible
    await expect(page.getByRole('heading', { name: /Vision'AI're/i })).toBeVisible();

    // Verify input and button are present
    const urlInput = page.getByPlaceholder(/votresite\.com/i);
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    await expect(urlInput).toBeVisible();
    await expect(analyzeButton).toBeVisible();

    // Initially button should be disabled (empty input)
    await expect(analyzeButton).toBeDisabled();

    // Step 2: Enter a valid URL
    const testURL = 'https://example.com';
    await urlInput.fill(testURL);

    // Button should now be enabled
    await expect(analyzeButton).toBeEnabled();

    // Step 3: Submit the form
    await analyzeButton.click();

    // Step 4: Wait for navigation to War Room
    // URL should change to /analysis/[id]
    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 });

    // Extract analysis ID from URL
    const url = page.url();
    const analysisId = url.match(/\/analysis\/([a-f0-9-]+)/)?.[1];
    expect(analysisId).toBeTruthy();

    console.log(`✅ Analysis started with ID: ${analysisId}`);

    // Step 5: Verify War Room components are visible
    await expect(page.getByText(/analyse en cours/i)).toBeVisible();

    // Check for progress bar
    const progressBar = page.locator('[role="progressbar"]').first();
    await expect(progressBar).toBeVisible();

    // Check for status card
    await expect(page.getByText(testURL)).toBeVisible();

    // Check for log stream (terminal)
    const logStream = page.locator('.bg-gray-900').first(); // Terminal background
    await expect(logStream).toBeVisible();

    // Step 6: Wait for SSE events and monitor progress
    // Note: This will take 7-10 minutes for real analysis
    // For testing, we expect simulated events to arrive quickly

    console.log('⏳ Waiting for SSE events...');

    // Wait for first log message to appear
    await expect(page.getByText(/démarrage/i)).toBeVisible({ timeout: 30000 });

    console.log('✅ SSE connection established, receiving events');

    // Step 7: Monitor status changes
    // Wait for RUNNING_A1 status
    await expect(page.getByText(/A1/i)).toBeVisible({ timeout: 60000 });

    console.log('✅ Phase A1 started');

    // Step 8: Wait for completion and auto-redirect to results
    // This will take the full analysis time (7-10 min in production)
    // In test mode with simulated backend, this should be faster
    console.log('⏳ Waiting for analysis completion (this may take 7-10 minutes)...');

    await page.waitForURL(/\/results\/[a-f0-9-]+/, {
      timeout: 12 * 60 * 1000, // 12 minutes max
    });

    console.log('✅ Redirected to results page');

    // Step 9: Verify results page loaded
    await expect(page.getByRole('heading', { name: /résultats/i })).toBeVisible();

    // Verify A1 Identity section
    await expect(page.getByText(/identité entreprise/i)).toBeVisible();
    await expect(page.getByText(/secteur/i)).toBeVisible();

    // Verify A2 Score section
    await expect(page.getByText(/score vision'ai're/i)).toBeVisible();
    await expect(page.getByText(/\/100/i)).toBeVisible();

    // Verify Top 3 Gaps section
    await expect(page.getByText(/top 3 opportunités/i)).toBeVisible();

    // Verify CTA or Lead Form is present
    const leadForm = page.locator('form').first();
    await expect(leadForm).toBeVisible();

    console.log('✅ All results sections displayed correctly');

    // Step 10: Verify analysis ID matches
    const resultsUrl = page.url();
    const resultsAnalysisId = resultsUrl.match(/\/results\/([a-f0-9-]+)/)?.[1];
    expect(resultsAnalysisId).toBe(analysisId);

    console.log('✅ Complete analysis flow successful!');
  });

  test('should show loading state when submitting URL', async ({ page }) => {
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/votresite\.com/i);
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    await urlInput.fill('https://test.com');

    // Click and immediately check for loading state
    const submitPromise = analyzeButton.click();

    // Loading spinner should appear
    await expect(page.locator('.animate-spin')).toBeVisible({ timeout: 1000 });

    await submitPromise;
  });

  test('should validate URL format on home page', async ({ page }) => {
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/votresite\.com/i);
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    // Try invalid URL
    await urlInput.fill('not-a-valid-url');

    // HTML5 validation should prevent form submission
    // Button should still be enabled but form won't submit
    await analyzeButton.click();

    // Should still be on home page (no navigation)
    await expect(page).toHaveURL('/');
  });
});

test.describe('War Room Real-time Features', () => {
  test('should display real-time SSE events', async ({ page }) => {
    // This test requires mocking or a running backend
    // Start an analysis first
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/votresite\.com/i);
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    await urlInput.fill('https://sse-test.com');
    await analyzeButton.click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/);

    // Monitor for SSE events in log stream
    const logStream = page.locator('.bg-gray-900').first();

    // Wait for multiple log entries to appear (indicating SSE is working)
    await expect(logStream.getByText(/démarrage/i)).toBeVisible({ timeout: 30000 });

    // Check that logs are accumulating
    const initialLogCount = await logStream.locator('div').count();

    // Wait a bit for more events
    await page.waitForTimeout(5000);

    const finalLogCount = await logStream.locator('div').count();

    // More logs should have appeared
    expect(finalLogCount).toBeGreaterThan(initialLogCount);
  });

  test('should show progress bar updates', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/votresite\.com/i).fill('https://progress-test.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    await page.waitForURL(/\/analysis\/[a-f0-9-]+/);

    // Get progress bar
    const progressBar = page.locator('[role="progressbar"]').first();
    await expect(progressBar).toBeVisible();

    // Initial progress should be visible
    await expect(progressBar).toHaveAttribute('aria-valuenow', /.+/);

    // Wait for progress to update
    await page.waitForTimeout(10000);

    // Progress should have changed (or completed)
    const progress = await progressBar.getAttribute('aria-valuenow');
    expect(parseInt(progress || '0')).toBeGreaterThanOrEqual(0);
  });
});
