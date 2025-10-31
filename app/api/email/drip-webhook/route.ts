import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { personalizeSubject, shouldSendEmail } from '@/lib/email/drip-campaign';
import type { LeadData } from '@/lib/email/drip-campaign';
import DripDay1Email from '@/emails/drip/DripDay1Email';
import DripDay3Email from '@/emails/drip/DripDay3Email';
import DripDay7Email from '@/emails/drip/DripDay7Email';
import DripDay14Email from '@/emails/drip/DripDay14Email';

/**
 * POST /api/email/drip-webhook
 *
 * Called by external scheduler (cron job, webhook service, etc.)
 * to send scheduled drip emails
 *
 * Expected payload:
 * {
 *   templateName: 'drip_day1' | 'drip_day3' | 'drip_day7' | 'drip_day14',
 *   leadData: {
 *     email: string,
 *     name: string,
 *     company: string,
 *     analysisId: string,
 *     totalHoursPerYear?: number,
 *     unsubscribeToken: string,
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');

  try {
    const body = await request.json();
    const { templateName, leadData } = body as {
      templateName: string;
      leadData: LeadData & { unsubscribeToken: string };
    };

    // Validation
    if (!templateName || !leadData?.email) {
      return NextResponse.json(
        { error: 'Missing required fields: templateName, leadData' },
        { status: 400 }
      );
    }

    // Check if user opted out
    const canSendEmail = await shouldSendEmail(leadData.email);
    if (!canSendEmail) {
      console.log(`Email skipped (opted out): ${leadData.email}`);
      return NextResponse.json({
        success: true,
        message: 'Email skipped (user opted out)',
        skipped: true,
      });
    }

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service not configured',
          mode: 'development',
        },
        { status: 200 }
      );
    }

    // Generate email content based on template
    let emailHtml = '';
    let subject = '';

    switch (templateName) {
      case 'drip_day1':
        subject = personalizeSubject(
          `⏰ Vos résultats Vision'AI're - {{company_name}}`,
          leadData
        );
        emailHtml = await render(
          DripDay1Email({
            name: leadData.name,
            company: leadData.company,
            analysisId: leadData.analysisId,
            totalHoursPerYear: leadData.totalHoursPerYear,
          })
        );
        break;

      case 'drip_day3':
        subject = '📈 Comment [Client X] a économisé 200h/an avec l\'IA';
        emailHtml = await render(
          DripDay3Email({
            name: leadData.name,
            company: leadData.company,
            analysisId: leadData.analysisId,
          })
        );
        break;

      case 'drip_day7':
        subject = personalizeSubject(
          '⚠️ {{name}}, votre Blueprint expire dans 7 jours',
          leadData
        );
        emailHtml = await render(
          DripDay7Email({
            name: leadData.name,
            company: leadData.company,
            analysisId: leadData.analysisId,
            totalHoursPerYear: leadData.totalHoursPerYear,
          })
        );
        break;

      case 'drip_day14':
        subject = '🎁 DERNIÈRE CHANCE: Consultation gratuite (expire ce soir)';
        emailHtml = await render(
          DripDay14Email({
            name: leadData.name,
            company: leadData.company,
            analysisId: leadData.analysisId,
            totalHoursPerYear: leadData.totalHoursPerYear,
          })
        );
        break;

      default:
        return NextResponse.json({ error: 'Invalid template name' }, { status: 400 });
    }

    // Replace unsubscribe token in email HTML
    emailHtml = emailHtml.replace(
      /{{unsubscribe_token}}/g,
      leadData.unsubscribeToken || ''
    );

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Vision'AI're <noreply@visionai.re>",
      to: [leadData.email],
      subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Drip email sent:', {
      template: templateName,
      to: leadData.email,
      messageId: emailData?.id,
    });

    return NextResponse.json({
      success: true,
      messageId: emailData?.id,
      template: templateName,
      sentTo: leadData.email,
    });
  } catch (error) {
    console.error('Drip webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/drip-webhook
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    message: 'Drip webhook endpoint is active',
    templates: ['drip_day1', 'drip_day3', 'drip_day7', 'drip_day14'],
  });
}
