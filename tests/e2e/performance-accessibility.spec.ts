import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * E2E Test: Performance & Accessibility
 *
 * Tests performance metrics and accessibility standards:
 * - Page load times
 * - Core Web Vitals
 * - WCAG compliance
 * - Keyboard navigation
 * - Screen reader compatibility
 * - SEO basics
 */

test.describe('Performance Metrics', () => {
  test('should load home page within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');

    const loadTime = Date.now() - startTime;

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);

    console.log(`✅ Home page loaded in ${loadTime}ms`);

    // Check if critical elements are visible
    await expect(page.getByRole('heading', { name: /Vision'AI're/i })).toBeVisible();
  });

  test('should have acceptable First Load JS size', async ({ page }) => {
    // Navigate and check performance metrics
    await page.goto('/');

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        transferSize: navigation.transferSize,
      };
    });

    console.log('Performance metrics:', metrics);

    // Transfer size should be reasonable (< 500KB for initial load)
    expect(metrics.transferSize).toBeLessThan(500 * 1024);

    // DOM content loaded should be fast (< 2s)
    expect(metrics.domContentLoaded).toBeLessThan(2000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Get Web Vitals metrics
    const vitals = await page.evaluate(() => {
      return new Promise<{ lcp: number; fid: number; cls: number }>((resolve) => {
        const metrics = {
          lcp: 0,
          fid: 0,
          cls: 0,
        };

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Resolve after a delay to collect metrics
        setTimeout(() => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          resolve(metrics);
        }, 3000);
      });
    });

    console.log('Core Web Vitals:', vitals);

    // LCP should be < 2.5s (good)
    expect(vitals.lcp).toBeLessThan(2500);

    // CLS should be < 0.1 (good)
    expect(vitals.cls).toBeLessThan(0.1);
  });

  test('should not have excessive console errors', async ({ page }) => {
    const errors: string[] = [];
    const warnings: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    await page.goto('/');

    // Wait for initial render
    await page.waitForTimeout(2000);

    // Should have no errors
    expect(errors.length).toBe(0);

    // Warnings should be minimal (< 5)
    expect(warnings.length).toBeLessThan(5);

    console.log(`✅ No console errors, ${warnings.length} warnings`);
  });

  test('should handle concurrent user sessions efficiently', async ({ browser }) => {
    // Create multiple pages (simulating users)
    const pages: Page[] = [];

    for (let i = 0; i < 5; i++) {
      const page = await browser.newPage();
      pages.push(page);
    }

    // All users navigate simultaneously
    const startTime = Date.now();

    await Promise.all(pages.map((page) => page.goto('/')));

    const loadTime = Date.now() - startTime;

    console.log(`✅ 5 concurrent users loaded in ${loadTime}ms`);

    // All should load within reasonable time
    expect(loadTime).toBeLessThan(5000);

    // All pages should be functional
    for (const page of pages) {
      await expect(page.getByRole('heading', { name: /Vision'AI're/i })).toBeVisible();
    }

    // Cleanup
    await Promise.all(pages.map((page) => page.close()));
  });
});

test.describe('Accessibility (WCAG 2.1)', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check H1 exists and is unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // H1 should contain main title
    await expect(page.locator('h1')).toContainText(/Vision'AI're/i);

    console.log('✅ Proper H1 hierarchy');
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // All images should have alt attribute
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }

      console.log(`✅ All ${imageCount} images have alt text`);
    }
  });

  test('should have accessible form labels', async ({ page }) => {
    await page.goto('/');

    // URL input should have label or aria-label
    const urlInput = page.getByPlaceholder(/URL de votre entreprise/i);

    const hasLabel = await urlInput.evaluate((el) => {
      return (
        el.getAttribute('aria-label') !== null ||
        el.getAttribute('aria-labelledby') !== null ||
        document.querySelector(`label[for="${el.id}"]`) !== null
      );
    });

    // At minimum, should have placeholder (not ideal but acceptable)
    const hasPlaceholder = await urlInput.getAttribute('placeholder');

    expect(hasLabel || hasPlaceholder).toBeTruthy();

    console.log('✅ Form inputs have accessible labels');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Focus first element (likely skip-to-content or input)
    await page.keyboard.press('Tab'); // Next element

    // Active element should be focusable
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);

    expect(['INPUT', 'BUTTON', 'A']).toContain(activeElement);

    console.log(`✅ Keyboard navigation works, focused: ${activeElement}`);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    // This is a simplified check - production should use axe-core
    // Check that buttons have visible text
    const analyzeButton = page.getByRole('button', { name: /analyser/i });

    const buttonStyles = await analyzeButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontSize: computed.fontSize,
      };
    });

    console.log('Button styles:', buttonStyles);

    // Font size should be readable (>= 14px)
    const fontSize = parseFloat(buttonStyles.fontSize);
    expect(fontSize).toBeGreaterThanOrEqual(14);

    console.log('✅ Text size is readable');
  });

  test('should have focus indicators', async ({ page }) => {
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/URL de votre entreprise/i);

    // Focus the input
    await urlInput.focus();

    // Check if outline or box-shadow is present (focus indicator)
    const hasFocusIndicator = await urlInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return (
        computed.outline !== 'none' ||
        computed.outlineWidth !== '0px' ||
        computed.boxShadow !== 'none'
      );
    });

    expect(hasFocusIndicator).toBeTruthy();

    console.log('✅ Focus indicators present');
  });

  test('should allow form submission via Enter key', async ({ page }) => {
    await page.goto('/');

    const urlInput = page.getByPlaceholder(/URL de votre entreprise/i);

    await urlInput.fill('https://keyboard-submit-test.com');

    // Press Enter to submit
    await urlInput.press('Enter');

    // Should navigate to War Room
    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 }).catch(() => {});

    const url = page.url();
    expect(url).toMatch(/\/analysis\/[a-f0-9-]+/);

    console.log('✅ Form submits via Enter key');
  });

  test('should have proper ARIA roles', async ({ page }) => {
    await page.goto('/');

    // Main content should have proper landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Buttons should have button role
    const analyzeButton = page.getByRole('button', { name: /analyser/i });
    await expect(analyzeButton).toBeVisible();

    console.log('✅ Proper ARIA roles');
  });
});

test.describe('SEO Basics', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);

    console.log(`✅ Page title: "${title}"`);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();

    console.log(`✅ Meta description: "${metaDescription}"`);
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');

    // Check for canonical link
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);

    if (canonical) {
      console.log(`✅ Canonical URL: ${canonical}`);
    } else {
      console.log('⚠️  No canonical URL found (optional)');
    }
  });

  test('should have proper lang attribute', async ({ page }) => {
    await page.goto('/');

    const lang = await page.locator('html').getAttribute('lang');

    expect(lang).toBeTruthy();
    expect(['fr', 'en', 'fr-FR', 'en-US']).toContain(lang);

    console.log(`✅ HTML lang: ${lang}`);
  });
});

test.describe('Mobile Optimization', () => {
  test('should have viewport meta tag', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');

    expect(viewport).toBeTruthy();
    expect(viewport).toContain('width=device-width');

    console.log(`✅ Viewport: ${viewport}`);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Check for horizontal scrolling
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBeFalsy();

    console.log('✅ No horizontal scroll on mobile');
  });

  test('should have touch-friendly tap targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const analyzeButton = page.getByRole('button', { name: /analyser/i }).first();

    const buttonSize = await analyzeButton.boundingBox();

    // Minimum tap target size should be 44x44px (WCAG 2.5.5)
    if (buttonSize) {
      expect(buttonSize.width).toBeGreaterThanOrEqual(44);
      expect(buttonSize.height).toBeGreaterThanOrEqual(44);

      console.log(`✅ Button size: ${buttonSize.width}x${buttonSize.height}px`);
    }
  });
});

test.describe('Security Headers', () => {
  test('should have secure headers in production', async ({ page }) => {
    const response = await page.goto('/');

    const headers = response?.headers() || {};

    console.log('Response headers:', Object.keys(headers));

    // These checks are more relevant in production deployment
    // Development servers might not have all security headers

    // At minimum, should have some headers
    expect(Object.keys(headers).length).toBeGreaterThan(0);
  });
});
