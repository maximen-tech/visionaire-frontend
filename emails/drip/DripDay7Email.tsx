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

interface DripDay7EmailProps {
  name: string;
  company: string;
  analysisId: string;
  totalHoursPerYear?: number;
}

/**
 * Day 7 Email: Urgency + Scarcity
 *
 * Goal: Create FOMO, push for immediate action
 * Tone: Urgent but not aggressive, time-sensitive
 */
export const DripDay7Email = ({
  name = "Monsieur/Madame",
  company = "votre entreprise",
  analysisId,
  totalHoursPerYear = 0,
}: DripDay7EmailProps) => {
  const resultsUrl = `https://visionai.re/results/${analysisId}`;
  const consultationUrl = `https://visionai.re/contact?source=drip_day7&analysis=${analysisId}`;
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>{`⚠️ ${firstName}, votre Blueprint expire dans 7 jours`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={warningBanner}>
            <Text style={warningText}>
              ⚠️ EXPIRATION DANS 7 JOURS
            </Text>
          </Section>

          <Heading style={h1}>Votre Blueprint Expire Bientôt</Heading>

          <Text style={text}>
            {firstName},
          </Text>

          <Text style={text}>
            Je dois être honnête avec vous: <strong>73% des PME</strong> qui reçoivent
            leur analyse ne passent jamais à l'action.
          </Text>

          <Text style={text}>
            Pourquoi? Pas par manque d'intérêt. Mais parce qu'elles attendent le
            "bon moment".
          </Text>

          <Section style={realityBox}>
            <Heading style={realityHeading}>La Dure Réalité</Heading>
            <Text style={realityText}>
              Pendant que vous attendez, vous continuez à perdre{' '}
              <strong>{totalHoursPerYear} heures par année</strong>.
            </Text>
            <Text style={realityText}>
              En 1 mois, c'est {Math.round(totalHoursPerYear / 12)} heures perdues.
              <br />
              En 6 mois, c'est {Math.round(totalHoursPerYear / 2)} heures perdues.
              <br />
              En 1 an, c'est {totalHoursPerYear} heures que vous ne récupérerez jamais.
            </Text>
          </Section>

          <Text style={text}>
            <strong>Mais ce n'est pas obligé d'être votre histoire.</strong>
          </Text>

          <Hr style={hr} />

          <Section style={offerBox}>
            <Heading style={offerHeading}>
              🎁 Offre Limitée: 5 Consultations Restantes
            </Heading>
            <Text style={offerText}>
              Pour novembre 2025, nous acceptons seulement 10 nouveaux clients.
              Il reste <strong style={offerHighlight}>5 places disponibles</strong>.
            </Text>
            <Text style={offerText}>
              Votre Blueprint expire dans 7 jours. Après, vous devrez refaire
              l'analyse complète (au lieu d'un simple appel).
            </Text>
          </Section>

          <Button style={button} href={consultationUrl}>
            Réserver MA consultation (GRATUIT)
          </Button>

          <Section style={benefitsBox}>
            <Text style={benefitsHeading}>
              Que se passe-t-il après la consultation?
            </Text>
            <Section style={listSection}>
              <Text style={listItem}>
                ✅ <strong>Plan d'action personnalisé</strong> (30 min)
              </Text>
              <Text style={listItem}>
                ✅ <strong>Priorités claires</strong> (par où commencer)
              </Text>
              <Text style={listItem}>
                ✅ <strong>Estimation budgétaire</strong> (solutions adaptées à votre budget)
              </Text>
              <Text style={listItem}>
                ✅ <strong>Aucune obligation</strong> (vraiment)
              </Text>
            </Section>
          </Section>

          <Text style={text}>
            {firstName}, ne faites pas partie des 73% qui attendent le "bon moment".
          </Text>

          <Text style={text}>
            Le bon moment, c'est maintenant.
          </Text>

          <Button style={urgentButton} href={consultationUrl}>
            Réserver MAINTENANT (5 places restantes)
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            Vision'AI're - L'Architecte du Temps
            <br />
            <a href="https://visionai.re" style={link}>visionai.re</a>
            <br />
            <br />
            <a href={`https://visionai.re/unsubscribe?token={{unsubscribe_token}}`} style={unsubscribeLink}>
              Se désabonner
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default DripDay7Email;

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

const warningBanner = {
  backgroundColor: '#dc2626',
  padding: '16px',
  textAlign: 'center' as const,
};

const warningText = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '1px',
};

const h1 = {
  color: '#0f172a',
  fontSize: '36px',
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
  margin: '16px 0',
};

const realityBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #fca5a5',
  margin: '32px 40px',
  padding: '24px',
  borderRadius: '12px',
};

const realityHeading = {
  color: '#dc2626',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const realityText = {
  color: '#7f1d1d',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
};

const offerBox = {
  backgroundColor: '#fef3c7',
  border: '3px solid #f59e0b',
  margin: '32px 40px',
  padding: '32px 24px',
  borderRadius: '12px',
  textAlign: 'center' as const,
};

const offerHeading = {
  color: '#78350f',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const offerText = {
  color: '#451a03',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
};

const offerHighlight = {
  color: '#dc2626',
  fontSize: '20px',
};

const benefitsBox = {
  backgroundColor: '#f0f9ff',
  margin: '32px 40px',
  padding: '24px',
  borderRadius: '8px',
};

const benefitsHeading = {
  color: '#0f172a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const listSection = {
  margin: '16px 0',
};

const listItem = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
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
  padding: '16px 32px',
  margin: '32px 40px',
};

const urgentButton = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '18px 32px',
  margin: '32px 40px',
  animation: 'pulse 2s infinite',
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

const unsubscribeLink = {
  color: '#94a3b8',
  fontSize: '12px',
  textDecoration: 'underline',
};
