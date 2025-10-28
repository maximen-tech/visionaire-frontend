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

// Phase 2: Time-focused API types
export interface TimeOpportunity {
  hours_per_week: number;
  hours_per_year: number;
  problem_teaser: string;
  complexity_level: number; // 1-10
  tools_hint: string;
}

export interface IdentityA1 {
  company_name: string;
  owner_first_name: string | null; // Can be null
  sector: string;
  size: string;
  tier: string;
}

export interface ImplementationTime {
  hours: number;
  description: string;
}

export interface AnalysisResults {
  analysis_id: string;
  status: string;
  url: string;
  identity_a1: IdentityA1;
  digital_presence: TimeOpportunity;
  value_creation: TimeOpportunity;
  business_management: TimeOpportunity;
  total_hours_per_week: number;
  total_hours_per_year: number;
  implementation_time_solo: ImplementationTime;
  implementation_time_expert: ImplementationTime;
  created_at?: string;
  completed_at?: string | null;
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
