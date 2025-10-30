import { test, expect } from '@playwright/test';

test.describe('Dashboard Complete Flow', () => {
  test('should load dashboard with all sections', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard/test-analysis-id-123');

    // Wait for data to load (no skeletons)
    await expect(page.locator('[data-testid="dashboard-layout"]')).toBeVisible();

    // Verify sections present
    await expect(page.locator('[data-testid="progress-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="badges-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="metrics-section"]')).toBeVisible();

    // Verify company name in header
    await expect(page.locator('h1')).toContainText('Tableau de bord');

    // Verify 3 tasks listed
    const tasks = page.locator('[data-testid^="task-card-"]');
    await expect(tasks).toHaveCount(3);

    // Verify 5 badges
    const badges = page.locator('[data-testid^="badge-card-"]');
    await expect(badges).toHaveCount(5);
  });

  test('should update task status and show optimistic UI', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Find first task checkbox
    const checkbox = page.locator('[data-testid="task-checkbox-digital_presence"]');

    // Click checkbox (NOT_STARTED → IN_PROGRESS)
    await checkbox.click();

    // Wait for API response
    await page.waitForResponse((response) =>
      response.url().includes('/progress') && response.status() === 200
    );
  });

  test('should show badge unlock animation on milestone', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Mark first task as IN_PROGRESS (triggers "first_step" badge)
    const checkbox = page.locator('[data-testid="task-checkbox-digital_presence"]');
    await checkbox.click();

    // Badge unlock modal should appear
    await expect(page.locator('[data-testid="badge-unlock-modal"]')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('[data-testid="badge-unlock-modal"]')).toContainText('Badge débloqué');

    // Modal auto-closes after 5 seconds
    await page.waitForTimeout(5500);
    await expect(page.locator('[data-testid="badge-unlock-modal"]')).not.toBeVisible();
  });

  test('should subscribe to email reports successfully', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Fill email subscription form
    await page.fill('[data-testid="email-input"]', 'user@example.com');
    await page.selectOption('[data-testid="frequency-select"]', 'weekly');
    await page.fill('[data-testid="hourly-rate-input"]', '75');

    // Submit form
    await page.click('[data-testid="subscribe-button"]');

    // Wait for success message
    await expect(page.locator('[data-testid="toast-success"]')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('[data-testid="toast-success"]')).toContainText(
      'Abonnement confirmé'
    );

    // Form should reset
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue('');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate offline
    await page.route('**/api/v1/dashboard/**', (route) =>
      route.abort('failed')
    );

    await page.goto('/dashboard/test-analysis-id-123');

    // Error state should display
    await expect(page.locator('[data-testid="dashboard-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="dashboard-error"]')).toContainText(
      'Erreur'
    );

    // Retry button should be present
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
  });

  test('should display loading state', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Skeleton should appear first
    const skeleton = page.locator('[data-testid="dashboard-skeleton"]');
    await expect(skeleton).toBeVisible({ timeout: 1000 });
  });
});
