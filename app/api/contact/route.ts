import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema, requestTypeLabels, type ContactFormData } from '@/lib/validation/contact-schema';
import ContactNotificationEmail from '@/emails/ContactNotificationEmail';
import { render } from '@react-email/render';

/**
 * POST /api/contact
 *
 * Handle contact form submissions
 * - Validates input with Zod schema
 * - Sends notification email to admin
 * - Sends confirmation email to user
 */
export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');

  try {
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const data: ContactFormData = validationResult.data;

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('[Contact Form] RESEND_API_KEY not configured. Email not sent.');
      console.log('[Contact Form] Submission:', data);

      return NextResponse.json({
        success: true,
        message: 'Contact form received (development mode)',
        mode: 'development',
      });
    }

    // Prepare email content
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@visionai.re';
    const requestTypeLabel = requestTypeLabels[data.requestType];

    // Generate email HTML
    const emailHtml = await render(
      ContactNotificationEmail({
        name: data.name,
        email: data.email,
        company: data.company || 'Non spécifié',
        phone: data.phone || 'Non spécifié',
        subject: data.subject,
        message: data.message,
        requestType: requestTypeLabel,
      })
    );

    // Send notification email to admin
    const { data: emailData, error } = await resend.emails.send({
      from: "Vision'AI're Contact <noreply@visionai.re>",
      to: [adminEmail],
      replyTo: data.email,
      subject: `[Contact] ${requestTypeLabel}: ${data.subject}`,
      html: emailHtml,
    });

    if (error) {
      console.error('[Contact Form] Resend error:', error);
      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: error,
        },
        { status: 500 }
      );
    }

    console.log('[Contact Form] Email sent successfully:', {
      to: adminEmail,
      from: data.email,
      subject: data.subject,
      messageId: emailData?.id,
    });

    // TODO: Send confirmation email to user
    // TODO: Store submission in database for analytics

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageId: emailData?.id,
    });
  } catch (error) {
    console.error('[Contact Form] Error:', error);
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
 * GET /api/contact
 *
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Contact form API is ready',
    configured: !!process.env.RESEND_API_KEY,
  });
}
