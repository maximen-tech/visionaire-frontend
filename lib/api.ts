// Service API pour communiquer avec le backend FastAPI

import * as Sentry from "@sentry/nextjs";
import type {
  AnalysisStartResponse,
  AnalysisStatus,
  AnalysisResults,
  LeadConversionRequest,
  LeadConversionResponse,
  EmailNotificationRequest,
  EmailNotificationResponse,
  APIError,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";
const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

/**
 * Démarre une nouvelle analyse
 */
export async function startAnalysis(
  url: string
): Promise<AnalysisStartResponse> {
  try {
    const response = await fetch(`${API_URL}/analysis/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      const errorMessage = error.detail || "Erreur lors du démarrage de l'analyse";

      // Track API error to Sentry
      Sentry.captureException(new Error(errorMessage), {
        tags: {
          api_endpoint: "analysis/start",
          status_code: response.status,
        },
        extra: {
          url,
          error_detail: error.detail,
        },
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Track unexpected errors
    Sentry.captureException(error, {
      tags: {
        api_endpoint: "analysis/start",
        error_type: "fetch_error",
      },
      extra: { url },
    });
    throw error;
  }
}

/**
 * Récupère le statut d'une analyse (polling)
 */
export async function getAnalysisStatus(
  analysisId: string
): Promise<AnalysisStatus> {
  try {
    const response = await fetch(`${API_URL}/analysis/${analysisId}/status`);

    if (!response.ok) {
      const error: APIError = await response.json();
      const errorMessage = error.detail || "Erreur lors de la récupération du statut";

      Sentry.captureException(new Error(errorMessage), {
        tags: {
          api_endpoint: "analysis/status",
          status_code: response.status,
        },
        extra: {
          analysis_id: analysisId,
          error_detail: error.detail,
        },
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        api_endpoint: "analysis/status",
        error_type: "fetch_error",
      },
      extra: { analysis_id: analysisId },
    });
    throw error;
  }
}

/**
 * Récupère les résultats complets d'une analyse
 */
export async function getAnalysisResults(
  analysisId: string
): Promise<AnalysisResults> {
  try {
    const response = await fetch(
      `${API_URL}/analysis/${analysisId}/results-summary`
    );

    if (!response.ok) {
      const error: APIError = await response.json();
      const errorMessage = error.detail || "Erreur lors de la récupération des résultats";

      Sentry.captureException(new Error(errorMessage), {
        tags: {
          api_endpoint: "analysis/results",
          status_code: response.status,
        },
        extra: {
          analysis_id: analysisId,
          error_detail: error.detail,
        },
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        api_endpoint: "analysis/results",
        error_type: "fetch_error",
      },
      extra: { analysis_id: analysisId },
    });
    throw error;
  }
}

/**
 * Retourne l'URL du stream SSE pour une analyse
 */
export function getSSEStreamURL(analysisId: string): string {
  return `${API_URL}/analysis/${analysisId}/stream`;
}

/**
 * Convertit un lead en CRM
 */
export async function convertLead(
  data: LeadConversionRequest
): Promise<LeadConversionResponse> {
  try {
    const response = await fetch(`${API_URL}/leads/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      const errorMessage = error.detail || "Erreur lors de la conversion du lead";

      Sentry.captureException(new Error(errorMessage), {
        tags: {
          api_endpoint: "leads/convert",
          status_code: response.status,
        },
        extra: {
          analysis_id: data.analysis_id,
          email: data.email,
          error_detail: error.detail,
        },
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        api_endpoint: "leads/convert",
        error_type: "fetch_error",
      },
      extra: {
        analysis_id: data.analysis_id,
        email: data.email,
      },
    });
    throw error;
  }
}

/**
 * Active la notification email pour une analyse
 */
export async function enableEmailNotification(
  analysisId: string,
  data: EmailNotificationRequest
): Promise<EmailNotificationResponse> {
  try {
    const response = await fetch(`${API_URL}/analysis/${analysisId}/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      const errorMessage = error.detail || "Erreur lors de l'activation de la notification";

      Sentry.captureException(new Error(errorMessage), {
        tags: {
          api_endpoint: "analysis/notify",
          status_code: response.status,
        },
        extra: {
          analysis_id: analysisId,
          email: data.email,
          error_detail: error.detail,
        },
      });

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        api_endpoint: "analysis/notify",
        error_type: "fetch_error",
      },
      extra: {
        analysis_id: analysisId,
        email: data.email,
      },
    });
    throw error;
  }
}
