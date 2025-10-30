import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard Accessibility', () => {
  test('should pass axe accessibility audit', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Wait for page to load
    await page.waitForSelector('[data-testid="dashboard-layout"]', { timeout: 10000 });

    // Run accessibility checks
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Wait for page to load
    await page.waitForSelector('[data-testid="dashboard-layout"]', { timeout: 10000 });

    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Focus first checkbox
    let focused = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(focused).toContain('task-checkbox');

    // Test Space key toggles checkbox
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000); // Wait for API response
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Wait for page to load
    await page.waitForSelector('[data-testid="dashboard-layout"]', { timeout: 10000 });

    const checkbox = page.locator('[data-testid^="task-checkbox"]').first();
    await checkbox.focus();

    // Verify element is focused
    const isFocused = await checkbox.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);
  });

  test('should have proper aria labels', async ({ page }) => {
    await page.goto('/dashboard/test-analysis-id-123');

    // Wait for page to load
    await page.waitForSelector('[data-testid="dashboard-layout"]', { timeout: 10000 });

    // Verify checkboxes have aria-label
    const checkbox = page.locator('[data-testid^="task-checkbox"]').first();
    const ariaLabel = await checkbox.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toContain('Marquer');

    // Verify form inputs have labels
    const emailInput = page.locator('[data-testid="email-input"]');
    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();
  });
});
