// lib/email/drip-campaign.ts
// Email Drip Campaign Sequence Logic (FE-015)

export interface DripEmail {
  day: number;
  templateName: string;
  subject: string;
  description: string;
}

export interface LeadData {
  email: string;
  name: string;
  company: string;
  analysisId: string;
  totalHoursPerYear?: number;
  opportunity?: string;
}

export interface ScheduledEmail {
  email: string;
  templateName: string;
  sendAt: Date;
  data: LeadData;
}

/**
 * Drip Campaign Sequence (4 emails over 14 days)
 *
 * Goal: Convert leads into booked consultations
 * Trigger: Lead form submission on Results page
 */
export const DRIP_SEQUENCE: DripEmail[] = [
  {
    day: 1,
    templateName: 'drip_day1',
    subject: '⏰ Vos résultats Vision\'AI\'re - {{company_name}}',
    description: 'Welcome + Results recap',
  },
  {
    day: 3,
    templateName: 'drip_day3',
    subject: '📈 Comment [Client X] a économisé 200h/an avec l\'IA',
    description: 'Case study (social proof)',
  },
  {
    day: 7,
    templateName: 'drip_day7',
    subject: '⚠️ {{name}}, votre Blueprint expire dans 7 jours',
    description: 'Urgency + scarcity',
  },
  {
    day: 14,
    templateName: 'drip_day14',
    subject: '🎁 DERNIÈRE CHANCE: Consultation gratuite (expire ce soir)',
    description: 'Final offer',
  },
];

/**
 * Calculate send times for all emails in the sequence
 *
 * @param startDate - When the sequence starts (lead conversion time)
 * @returns Array of scheduled emails with send times
 */
export function calculateDripSchedule(
  startDate: Date,
  leadData: LeadData
): ScheduledEmail[] {
  return DRIP_SEQUENCE.map((email) => {
    const sendAt = new Date(startDate);
    sendAt.setDate(sendAt.getDate() + email.day);

    // Send at 10:00 AM EST for optimal open rates
    sendAt.setHours(10, 0, 0, 0);

    return {
      email: leadData.email,
      templateName: email.templateName,
      sendAt,
      data: leadData,
    };
  });
}

/**
 * Personalize email subject line
 *
 * @param subject - Template subject with {{variables}}
 * @param data - Lead data for personalization
 * @returns Personalized subject line
 */
export function personalizeSubject(subject: string, data: LeadData): string {
  return subject
    .replace('{{name}}', data.name.split(' ')[0]) // First name only
    .replace('{{company_name}}', data.company);
}

/**
 * Check if email should be sent based on opt-out status
 * (Placeholder for future unsubscribe tracking)
 *
 * @param email - Recipient email
 * @returns true if email should be sent
 */
export function shouldSendEmail(): boolean {
  // TODO: Check against unsubscribe list in database
  // For now, always return true
  return true;
}

/**
 * Generate unsubscribe token
 *
 * @param email - Recipient email
 * @param analysisId - Analysis ID
 * @returns Base64 token for unsubscribe link
 */
export function generateUnsubscribeToken(email: string, analysisId: string): string {
  const payload = JSON.stringify({ email, analysisId, timestamp: Date.now() });
  return Buffer.from(payload).toString('base64url');
}

/**
 * Parse unsubscribe token
 *
 * @param token - Base64 unsubscribe token
 * @returns Parsed email and analysisId
 */
export function parseUnsubscribeToken(token: string): { email: string; analysisId: string } | null {
  try {
    const payload = Buffer.from(token, 'base64url').toString('utf-8');
    const { email, analysisId } = JSON.parse(payload);
    return { email, analysisId };
  } catch {
    return null;
  }
}
