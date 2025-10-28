import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/WelcomeEmail';
import ResultsReadyEmail from '@/emails/ResultsReadyEmail';

export async function POST(request: NextRequest) {
  // Initialize Resend inside the function to avoid build-time errors
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');

  try {
    const body = await request.json();
    const { type, to, data } = body;

    // Validation
    if (!to || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: to, type' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    let subject = '';
    let emailHtml = '';

    // Generate email based on type
    switch (type) {
      case 'welcome':
        subject = `⏰ Analyse en cours - ${data.companyName} | Vision'AI're`;
        emailHtml = await render(
          WelcomeEmail({
            companyName: data.companyName,
            analysisId: data.analysisId,
            estimatedTime: data.estimatedTime || 10,
          })
        );
        break;

      case 'results_ready':
        subject = `💎 Votre Blueprint est prêt! ${data.totalHoursPerYear}h/an récupérables | Vision'AI're`;
        emailHtml = await render(
          ResultsReadyEmail({
            companyName: data.companyName,
            analysisId: data.analysisId,
            totalHoursPerYear: data.totalHoursPerYear,
            ownerFirstName: data.ownerFirstName,
          })
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Check if Resend API key is configured
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

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Vision\'AI\'re <noreply@visionai.re>',
      to: [to],
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

    return NextResponse.json({
      success: true,
      messageId: emailData?.id,
    });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
