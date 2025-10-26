// Service API pour communiquer avec le backend FastAPI

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
  const response = await fetch(`${API_URL}/analysis/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error: APIError = await response.json();
    throw new Error(error.detail || "Erreur lors du démarrage de l'analyse");
  }

  return response.json();
}

/**
 * Récupère le statut d'une analyse (polling)
 */
export async function getAnalysisStatus(
  analysisId: string
): Promise<AnalysisStatus> {
  const response = await fetch(`${API_URL}/analysis/${analysisId}/status`);

  if (!response.ok) {
    const error: APIError = await response.json();
    throw new Error(
      error.detail || "Erreur lors de la récupération du statut"
    );
  }

  return response.json();
}

/**
 * Récupère les résultats complets d'une analyse
 */
export async function getAnalysisResults(
  analysisId: string
): Promise<AnalysisResults> {
  const response = await fetch(
    `${API_URL}/analysis/${analysisId}/results-summary`
  );

  if (!response.ok) {
    const error: APIError = await response.json();
    throw new Error(
      error.detail || "Erreur lors de la récupération des résultats"
    );
  }

  return response.json();
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
  const response = await fetch(`${API_URL}/leads/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: APIError = await response.json();
    throw new Error(error.detail || "Erreur lors de la conversion du lead");
  }

  return response.json();
}

/**
 * Active la notification email pour une analyse
 */
export async function enableEmailNotification(
  analysisId: string,
  data: EmailNotificationRequest
): Promise<EmailNotificationResponse> {
  const response = await fetch(`${API_URL}/analysis/${analysisId}/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: APIError = await response.json();
    throw new Error(
      error.detail || "Erreur lors de l'activation de la notification"
    );
  }

  return response.json();
}
