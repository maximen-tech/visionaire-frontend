# E2E Testing Guide - Vision'AI're Frontend

Comprehensive guide for running and maintaining End-to-End (E2E) tests using Playwright.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [CI/CD Integration](#cicd-integration)
- [Visual Regression Testing](#visual-regression-testing)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## 🚀 Quick Start

### Prerequisites

1. **Node.js 20.x** installed
2. **Backend API** running on `http://localhost:8000` (for integration tests)
3. **Frontend** running on `http://localhost:3000`

### Installation

```bash
# Install dependencies (includes Playwright)
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Run Your First Test

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Run tests
npm run test:e2e
```

---

## 📁 Test Structure

```
tests/
└── e2e/
    ├── analysis-flow.spec.ts          # Complete user journey tests
    ├── error-handling.spec.ts         # Error scenarios & edge cases
    ├── lead-conversion.spec.ts        # Lead form & CRM integration
    ├── email-notification.spec.ts     # Email notification feature
    ├── performance-accessibility.spec.ts  # Performance & a11y tests
    ├── visual-regression.spec.ts      # Visual snapshot tests
    └── fixtures.ts                    # Shared test utilities & mocks
```

### Test Coverage

| Test Suite | Focus Area | Test Count | Avg Duration |
|------------|-----------|------------|--------------|
| `analysis-flow` | Complete user flow | 5 tests | 2-15 min |
| `error-handling` | Error states & validation | 12 tests | 1-3 min |
| `lead-conversion` | CRM integration | 8 tests | 1-2 min |
| `email-notification` | Email fallback | 9 tests | 1-2 min |
| `performance-accessibility` | Performance & a11y | 18 tests | 2-4 min |
| `visual-regression` | Visual snapshots | 13 tests | 2-3 min |

**Total:** ~65 E2E tests

---

## 🎯 Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (visible browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug

# View HTML report
npm run test:e2e:report
```

### Advanced Usage

```bash
# Run specific test file
npx playwright test tests/e2e/analysis-flow.spec.ts

# Run tests matching pattern
npx playwright test --grep "lead conversion"

# Run tests on specific browser
npx playwright test --project=chromium

# Run with specific number of workers
npx playwright test --workers=2

# Update visual snapshots
npx playwright test --update-snapshots
```

### Test Modes

| Mode | Command | Use Case |
|------|---------|----------|
| **Headless** | `npm run test:e2e` | CI/CD, fast local testing |
| **Headed** | `npm run test:e2e:headed` | Debugging, visual verification |
| **UI Mode** | `npm run test:e2e:ui` | Interactive development |
| **Debug** | `npm run test:e2e:debug` | Step-by-step debugging |
| **Codegen** | `npm run test:e2e:codegen` | Generate test code |

---

## ✍️ Writing Tests

### Basic Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // 1. Navigate
    await page.goto('/');

    // 2. Interact
    await page.getByPlaceholder(/URL/).fill('https://example.com');
    await page.getByRole('button', { name: /analyser/i }).click();

    // 3. Assert
    await expect(page).toHaveURL(/\/analysis\/[a-f0-9-]+/);
  });
});
```

### Using Fixtures

```typescript
import { test, expect, mockAnalysisData, pageHelpers, apiMocks } from './fixtures';

test('should submit URL using helper', async ({ page, helpers, mockAPI }) => {
  // Mock API
  await mockAPI.mockAnalysisStart(page, 'test-id-123');

  // Use page helper
  await helpers.submitAnalysisURL(page, 'https://test.com');

  // Verify
  const analysisId = helpers.getAnalysisIdFromURL(page.url());
  expect(analysisId).toBe('test-id-123');
});
```

### Mocking APIs

```typescript
// Mock successful response
await page.route('**/api/v1/analysis/start', async (route) => {
  await route.fulfill({
    status: 202,
    contentType: 'application/json',
    body: JSON.stringify({
      analysis_id: 'mock-id',
      status: 'INITIATED',
      message: 'Success'
    }),
  });
});

// Mock error
await page.route('**/api/v1/analysis/start', (route) => {
  route.abort('failed');
});

// Mock SSE stream
await page.route('**/api/v1/analysis/*/stream', async (route) => {
  const event = `data: ${JSON.stringify({
    status: 'RUNNING_A1',
    progress_percentage: 50,
    log_message: 'Processing...',
    timestamp: new Date().toISOString(),
    phase: 'A1'
  })}\n\n`;

  await route.fulfill({
    status: 200,
    contentType: 'text/event-stream',
    body: event,
  });
});
```

### Best Practices for Writing Tests

1. **Use descriptive test names**
   ```typescript
   ✅ test('should redirect to War Room after submitting URL')
   ❌ test('test 1')
   ```

2. **Use role selectors** (accessible, robust)
   ```typescript
   ✅ page.getByRole('button', { name: /analyser/i })
   ❌ page.locator('#submit-btn')
   ```

3. **Wait for conditions, not timeouts**
   ```typescript
   ✅ await page.waitForURL(/\/analysis/)
   ❌ await page.waitForTimeout(5000)
   ```

4. **Clean up after tests**
   ```typescript
   test.afterEach(async ({ page }) => {
     await page.close();
   });
   ```

5. **Isolate tests** - Each test should be independent

---

## 🔄 CI/CD Integration

Tests run automatically on:
- ✅ Push to `main`, `develop`, `feature/*`, `fix/*`
- ✅ Pull requests to `main` or `develop`
- ✅ Manual workflow dispatch

### GitHub Actions Workflow

Located at `.github/workflows/playwright.yml`

**Features:**
- Parallel execution across 3 shards
- Automatic retry on failure
- Test result artifacts (30-day retention)
- Trace upload on failure
- Merged HTML reports

**View Results:**
1. Go to GitHub Actions tab
2. Click on workflow run
3. Download `playwright-report-merged` artifact
4. Extract and open `index.html`

### Optional: Full Integration Tests

Manually trigger workflow with backend:

```bash
# Via GitHub UI
Actions → Playwright E2E Tests → Run workflow

# Or via gh CLI
gh workflow run playwright.yml
```

This runs tests with:
- PostgreSQL database
- Redis cache
- FastAPI backend
- Celery worker
- Full SSE integration

---

## 📸 Visual Regression Testing

### How It Works

1. **First run:** Creates baseline screenshots
2. **Subsequent runs:** Compares against baselines
3. **Differences:** Highlighted in test report

### Commands

```bash
# Run visual tests
npx playwright test visual-regression.spec.ts

# Update baselines (after intentional UI changes)
npx playwright test visual-regression.spec.ts --update-snapshots

# View visual diff in report
npm run test:e2e:report
```

### Baseline Management

Baselines stored in: `tests/e2e/__screenshots__/`

**When to update baselines:**
- ✅ After intentional design changes
- ✅ After fixing visual bugs
- ✅ When Tailwind/CSS updates cause expected changes
- ❌ Never commit broken baselines

### Visual Test Examples

```typescript
// Full page snapshot
await expect(page).toHaveScreenshot('home-page.png', {
  fullPage: true,
  animations: 'disabled',
});

// Component snapshot
const hero = page.locator('main').first();
await expect(hero).toHaveScreenshot('hero.png');

// With masked dynamic content
await expect(page).toHaveScreenshot('results.png', {
  mask: [page.locator('text=/\\d{4}-\\d{2}-\\d{2}/')], // Mask dates
});
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Tests timing out

**Symptom:** Tests hang or timeout

**Solutions:**
```bash
# Increase timeout in config
timeout: 30 * 1000  # 30 seconds

# Or in specific test
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ...
});
```

#### 2. Backend not running

**Symptom:** API calls fail with connection errors

**Solution:**
```bash
# Terminal 1: Start backend
cd ../visionaire-bff
uvicorn main:app --reload

# Terminal 2: Start worker
celery -A celery_config.celery_app worker --loglevel=info

# Terminal 3: Run tests
npm run test:e2e
```

#### 3. Visual tests failing

**Symptom:** Pixel-perfect diffs detected

**Solutions:**
```bash
# Update baselines if changes are intentional
npm run test:e2e -- --update-snapshots

# Disable animations causing flakiness
animations: 'disabled'

# Mask dynamic content
mask: [page.locator('.timestamp')]
```

#### 4. Port already in use

**Symptom:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process using port 3000
npx kill-port 3000

# Or change port
PORT=3001 npm run dev
```

#### 5. Flaky tests

**Symptom:** Tests pass/fail inconsistently

**Solutions:**
- Use `waitForLoadState('networkidle')` before assertions
- Avoid `waitForTimeout()` - use `waitForSelector()` instead
- Add explicit waits: `await expect(element).toBeVisible()`
- Check for race conditions in async operations

### Debug Commands

```bash
# Run specific test in debug mode
npx playwright test --debug tests/e2e/analysis-flow.spec.ts:10

# Generate trace
npx playwright test --trace on

# Open trace viewer
npx playwright show-trace trace.zip
```

### Verbose Logging

```typescript
// Add console logging
test('debug test', async ({ page }) => {
  page.on('console', msg => console.log('Browser log:', msg.text()));

  await page.goto('/');
  console.log('Current URL:', page.url());
});
```

---

## 🎓 Best Practices

### Test Organization

1. **Group related tests** using `test.describe()`
2. **One assertion focus** per test when possible
3. **Shared setup** in `test.beforeEach()`
4. **Clean up** in `test.afterEach()`

### Performance

1. **Parallel execution:** Tests run concurrently by default
2. **Reuse contexts:** Use `storageState` for authenticated tests
3. **Skip unnecessary waits:** Use smart waits, not timeouts
4. **Mock external dependencies:** Avoid real API calls when possible

### Maintainability

1. **Use Page Object Model** for complex pages
2. **Centralize selectors** in constants or fixtures
3. **Extract common actions** into helper functions (see `fixtures.ts`)
4. **Keep tests focused** - test one thing at a time

### Accessibility

```typescript
// Test keyboard navigation
await page.keyboard.press('Tab');
const activeElement = await page.evaluate(() => document.activeElement?.tagName);
expect(activeElement).toBe('BUTTON');

// Test ARIA labels
const button = page.getByRole('button', { name: /analyser/i });
await expect(button).toBeVisible();
```

### Mobile Testing

```typescript
test.describe('Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should work on mobile', async ({ page }) => {
    // Test mobile-specific behavior
  });
});
```

---

## 📊 Metrics & Reporting

### Test Execution Metrics

```bash
# After running tests
npm run test:e2e:report
```

**HTML Report includes:**
- ✅ Pass/fail status for each test
- ⏱️ Execution time per test
- 📸 Screenshots on failure
- 🎬 Video recordings (if enabled)
- 📊 Trace files for debugging

### CI/CD Metrics

View in GitHub Actions:
- Total tests run
- Pass rate
- Flaky tests detected
- Execution time trends
- Artifact download links

---

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

## 📝 Checklist for New Tests

- [ ] Test has descriptive name
- [ ] Uses role-based selectors
- [ ] No hardcoded waits (`waitForTimeout`)
- [ ] Cleans up resources
- [ ] Independent of other tests
- [ ] Handles async operations properly
- [ ] Added to appropriate test file
- [ ] Documented if complex behavior

---

**Last updated:** 2025-10-26
**Playwright version:** 1.56.1
**Maintained by:** Vision'AI're Development Team
