import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  companyName: string;
  analysisId: string;
  estimatedTime: number;
}

export const WelcomeEmail = ({
  companyName = "votre entreprise",
  analysisId,
  estimatedTime = 10,
}: WelcomeEmailProps) => {
  const analysisUrl = `https://visionai.re/waiting-room/${analysisId}`;

  return (
    <Html>
      <Head />
      <Preview>⏰ Votre analyse Blueprint est en cours - Vision'AI're</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>⏰ Analyse en cours pour {companyName}</Heading>

          <Text style={text}>
            Excellente nouvelle! Notre IA a commencé à dessiner votre Blueprint de temps récupérable.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>
              📊 Temps estimé: <strong>{estimatedTime} minutes</strong>
            </Text>
            <Text style={highlightText}>
              🎯 Analyse de 47 critères de maturité digitale
            </Text>
            <Text style={highlightText}>
              💎 Identification de vos 3 opportunités principales
            </Text>
          </Section>

          <Text style={text}>
            Vous pouvez suivre l'avancement en temps réel sur notre page de suivi:
          </Text>

          <Button style={button} href={analysisUrl}>
            Suivre mon analyse
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            Vision'AI're - L'Architecte du Temps
            <br />
            <a href="https://visionai.re" style={link}>visionai.re</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
  margin: '40px 0',
  padding: '0 40px',
  lineHeight: '1.2',
};

const text = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
};

const highlightBox = {
  backgroundColor: '#f0f9ff',
  borderLeft: '4px solid #06b6d4',
  margin: '24px 40px',
  padding: '16px 20px',
};

const highlightText = {
  color: '#0f172a',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '8px 0',
};

const button = {
  backgroundColor: '#f59e0b',
  borderRadius: '8px',
  color: '#0f172a',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  margin: '24px 40px',
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

const link = {
  color: '#06b6d4',
  textDecoration: 'underline',
};
