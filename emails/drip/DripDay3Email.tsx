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

interface DripDay3EmailProps {
  name: string;
  company: string;
  analysisId: string;
}

/**
 * Day 3 Email: Case Study (Social Proof)
 *
 * Goal: Build credibility, show real results, inspire action
 * Tone: Story-driven, results-focused, relatable
 */
export const DripDay3Email = ({
  name = "Monsieur/Madame",
  company = "votre entreprise",
  analysisId,
}: DripDay3EmailProps) => {
  const resultsUrl = `https://visionai.re/results/${analysisId}`;
  const consultationUrl = `https://visionai.re/contact?source=drip_day3&analysis=${analysisId}`;
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>📈 Comment [Client X] a économisé 200h/an avec l'IA</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>📈 Histoire Vraie: 200h/an Récupérées</Heading>

          <Text style={text}>
            Bonjour {firstName},
          </Text>

          <Text style={text}>
            Je veux partager avec vous l'histoire de <strong>Martin Tremblay</strong>,
            propriétaire d'une PME manufacturière de Québec similaire à {company}.
          </Text>

          <Hr style={hr} />

          <Section style={storySection}>
            <Heading style={storyHeading}>Le Défi de Martin</Heading>
            <Text style={storyText}>
              <em>"Je passais 8 heures par semaine juste à gérer les soumissions clients,
              répondre aux emails, et mettre à jour nos tableaux Excel. J'avais
              l'impression de courir après ma queue."</em>
            </Text>

            <Heading style={storyHeading}>La Solution</Heading>
            <Text style={storyText}>
              En 90 jours, nous avons automatisé:
            </Text>
            <Section style={listSection}>
              <Text style={listItem}>
                ✅ <strong>Génération automatique de soumissions</strong> (économie: 3h/sem)
              </Text>
              <Text style={listItem}>
                ✅ <strong>Réponses email intelligentes</strong> avec IA (économie: 2.5h/sem)
              </Text>
              <Text style={listItem}>
                ✅ <strong>Dashboard temps réel</strong> au lieu d'Excel (économie: 2.5h/sem)
              </Text>
            </Section>

            <Heading style={storyHeading}>Le Résultat</Heading>
            <Section style={resultBox}>
              <Text style={resultText}>
                <strong>200 heures par année récupérées</strong>
                <br />
                <span style={resultSubtext}>
                  Martin consacre maintenant ce temps à développer de nouveaux produits.
                  Son chiffre d'affaires a augmenté de 18% en 6 mois.
                </span>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            <strong>{firstName}, et si c'était votre histoire dans 90 jours?</strong>
          </Text>

          <Text style={text}>
            Votre Blueprint identifie déjà les opportunités. Il ne manque que le plan d'action.
          </Text>

          <Button style={button} href={consultationUrl}>
            Réserver ma consultation gratuite
          </Button>

          <Section style={guaranteeBox}>
            <Text style={guaranteeText}>
              🎁 <strong>Consultation 100% gratuite (30 min)</strong>
            </Text>
            <Text style={guaranteeSubtext}>
              Aucune obligation. Aucune vente forcée. Juste un plan d'action clair
              pour récupérer vos heures perdues.
            </Text>
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

export default DripDay3Email;

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

const storySection = {
  backgroundColor: '#fef3c7',
  margin: '32px 40px',
  padding: '32px 24px',
  borderRadius: '12px',
};

const storyHeading = {
  color: '#78350f',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 12px 0',
};

const storyText = {
  color: '#451a03',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
};

const listSection = {
  margin: '16px 0',
};

const listItem = {
  color: '#451a03',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '8px 0',
};

const resultBox = {
  backgroundColor: '#10b981',
  backgroundImage: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  padding: '24px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  margin: '16px 0 0 0',
};

const resultText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1.4',
};

const resultSubtext = {
  color: '#e0f2fe',
  fontSize: '14px',
  fontWeight: 'normal',
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

const guaranteeBox = {
  backgroundColor: '#f0f9ff',
  margin: '32px 40px',
  padding: '24px',
  borderRadius: '8px',
  textAlign: 'center' as const,
};

const guaranteeText = {
  color: '#0f172a',
  fontSize: '18px',
  margin: '0 0 12px 0',
};

const guaranteeSubtext = {
  color: '#334155',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
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
