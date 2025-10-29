/**
 * Analytics Utility Library
 *
 * Centralized analytics tracking for Google Analytics 4 (GA4)
 *
 * Event Taxonomy:
 * - page_view: Automatic page views
 * - analysis_start: User submits URL for analysis
 * - analysis_progress: Waiting room progress updates
 * - analysis_complete: Analysis finishes successfully
 * - valorization_calculate: User calculates monetary value
 * - lead_submit: User submits lead form
 * - action_*: User interactions (copy, scroll, etc.)
 *
 * Usage:
 * - trackEvent('event_name', { param1: value1, ... })
 * - trackPageView('/page-path')
 */

// Type definitions for GA4 events
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// GA4 Measurement ID (set via environment variable)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return Boolean(
    GA_MEASUREMENT_ID &&
    typeof window !== 'undefined' &&
    window.gtag
  );
};

/**
 * Track a custom event
 *
 * @param eventName - Name of the event (snake_case)
 * @param parameters - Event parameters (optional)
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (!isAnalyticsEnabled()) {
    console.log('[Analytics Debug]', eventName, parameters);
    return;
  }

  try {
    window.gtag!('event', eventName, parameters);
    console.log('[Analytics]', eventName, parameters);
  } catch (error) {
    console.error('[Analytics Error]', error);
  }
};

/**
 * Track page view
 *
 * @param path - Page path (e.g., '/waiting-room/123')
 * @param title - Page title (optional)
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsEnabled()) {
    console.log('[Analytics Debug] Page View:', path, title);
    return;
  }

  try {
    window.gtag!('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
    console.log('[Analytics] Page View:', path, title);
  } catch (error) {
    console.error('[Analytics Error]', error);
  }
};

// ========================================
// HOME PAGE EVENTS
// ========================================

/**
 * Track when user submits URL for analysis
 */
export const trackAnalysisStart = (url: string): void => {
  trackEvent('analysis_start', {
    url_domain: new URL(url).hostname,
    event_category: 'engagement',
    event_label: 'analysis_submission',
  });
};

/**
 * Track URL input focus (user intent)
 */
export const trackURLInputFocus = (): void => {
  trackEvent('url_input_focus', {
    event_category: 'engagement',
    event_label: 'intent_signal',
  });
};

/**
 * Track URL validation error
 */
export const trackURLValidationError = (errorType: string): void => {
  trackEvent('url_validation_error', {
    error_type: errorType,
    event_category: 'error',
    event_label: 'validation_failed',
  });
};

// ========================================
// WAITING ROOM EVENTS
// ========================================

/**
 * Track waiting room entry
 */
export const trackWaitingRoomEnter = (analysisId: string): void => {
  trackEvent('waiting_room_enter', {
    analysis_id: analysisId,
    event_category: 'navigation',
    event_label: 'waiting_room',
  });
};

/**
 * Track analysis progress updates
 */
export const trackAnalysisProgress = (
  analysisId: string,
  progress: number,
  phase: string
): void => {
  trackEvent('analysis_progress', {
    analysis_id: analysisId,
    progress_percentage: progress,
    phase: phase,
    event_category: 'engagement',
    event_label: `phase_${phase}`,
  });
};

/**
 * Track analysis completion
 */
export const trackAnalysisComplete = (
  analysisId: string,
  totalHours: number
): void => {
  trackEvent('analysis_complete', {
    analysis_id: analysisId,
    total_hours_per_year: totalHours,
    event_category: 'conversion',
    event_label: 'analysis_success',
    value: totalHours, // Use hours as value metric
  });
};

/**
 * Track SSE connection events
 */
export const trackSSEEvent = (
  eventType: 'connected' | 'reconnected' | 'disconnected' | 'failed' | 'manual_retry',
  analysisId: string,
  retryAttempt?: number
): void => {
  trackEvent('sse_connection', {
    connection_type: eventType,
    analysis_id: analysisId,
    retry_attempt: retryAttempt,
    event_category: 'technical',
    event_label: eventType,
  });
};

/**
 * Track progressive message phase changes
 */
export const trackMessagePhase = (
  phase: number,
  analysisId: string
): void => {
  trackEvent('message_phase_change', {
    phase_number: phase,
    analysis_id: analysisId,
    event_category: 'engagement',
    event_label: `message_phase_${phase}`,
  });
};

/**
 * Track device performance detection
 *
 * Used for adaptive UX optimization (typewriter speed, animation frame rate)
 */
export const trackDevicePerformance = (
  performanceTier: 'high' | 'medium' | 'low',
  typingSpeed: number,
  deviceMemory: number | null,
  cpuCores: number | null
): void => {
  trackEvent('device_performance', {
    performance_tier: performanceTier,
    typing_speed_ms: typingSpeed,
    device_memory_gb: deviceMemory,
    cpu_cores: cpuCores,
    event_category: 'technical',
    event_label: `performance_${performanceTier}`,
  });
};

// ========================================
// RESULTS PAGE EVENTS
// ========================================

/**
 * Track results page entry
 */
export const trackResultsEnter = (
  analysisId: string,
  totalHours: number
): void => {
  trackEvent('results_enter', {
    analysis_id: analysisId,
    total_hours_per_year: totalHours,
    event_category: 'navigation',
    event_label: 'results_page',
    value: totalHours,
  });
};

/**
 * Track valorization calculation
 */
export const trackValorizationCalculate = (
  analysisId: string,
  hourlyRate: number,
  totalValue: number,
  totalHours: number
): void => {
  trackEvent('valorization_calculate', {
    analysis_id: analysisId,
    hourly_rate: hourlyRate,
    total_value_cad: totalValue,
    total_hours_per_year: totalHours,
    event_category: 'engagement',
    event_label: 'value_calculation',
    value: totalValue,
  });
};

/**
 * Track analysis ID copy to clipboard
 */
export const trackAnalysisIDCopy = (analysisId: string): void => {
  trackEvent('action_copy_analysis_id', {
    analysis_id: analysisId,
    event_category: 'engagement',
    event_label: 'copy_id',
  });
};

/**
 * Track smooth scroll to lead form
 */
export const trackScrollToLeadForm = (analysisId: string): void => {
  trackEvent('action_scroll_to_lead_form', {
    analysis_id: analysisId,
    event_category: 'engagement',
    event_label: 'scroll_cta',
  });
};

/**
 * Track opportunity card interaction
 */
export const trackOpportunityCardView = (
  analysisId: string,
  opportunityType: 'digital_presence' | 'value_creation' | 'business_management',
  hoursPerYear: number
): void => {
  trackEvent('opportunity_card_view', {
    analysis_id: analysisId,
    opportunity_type: opportunityType,
    hours_per_year: hoursPerYear,
    event_category: 'engagement',
    event_label: opportunityType,
  });
};

// ========================================
// LEAD FORM EVENTS
// ========================================

/**
 * Track lead form view
 */
export const trackLeadFormView = (analysisId: string): void => {
  trackEvent('lead_form_view', {
    analysis_id: analysisId,
    event_category: 'engagement',
    event_label: 'form_visible',
  });
};

/**
 * Track lead form field interaction
 */
export const trackLeadFormFieldFocus = (
  fieldName: string,
  analysisId: string
): void => {
  trackEvent('lead_form_field_focus', {
    field_name: fieldName,
    analysis_id: analysisId,
    event_category: 'engagement',
    event_label: `field_${fieldName}`,
  });
};

/**
 * Track lead form submission (CONVERSION EVENT)
 */
export const trackLeadSubmit = (
  analysisId: string,
  opportunitySelected: string,
  totalHoursPerYear?: number,
  totalValueCAD?: number
): void => {
  trackEvent('lead_submit', {
    analysis_id: analysisId,
    opportunity_selected: opportunitySelected,
    total_hours_per_year: totalHoursPerYear,
    total_value_cad: totalValueCAD,
    event_category: 'conversion',
    event_label: 'lead_converted',
    value: totalValueCAD || 0,
  });

  // Also track as GA4 conversion event
  trackEvent('generate_lead', {
    currency: 'CAD',
    value: totalValueCAD || 0,
  });
};

/**
 * Track lead form submission success
 */
export const trackLeadSubmitSuccess = (
  analysisId: string,
  leadId: string
): void => {
  trackEvent('lead_submit_success', {
    analysis_id: analysisId,
    lead_id: leadId,
    event_category: 'conversion',
    event_label: 'submission_success',
  });
};

/**
 * Track lead form submission error
 */
export const trackLeadSubmitError = (
  analysisId: string,
  errorMessage: string
): void => {
  trackEvent('lead_submit_error', {
    analysis_id: analysisId,
    error_message: errorMessage,
    event_category: 'error',
    event_label: 'submission_failed',
  });
};

// ========================================
// ERROR TRACKING
// ========================================

/**
 * Track errors
 */
export const trackError = (
  errorType: string,
  errorMessage: string,
  context?: Record<string, any>
): void => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    ...context,
    event_category: 'error',
    event_label: errorType,
  });
};

// ========================================
// USER TIMING
// ========================================

/**
 * Track timing events (e.g., how long analysis takes)
 */
export const trackTiming = (
  name: string,
  value: number,
  category?: string
): void => {
  trackEvent('timing_complete', {
    name,
    value,
    event_category: category || 'timing',
    event_label: name,
  });
};
