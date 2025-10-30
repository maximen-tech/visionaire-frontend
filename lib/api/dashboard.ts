// lib/api/dashboard.ts
// API client functions for dashboard endpoints

import * as Sentry from '@sentry/nextjs';
import type {
  DashboardData,
  UpdateProgressRequest,
  UpdateProgressResponse,
  RecommendationData,
  SubscribeRequest,
  SubscribeResponse,
} from '@/lib/types/dashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_VERSION = 'v1';
const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

/**
 * Fetch dashboard data for an analysis
 */
export async function getDashboard(analysisId: string): Promise<DashboardData> {
  try {
    const response = await fetch(`${API_URL}/dashboard/${analysisId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch dashboard');
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: { api_endpoint: 'dashboard', analysis_id: analysisId },
    });
    throw error;
  }
}

/**
 * Update task progress status
 */
export async function updateProgress(
  analysisId: string,
  data: UpdateProgressRequest
): Promise<UpdateProgressResponse> {
  try {
    const response = await fetch(`${API_URL}/dashboard/${analysisId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update progress');
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: { api_endpoint: 'dashboard/progress', analysis_id: analysisId },
    });
    throw error;
  }
}

/**
 * Get AI-powered next task recommendation
 */
export async function getRecommendation(analysisId: string): Promise<RecommendationData> {
  try {
    const response = await fetch(`${API_URL}/dashboard/${analysisId}/recommendations`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch recommendation');
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: { api_endpoint: 'dashboard/recommendations', analysis_id: analysisId },
    });
    throw error;
  }
}

/**
 * Subscribe to email progress reports
 */
export async function subscribeToReports(
  analysisId: string,
  data: SubscribeRequest
): Promise<SubscribeResponse> {
  try {
    const response = await fetch(`${API_URL}/dashboard/${analysisId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to subscribe');
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: { api_endpoint: 'dashboard/subscribe', analysis_id: analysisId },
    });
    throw error;
  }
}
