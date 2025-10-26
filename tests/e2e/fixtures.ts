import { test as base } from '@playwright/test';

/**
 * Test Fixtures for Vision'AI're E2E Tests
 *
 * Provides reusable test utilities, page objects, and mock data
 */

// Mock data generators
export const mockAnalysisData = {
  createAnalysisResponse: (analysisId: string = 'test-analysis-id') => ({
    analysis_id: analysisId,
    status: 'INITIATED',
    message: 'Analyse initiée avec succès',
  }),

  createResultsData: (analysisId: string = 'test-results-id') => ({
    analysis_id: analysisId,
    status: 'COMPLETE',
    url: 'https://example-company.com',
    identity_a1: {
      sector: 'Services Professionnels',
      estimated_size: '50-100',
      tier: 'Tier 2',
    },
    score_a2: {
      score: 72,
      benchmark: 85,
      interpretation:
        'Votre performance digitale est inférieure au benchmark de votre secteur. Des opportunités d\'amélioration significatives existent.',
    },
    top_3_gaps: [
      {
        title: 'Performance Web Lente',
        impact_financial_monthly: 12000,
        ia_opportunity:
          'Mise en place d\'un monitoring prédictif avec alertes automatiques et optimisation de la stack technique.',
      },
      {
        title: 'Faible Visibilité SEO',
        impact_financial_monthly: 8500,
        ia_opportunity:
          'Optimisation automatisée du contenu et génération de meta-descriptions par IA.',
      },
      {
        title: 'Taux de Conversion Bas',
        impact_financial_monthly: 15000,
        ia_opportunity: 'Personnalisation de l\'expérience utilisateur par machine learning.',
      },
    ],
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
  }),

  createSSEEvent: (
    status: string,
    progress: number,
    phase: string,
    logMessage: string
  ) => ({
    status,
    progress_percentage: progress,
    log_message: logMessage,
    timestamp: new Date().toISOString(),
    phase,
  }),

  createLeadConversionResponse: (
    leadId: string = 'lead-12345',
    analysisId: string = 'test-analysis-id'
  ) => ({
    lead_id: leadId,
    analysis_id: analysisId,
    name: 'Test User',
    email: 'test@example.com',
    message: 'Lead converti et synchronisé avec CRM',
    crm_synced: true,
  }),

  createEmailNotificationResponse: (
    analysisId: string = 'test-analysis-id',
    email: string = 'notify@example.com'
  ) => ({
    analysis_id: analysisId,
    email,
    message: `Notification activée pour ${email}`,
    status: 'RUNNING_A1',
  }),
};

// Page object helpers
export const pageHelpers = {
  /**
   * Submit URL on home page
   */
  submitAnalysisURL: async (page: any, url: string) => {
    await page.goto('/');
    await page.getByPlaceholder(/votresite\.com/i).fill(url);
    await page.getByRole('button', { name: /analyser/i }).click();
    await page.waitForURL(/\/analysis\/[a-f0-9-]+/, { timeout: 10000 });
  },

  /**
   * Navigate to War Room for specific analysis
   */
  goToWarRoom: async (page: any, analysisId: string) => {
    await page.goto(`/analysis/${analysisId}`);
  },

  /**
   * Navigate to Results page
   */
  goToResults: async (page: any, analysisId: string) => {
    await page.goto(`/results/${analysisId}`);
  },

  /**
   * Submit lead form on results page
   */
  submitLeadForm: async (
    page: any,
    data: { name: string; email: string; phone?: string; company?: string }
  ) => {
    await page.getByPlaceholder(/nom/i).fill(data.name);
    await page.getByPlaceholder(/email/i).fill(data.email);

    if (data.phone) {
      const phoneInput = page.getByPlaceholder(/téléphone/i);
      if (await phoneInput.isVisible().catch(() => false)) {
        await phoneInput.fill(data.phone);
      }
    }

    if (data.company) {
      const companyInput = page.getByPlaceholder(/entreprise/i);
      if (await companyInput.isVisible().catch(() => false)) {
        await companyInput.fill(data.company);
      }
    }

    await page.getByRole('button', { name: /envoyer|convertir|confirmer/i }).click();
  },

  /**
   * Activate email notification on War Room
   */
  activateEmailNotification: async (page: any, email: string) => {
    // Try to expand form if it's collapsible
    const emailButton = page.getByRole('button', { name: /email|notification|notifier/i }).first();
    if (await emailButton.isVisible().catch(() => false)) {
      await emailButton.click();
    }

    const emailInput = page.getByPlaceholder(/email/i).last();
    await emailInput.fill(email);

    const submitButton = page.getByRole('button', { name: /envoyer|activer|confirmer/i }).last();
    await submitButton.click();
  },

  /**
   * Wait for SSE event with specific status
   */
  waitForSSEStatus: async (page: any, status: string, timeout: number = 30000) => {
    // This is a simplified version - in real tests, you'd monitor actual SSE events
    await page.waitForSelector(`text=${status}`, { timeout });
  },

  /**
   * Extract analysis ID from current URL
   */
  getAnalysisIdFromURL: (url: string): string | null => {
    const match = url.match(/\/analysis\/([a-f0-9-]+)/);
    return match ? match[1] : null;
  },

  /**
   * Check if element has loading state
   */
  hasLoadingState: async (page: any, selector: string): Promise<boolean> => {
    const element = page.locator(selector).first();
    const hasSpinner = await page.locator('.animate-spin').isVisible().catch(() => false);
    const hasLoadingText = await element.getByText(/.../).isVisible().catch(() => false);
    const isDisabled = await element.getAttribute('disabled').catch(() => null);

    return hasSpinner || hasLoadingText || isDisabled !== null;
  },
};

// API mock helpers
export const apiMocks = {
  /**
   * Mock successful analysis start
   */
  mockAnalysisStart: async (page: any, analysisId: string = 'mock-analysis-id') => {
    await page.route('**/api/v1/analysis/start', async (route: any) => {
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify(mockAnalysisData.createAnalysisResponse(analysisId)),
      });
    });
  },

  /**
   * Mock results endpoint
   */
  mockAnalysisResults: async (page: any, analysisId: string = 'mock-analysis-id') => {
    await page.route('**/api/v1/analysis/*/results-summary', async (route: any) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockAnalysisData.createResultsData(analysisId)),
      });
    });
  },

  /**
   * Mock SSE stream with simulated events
   */
  mockSSEStream: async (page: any, events: any[]) => {
    await page.route('**/api/v1/analysis/*/stream', async (route: any) => {
      const eventStream = events
        .map((event) => `data: ${JSON.stringify(event)}\n\n`)
        .join('');

      await route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: eventStream,
      });
    });
  },

  /**
   * Mock lead conversion success
   */
  mockLeadConversion: async (page: any) => {
    await page.route('**/api/v1/leads/convert', async (route: any) => {
      const postData = route.request().postDataJSON();

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(
          mockAnalysisData.createLeadConversionResponse(
            'mock-lead-id',
            postData.analysis_id
          )
        ),
      });
    });
  },

  /**
   * Mock email notification success
   */
  mockEmailNotification: async (page: any) => {
    await page.route('**/api/v1/analysis/*/notify', async (route: any) => {
      const postData = route.request().postDataJSON();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          mockAnalysisData.createEmailNotificationResponse(
            'mock-analysis-id',
            postData.email
          )
        ),
      });
    });
  },

  /**
   * Mock API error
   */
  mockAPIError: async (page: any, endpoint: string, statusCode: number = 500) => {
    await page.route(endpoint, async (route: any) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Mock API error',
        }),
      });
    });
  },
};

// Custom test fixtures
type TestFixtures = {
  mockAPI: typeof apiMocks;
  helpers: typeof pageHelpers;
  mockData: typeof mockAnalysisData;
};

export const test = base.extend<TestFixtures>({
  mockAPI: async ({}, use) => {
    await use(apiMocks);
  },

  helpers: async ({}, use) => {
    await use(pageHelpers);
  },

  mockData: async ({}, use) => {
    await use(mockAnalysisData);
  },
});

export { expect } from '@playwright/test';
