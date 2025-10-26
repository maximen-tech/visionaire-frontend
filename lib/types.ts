// Types pour l'API Vision'AI're

export interface AnalysisStartResponse {
  analysis_id: string;
  status: string;
  message: string;
}

export interface AnalysisStatus {
  analysis_id: string;
  status: "INITIATED" | "RUNNING_A1" | "RUNNING_A2" | "COMPLETE" | "FAILED";
  progress_percentage: number;
  message: string;
}

export interface SSEEvent {
  status: string;
  progress_percentage: number;
  log_message: string;
  timestamp: string;
  phase?: "A1" | "A2" | "SYNTHESIS";
}

export interface IdentityA1 {
  sector: string;
  estimated_size: string;
  tier: string;
}

export interface ScoreA2 {
  score: number;
  benchmark: number;
  interpretation: string;
}

export interface Gap {
  title: string;
  impact_financial_monthly: number;
  ia_opportunity: string;
}

export interface AnalysisResults {
  analysis_id: string;
  status: string;
  url: string;
  identity_a1: IdentityA1;
  score_a2: ScoreA2;
  top_3_gaps: Gap[];
  created_at: string;
  completed_at: string | null;
}

export interface APIError {
  detail: string;
}

export interface LeadConversionRequest {
  analysis_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface LeadConversionResponse {
  lead_id: string;
  analysis_id: string;
  name: string;
  email: string;
  message: string;
  crm_synced: boolean;
}

export interface EmailNotificationRequest {
  email: string;
}

export interface EmailNotificationResponse {
  analysis_id: string;
  email: string;
  message: string;
  status: string;
}
