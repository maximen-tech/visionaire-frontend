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

interface ResultsReadyEmailProps {
  companyName: string;
  analysisId: string;
  totalHoursPerYear: number;
  ownerFirstName?: string;
}

export const ResultsReadyEmail = ({
  companyName = "votre entreprise",
  analysisId,
  totalHoursPerYear = 0,
  ownerFirstName,
}: ResultsReadyEmailProps) => {
  const resultsUrl = `https://visionai.re/results/${analysisId}`;
  const greeting = ownerFirstName ? `Bonjour ${ownerFirstName}` : "Bonjour";

  return (
    <Html>
      <Head />
      <Preview>{`💎 Votre Blueprint est prêt! ${totalHoursPerYear}h/an récupérables - Vision'AI're`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>💎 Votre Blueprint est prêt!</Heading>

          <Text style={text}>
            {greeting},
          </Text>

          <Text style={text}>
            Excellente nouvelle! Notre IA a terminé l'analyse de {companyName} et les résultats sont impressionnants.
          </Text>

          <Section style={highlightBox}>
            <Heading style={highlightHeading}>
              ⏰ {totalHoursPerYear} heures par an récupérables
            </Heading>
            <Text style={highlightSubtext}>
              C'est l'équivalent de {Math.round(totalHoursPerYear / 8)} jours de travail que vous pourriez récupérer!
            </Text>
          </Section>

          <Text style={text}>
            Votre Blueprint détaillé vous révèle:
          </Text>

          <Section style={listSection}>
            <Text style={listItem}>
              🎯 <strong>Vos 3 opportunités principales</strong> de gain de temps
            </Text>
            <Text style={listItem}>
              📊 <strong>Le niveau de complexité</strong> de chaque opportunité
            </Text>
            <Text style={listItem}>
              💰 <strong>La valorisation monétaire</strong> (si vous avez renseigné votre taux horaire)
            </Text>
            <Text style={listItem}>
              ⏱️ <strong>Le temps d'implémentation</strong> solo vs avec un expert IA
            </Text>
          </Section>

          <Button style={button} href={resultsUrl}>
            Voir mon Blueprint complet
          </Button>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Text style={ctaText}>
              <strong>Besoin d'aide pour implémenter ces solutions?</strong>
            </Text>
            <Text style={text}>
              Nos experts IA peuvent vous accompagner pour récupérer ces {totalHoursPerYear} heures en moins de 90 jours.
            </Text>
            <Button style={secondaryButton} href="https://visionai.re/contact">
              Réserver une consultation gratuite
            </Button>
          </Section>

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

export default ResultsReadyEmail;

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

const highlightBox = {
  backgroundColor: '#10b981',
  backgroundImage: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  margin: '32px 40px',
  padding: '32px 24px',
  borderRadius: '12px',
  textAlign: 'center' as const,
};

const highlightHeading = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const highlightSubtext = {
  color: '#e0f2fe',
  fontSize: '16px',
  margin: '0',
};

const listSection = {
  padding: '0 40px',
  margin: '24px 0',
};

const listItem = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
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

const ctaSection = {
  backgroundColor: '#fef3c7',
  margin: '32px 40px',
  padding: '24px',
  borderRadius: '8px',
};

const ctaText = {
  color: '#0f172a',
  fontSize: '18px',
  lineHeight: '26px',
  margin: '0 0 12px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const secondaryButton = {
  backgroundColor: '#0f172a',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  margin: '16px 0 0 0',
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
