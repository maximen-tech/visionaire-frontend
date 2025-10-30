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

interface DripDay14EmailProps {
  name: string;
  company: string;
  analysisId: string;
  totalHoursPerYear?: number;
}

/**
 * Day 14 Email: Final Offer (Last Chance)
 *
 * Goal: Final push with maximum urgency, sweetened deal
 * Tone: Direct, honest, last-chance (but respectful)
 */
export const DripDay14Email = ({
  name = "Monsieur/Madame",
  company = "votre entreprise",
  analysisId,
  totalHoursPerYear = 0,
}: DripDay14EmailProps) => {
  const resultsUrl = `https://visionai.re/results/${analysisId}`;
  const consultationUrl = `https://visionai.re/contact?source=drip_day14&analysis=${analysisId}&promo=last_chance`;
  const firstName = name.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>🎁 DERNIÈRE CHANCE: Consultation gratuite (expire ce soir)</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={urgentBanner}>
            <Text style={urgentText}>
              🔥 EXPIRE CE SOIR À MINUIT
            </Text>
          </Section>

          <Heading style={h1}>Dernière Chance, {firstName}</Heading>

          <Text style={text}>
            C'est le dernier email que vous recevrez de ma part concernant votre
            analyse {company}.
          </Text>

          <Text style={text}>
            Je ne vais pas tourner autour du pot:
          </Text>

          <Section style={honestBox}>
            <Text style={honestText}>
              Soit vous prenez action maintenant, soit vous continuez à perdre{' '}
              <strong>{totalHoursPerYear} heures par année</strong>.
            </Text>
            <Text style={honestText}>
              Dans 1 an, vous aurez perdu {totalHoursPerYear} heures de plus.
              <br />
              Dans 3 ans, c'est {totalHoursPerYear * 3} heures de votre vie.
            </Text>
            <Text style={honestText}>
              <strong>Ces heures, vous ne les récupérerez jamais.</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={finalOfferBox}>
            <Heading style={finalOfferHeading}>
              🎁 Offre Spéciale "Dernière Chance"
            </Heading>
            <Text style={finalOfferText}>
              Si vous réservez votre consultation d'ici ce soir (23h59 EST),
              vous recevez:
            </Text>

            <Section style={bonusList}>
              <Text style={bonusItem}>
                🎁 <strong>Consultation gratuite</strong> (30 min - valeur 150 $)
              </Text>
              <Text style={bonusItem}>
                🎁 <strong>Plan d'action détaillé</strong> (PDF personnalisé - valeur 300 $)
              </Text>
              <Text style={bonusItem}>
                🎁 <strong>Liste d'outils recommandés</strong> avec prix (valeur 200 $)
              </Text>
              <Text style={bonusItem}>
                🎁 <strong>15% de réduction</strong> si vous décidez de travailler avec nous
              </Text>
            </Section>

            <Section style={valueBanner}>
              <Text style={valueText}>
                Valeur totale: <span style={strikethrough}>650 $</span>
                <br />
                <span style={freeText}>100% GRATUIT (ce soir seulement)</span>
              </Text>
            </Section>
          </Section>

          <Button style={finalButton} href={consultationUrl}>
            RÉSERVER MA CONSULTATION (Expire ce soir)
          </Button>

          <Section style={guaranteeBox}>
            <Text style={guaranteeHeading}>
              ✅ Garantie 100% Satisfaction
            </Text>
            <Text style={guaranteeText}>
              Si après la consultation vous ne voyez pas comment récupérer
              {totalHoursPerYear > 100 ? ' au moins 50h/an' : ' du temps'}, je vous
              envoie personnellement 100 $ par e-transfer. Aucune question posée.
            </Text>
            <Text style={guaranteeSubtext}>
              (Oui, je suis si confiant que ça.)
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={closingBox}>
            <Text style={closingText}>
              {firstName}, je ne peux pas forcer personne à agir.
            </Text>
            <Text style={closingText}>
              Mais je peux vous dire ceci: <strong>les regrets coûtent plus cher
              que les erreurs</strong>.
            </Text>
            <Text style={closingText}>
              Dans 1 an, vous ne regretterez pas d'avoir essayé.
              <br />
              Mais vous pourriez regretter de ne pas l'avoir fait.
            </Text>
            <Text style={closingText}>
              La décision vous appartient.
            </Text>
          </Section>

          <Button style={finalButton} href={consultationUrl}>
            OUI, je prends ma consultation (GRATUIT)
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            Vision'AI're - L'Architecte du Temps
            <br />
            <a href="https://visionai.re" style={link}>visionai.re</a>
            <br />
            <br />
            <span style={farewellText}>
              Merci d'avoir pris le temps de lire ces emails. Si vous ne réservez pas,
              je vous souhaite sincèrement bonne chance dans vos projets d'automatisation.
            </span>
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

export default DripDay14Email;

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

const urgentBanner = {
  backgroundColor: '#dc2626',
  backgroundImage: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  padding: '20px',
  textAlign: 'center' as const,
};

const urgentText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
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

const honestBox = {
  backgroundColor: '#fef2f2',
  border: '3px solid #dc2626',
  margin: '32px 40px',
  padding: '32px 24px',
  borderRadius: '12px',
};

const honestText = {
  color: '#7f1d1d',
  fontSize: '18px',
  lineHeight: '28px',
  margin: '16px 0',
  fontWeight: '500',
};

const finalOfferBox = {
  backgroundColor: '#10b981',
  backgroundImage: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  margin: '32px 40px',
  padding: '32px 24px',
  borderRadius: '12px',
};

const finalOfferHeading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const finalOfferText = {
  color: '#e0f2fe',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '12px 0',
};

const bonusList = {
  margin: '24px 0',
};

const bonusItem = {
  color: '#ffffff',
  fontSize: '18px',
  lineHeight: '32px',
  margin: '12px 0',
  fontWeight: '600',
};

const valueBanner = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
};

const valueText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
};

const strikethrough = {
  textDecoration: 'line-through',
  opacity: 0.7,
};

const freeText = {
  fontSize: '28px',
  color: '#fef3c7',
  fontWeight: 'bold',
  letterSpacing: '1px',
};

const finalButton = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '20px 32px',
  margin: '32px 40px',
  border: '3px solid #b91c1c',
};

const guaranteeBox = {
  backgroundColor: '#fef3c7',
  border: '2px dashed #f59e0b',
  margin: '32px 40px',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'center' as const,
};

const guaranteeHeading = {
  color: '#78350f',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const guaranteeText = {
  color: '#451a03',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '8px 0',
};

const guaranteeSubtext = {
  color: '#92400e',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '8px 0 0 0',
};

const closingBox = {
  padding: '0 40px',
  margin: '32px 0',
};

const closingText = {
  color: '#334155',
  fontSize: '17px',
  lineHeight: '28px',
  margin: '16px 0',
  fontWeight: '500',
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

const farewellText = {
  color: '#94a3b8',
  fontSize: '13px',
  fontStyle: 'italic',
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
