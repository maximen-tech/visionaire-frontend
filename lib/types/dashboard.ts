// lib/types/dashboard.ts
// TypeScript types matching BE-005 API contracts EXACTLY

export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'IMPLEMENTED';

export type OpportunityType = 'digital_presence' | 'value_creation' | 'business_management';

export type BadgeType = 'first_step' | 'quick_win' | 'time_saver' | 'efficiency_expert' | 'streak_master';

export interface IdentityA1 {
  company_name: string;
  owner_first_name: string | null;
  sector: string;
  size: string;
  tier: string;
}

export interface ScoreA2 {
  digital_presence: number;
  value_creation: number;
  business_management: number;
  overall: number;
}

export interface Gap {
  opportunity_type: OpportunityType;
  hours_per_week: number;
  hours_per_year: number;
  problem_teaser: string;
  complexity_level: number;
  tools_hint: string;
  status: TaskStatus;
  marked_date: string | null;
}

export interface Badge {
  id: string;
  badge_type: BadgeType;
  badge_name: string;
  description: string;
  icon: string; // emoji from backend
  earned_at: string | null; // null = locked
}

export interface ProgressSummary {
  total_tasks: number;
  tasks_not_started: number;
  tasks_in_progress: number;
  tasks_implemented: number;
  completion_percentage: number;
}

export interface MetricsSummary {
  potential_hours_saved_per_week: number;
  potential_hours_saved_per_year: number;
  actual_hours_saved_per_week: number;
  actual_hours_saved_per_year: number;
  estimated_money_saved: number | null;
}

export interface DashboardData {
  analysis_id: string;
  identity_a1: IdentityA1;
  score_a2: ScoreA2;
  top_3_gaps: Gap[];
  progress: ProgressSummary;
  badges: Badge[];
  metrics: MetricsSummary;
}

export interface UpdateProgressRequest {
  opportunity_type: OpportunityType;
  status: TaskStatus;
}

export interface UpdateProgressResponse {
  message: string;
  new_status: TaskStatus;
  badges_earned: Badge[];
}

export interface RecommendationData {
  next_task: Gap;
  reasoning: string;
  priority_score: number;
}

export interface SubscribeRequest {
  email: string;
  frequency: 'weekly' | 'monthly';
  hourly_rate?: number;
}

export interface SubscribeResponse {
  message: string;
  email: string;
  frequency: string;
  next_email_date: string;
}
