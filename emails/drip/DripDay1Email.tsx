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

interface DripDay1EmailProps {
  name: string;
  company: string;
  analysisId: string;
  totalHoursPerYear?: number;
}

/**
 * Day 1 Email: Welcome + Results Recap
 *
 * Goal: Remind lead of value, encourage them to review results
 * Tone: Friendly, helpful, value-focused
 */
export const DripDay1Email = ({
  name = "Monsieur/Madame",
  company = "votre entreprise",
  analysisId,
  totalHoursPerYear = 0,
}: DripDay1EmailProps) => {
  const resultsUrl = `https://visionai.re/results/${analysisId}`;
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>{`⏰ Vos résultats Vision'AI're - ${company}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>⏰ Vos Résultats Vision'AI're</Heading>

          <Text style={text}>
            Bonjour {firstName},
          </Text>

          <Text style={text}>
            Merci d'avoir pris le temps d'analyser {company} avec Vision'AI're!
          </Text>

          <Text style={text}>
            Pour rappel, notre IA a identifié des opportunités pour récupérer{' '}
            <strong>{totalHoursPerYear} heures par année</strong> grâce à l'automatisation.
          </Text>

          <Section style={highlightBox}>
            <Heading style={highlightHeading}>
              💎 {totalHoursPerYear}h/an récupérables
            </Heading>
            <Text style={highlightSubtext}>
              Soit l'équivalent de {Math.round(totalHoursPerYear / 8)} jours de travail!
            </Text>
          </Section>

          <Text style={text}>
            Votre Blueprint complet vous attend avec:
          </Text>

          <Section style={listSection}>
            <Text style={listItem}>
              🎯 <strong>3 opportunités détaillées</strong> de gain de temps
            </Text>
            <Text style={listItem}>
              📊 <strong>Niveaux de complexité</strong> pour chaque opportunité
            </Text>
            <Text style={listItem}>
              ⏱️ <strong>Temps d'implémentation</strong> estimé
            </Text>
            <Text style={listItem}>
              🛠️ <strong>Outils recommandés</strong> pour automatiser
            </Text>
          </Section>

          <Button style={button} href={resultsUrl}>
            Voir mes résultats complets
          </Button>

          <Hr style={hr} />

          <Section style={questionBox}>
            <Text style={questionText}>
              <strong>Une question? Besoin de clarifications?</strong>
            </Text>
            <Text style={text}>
              Notre équipe est disponible pour vous aider à comprendre vos résultats et
              identifier les premières actions à prendre.
            </Text>
            <Button style={secondaryButton} href="https://visionai.re/contact">
              Parler à un expert
            </Button>
          </Section>

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

export default DripDay1Email;

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

const questionBox = {
  backgroundColor: '#f0f9ff',
  margin: '32px 40px',
  padding: '24px',
  borderRadius: '8px',
};

const questionText = {
  color: '#0f172a',
  fontSize: '18px',
  lineHeight: '26px',
  margin: '0 0 12px 0',
  padding: '0',
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

const unsubscribeLink = {
  color: '#94a3b8',
  fontSize: '12px',
  textDecoration: 'underline',
};
