import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  requestType: string;
}

/**
 * Contact Form Notification Email (Admin)
 *
 * Sent to admin when someone submits the contact form
 */
export const ContactNotificationEmail = ({
  name,
  email,
  company,
  phone,
  subject,
  message,
  requestType,
}: ContactNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de contact: {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📬 Nouveau Message de Contact</Heading>

          <Section style={infoBox}>
            <Text style={infoLabel}>Type de demande</Text>
            <Text style={infoValue}>{requestType}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Informations du Contact</Heading>

            <div style={infoRow}>
              <Text style={infoLabel}>Nom:</Text>
              <Text style={infoValue}>{name}</Text>
            </div>

            <div style={infoRow}>
              <Text style={infoLabel}>Email:</Text>
              <Text style={infoValue}>
                <a href={`mailto:${email}`} style={link}>
                  {email}
                </a>
              </Text>
            </div>

            <div style={infoRow}>
              <Text style={infoLabel}>Entreprise:</Text>
              <Text style={infoValue}>{company}</Text>
            </div>

            <div style={infoRow}>
              <Text style={infoLabel}>Téléphone:</Text>
              <Text style={infoValue}>{phone}</Text>
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Sujet</Heading>
            <Text style={subjectText}>{subject}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h2}>Message</Heading>
            <div style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={actionSection}>
            <Text style={actionText}>
              <strong>Action requise:</strong> Répondre à ce message dans les 24 heures.
            </Text>
            <Text style={actionText}>
              Cliquez sur "Répondre" dans votre client email pour répondre directement à{' '}
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Vision'AI're - Système de Contact
            <br />
            <span style={footerSmall}>
              Cet email a été généré automatiquement par le formulaire de contact.
            </span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactNotificationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#0f172a',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 40px 24px',
  lineHeight: '1.2',
};

const h2 = {
  color: '#0f172a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const section = {
  padding: '0 40px',
  margin: '24px 0',
};

const infoBox = {
  backgroundColor: '#06b6d4',
  backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
  margin: '24px 40px',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center' as const,
};

const infoRow = {
  marginBottom: '12px',
};

const infoLabel = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const infoValue = {
  color: '#0f172a',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
};

const subjectText = {
  color: '#0f172a',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
  padding: '16px 20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  borderLeft: '4px solid #06b6d4',
};

const messageBox = {
  backgroundColor: '#f8fafc',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};

const messageText = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const actionSection = {
  backgroundColor: '#fef3c7',
  padding: '20px',
  margin: '24px 40px',
  borderRadius: '8px',
  borderLeft: '4px solid #f59e0b',
};

const actionText = {
  color: '#78350f',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 40px',
};

const footer = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const footerSmall = {
  fontSize: '12px',
  color: '#94a3b8',
};

const link = {
  color: '#06b6d4',
  textDecoration: 'underline',
};
