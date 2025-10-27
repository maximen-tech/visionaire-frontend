import { Metadata } from 'next';
import Script from 'next/script';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'FAQ - Vision\'AI\'re | Questions fréquentes',
  description: 'Réponses aux questions fréquentes sur Vision\'AI\'re : fonctionnement, tarifs, confidentialité, support technique. Tout ce que vous devez savoir avant de commencer.',
  openGraph: {
    title: 'FAQ - Vision\'AI\'re',
    description: 'Toutes les réponses à vos questions sur Vision\'AI\'re. Fonctionnement, tarifs, confidentialité, support.',
    type: 'website',
  },
};

export default function FAQPage() {
  // Produit (Product) - 7 questions
  const productFAQs = [
    {
      question: "Comment fonctionne exactement l'analyse ?",
      answer: "Notre IA scanne le contenu public de votre site web en quelques minutes. Elle évalue 47 critères essentiels répartis en 4 catégories : présence en ligne, expérience utilisateur, performance technique et visibilité. L'IA identifie automatiquement votre secteur d'activité et votre taille d'entreprise pour comparer vos performances aux standards de votre industrie. Elle classe ensuite les opportunités d'amélioration par impact potentiel et génère un rapport avec vos 3 priorités.",
    },
    {
      question: "Quels types de sites peuvent être analysés ?",
      answer: "Tous les sites web accessibles publiquement, quelle que soit la technologie : WordPress, Shopify, WooCommerce, sites sur mesure, sites vitrines, e-commerce, sites de services. Seules limitations : les sites protégés par mot de passe, les intranets ou les sites en construction non indexables ne peuvent pas être analysés.",
    },
    {
      question: "Quels sont les 47 critères analysés ?",
      answer: "Les critères sont organisés en 4 catégories : Présence en ligne (12 critères) - clarté du message, proposition de valeur, call-to-action, crédibilité. Expérience utilisateur (15 critères) - navigation, lisibilité, formulaires, responsive design, accessibilité. Performance technique (10 critères) - vitesse, optimisation mobile, HTTPS, compatibilité navigateurs. Visibilité (10 critères) - SEO on-page, méta-tags, structure de contenu, rich snippets.",
    },
    {
      question: "L'analyse fonctionne-t-elle pour tous les secteurs d'activité ?",
      answer: "Oui. Notre IA a été entraînée sur des milliers de sites dans différents secteurs : commerce de détail, services B2B, e-commerce, manufacturing, santé, éducation, restauration, immobilier, etc. Les recommandations sont contextualisées selon votre secteur. Par exemple, les priorités pour un restaurant seront différentes de celles d'un cabinet d'avocats.",
    },
    {
      question: "Puis-je analyser plusieurs sites ?",
      answer: "Avec le plan gratuit actuel, vous pouvez analyser un site. Si vous gérez plusieurs sites (multi-enseignes, clients multiples si vous êtes agence), le plan Pro à venir permettra des analyses illimitées avec suivi dans le temps.",
    },
    {
      question: "Combien de temps les résultats restent-ils accessibles ?",
      answer: "Votre rapport est accessible à vie via le lien unique que vous recevez. Nous conservons vos données pendant 12 mois minimum. Après cette période, vous pouvez demander une nouvelle analyse si nécessaire.",
    },
    {
      question: "Puis-je refaire l'analyse après avoir implémenté les recommandations ?",
      answer: "Oui. Actuellement, vous pouvez relancer une nouvelle analyse après avoir fait des modifications. Le plan Pro (à venir) permettra des analyses régulières pour suivre vos progrès dans le temps et comparer les scores.",
    },
  ];

  // Tarifs (Pricing) - 5 questions
  const pricingFAQs = [
    {
      question: "Pourquoi est-ce gratuit ? Où est le piège ?",
      answer: "Il n'y a aucun piège. Notre mission est de rendre l'analyse digitale accessible à toutes les PME, quel que soit leur budget. Le plan gratuit nous permet de démontrer la valeur de notre outil. À terme, nous proposerons un plan Pro avec fonctionnalités avancées (analyses illimitées, analyse concurrentielle, roadmap détaillée) pour les entreprises qui souhaitent aller plus loin. Mais le plan gratuit restera toujours disponible.",
    },
    {
      question: "Vais-je devoir donner ma carte bancaire ?",
      answer: "Non, absolument pas. Aucune information de paiement n'est requise pour utiliser le plan gratuit. Vous entrez juste votre URL et éventuellement votre email si vous souhaitez recevoir vos résultats par mail.",
    },
    {
      question: "Y a-t-il des frais cachés ?",
      answer: "Non. Le service gratuit est 100% gratuit sans frais cachés. Si vous décidez plus tard de passer au plan Pro (quand disponible), les tarifs seront clairement affichés avant tout paiement. Pas de frais d'installation, pas de frais de sortie, pas de frais cachés.",
    },
    {
      question: "Combien coûtera le plan Pro ?",
      answer: "Le tarif du plan Pro n'est pas encore défini. Nous développons actuellement les fonctionnalités avancées et définirons un prix juste basé sur la valeur apportée. Inscrivez-vous à la liste d'attente pour être informé du lancement et bénéficier d'une réduction early-bird.",
    },
    {
      question: "Puis-je obtenir une facture ?",
      answer: "Pour le plan gratuit, pas de facturation (service gratuit). Pour le plan Pro à venir, oui, vous recevrez une facture conforme pour chaque paiement avec votre numéro de TVA intracommunautaire si applicable.",
    },
  ];

  // Confidentialité (Privacy) - 6 questions
  const privacyFAQs = [
    {
      question: "Mes données sont-elles en sécurité ?",
      answer: "Oui. Nous appliquons les meilleures pratiques de sécurité : chiffrement HTTPS/TLS 1.3 pour toutes les communications, chiffrement des bases de données au repos, accès restreint aux données (authentification multi-facteurs pour l'équipe), sauvegardes quotidiennes chiffrées, audits de sécurité trimestriels. Nous sommes conformes RGPD.",
    },
    {
      question: "Que faites-vous de l'URL de mon site et des données collectées ?",
      answer: "Nous analysons uniquement les informations publiques de votre site web (contenu visible par tout visiteur). Ces données sont utilisées exclusivement pour générer votre rapport d'analyse. Nous pouvons utiliser des données anonymisées et agrégées pour améliorer notre IA (ex: \"les sites e-commerce ont en moyenne un score de X\"), mais jamais vos données personnelles ou identifiables.",
    },
    {
      question: "Vendez-vous mes données à des tiers ?",
      answer: "Jamais. Nous ne vendons pas, ne louons pas et ne partageons pas vos données avec des annonceurs, courtiers en données, réseaux sociaux ou concurrents. Nous partageons uniquement avec nos prestataires techniques essentiels (hébergement, email) qui ont signé des accords stricts de confidentialité et sont conformes RGPD.",
    },
    {
      question: "Puis-je supprimer mes données ?",
      answer: "Oui, à tout moment. Vous pouvez demander la suppression complète de vos données (URL analysée, rapport, email si fourni) en envoyant un email à privacy@visionai.re. Suppression effective sous 30 jours maximum (généralement sous 7 jours). C'est votre droit RGPD.",
    },
    {
      question: "Êtes-vous conformes RGPD ?",
      answer: "Oui, Vision'AI're est conforme au Règlement Général sur la Protection des Données (RGPD). Vous avez tous les droits : accès, rectification, suppression, portabilité, opposition. Nos serveurs sont localisés en Europe (France/Allemagne). Consultez notre Politique de Confidentialité complète pour plus de détails.",
    },
    {
      question: "Utilisez-vous des cookies ?",
      answer: "Nous utilisons uniquement des cookies essentiels (nécessaires au fonctionnement du site) et des cookies analytiques (Google Analytics) si vous y consentez. Nous n'utilisons aucun cookie publicitaire ou de tracking intrusif. Vous pouvez gérer vos préférences à tout moment. Consultez notre Politique de Cookies pour plus de détails.",
    },
  ];

  // Technique (Technical) - 7 questions
  const technicalFAQs = [
    {
      question: "Dois-je installer quelque chose sur mon site ?",
      answer: "Non, rien du tout. Notre IA analyse votre site de l'extérieur, comme le ferait un visiteur ou Google. Pas de code à installer, pas de plugin, pas d'accès à votre hébergement. Vous entrez juste votre URL et l'analyse démarre.",
    },
    {
      question: "Mon site est sous mot de passe / en construction. Puis-je l'analyser ?",
      answer: "Malheureusement non. Notre IA analyse uniquement les sites accessibles publiquement. Si votre site est protégé par un mot de passe ou non indexable, l'analyse ne peut pas se faire. Solution temporaire : créez une page de prévisualisation publique ou attendez le lancement officiel pour analyser.",
    },
    {
      question: "L'analyse va-t-elle ralentir ou surcharger mon site ?",
      answer: "Non. Notre IA effectue des requêtes similaires à celles d'un visiteur normal, avec un débit limité pour ne pas impacter vos performances. Nous respectons votre fichier robots.txt et ne surchargeons jamais votre serveur. L'impact est équivalent à 5-10 visiteurs normaux pendant 8 minutes.",
    },
    {
      question: "Puis-je analyser un site en plusieurs langues ?",
      answer: "Oui. Notre IA détecte automatiquement la langue principale de votre site et analyse le contenu dans cette langue. Si votre site est multilingue, l'analyse se concentre sur la langue de la page d'accueil. Pour analyser d'autres versions linguistiques, entrez l'URL de la page d'accueil de cette langue (ex: monsite.com/en/).",
    },
    {
      question: "Que se passe-t-il si l'analyse échoue ou se bloque ?",
      answer: "Si l'analyse échoue (site inaccessible, erreur technique), vous recevez une notification avec la raison de l'échec. Vous pouvez relancer l'analyse gratuitement. Si le problème persiste, contactez support@visionai.re avec l'URL et nous investiguerons rapidement (réponse sous 24h).",
    },
    {
      question: "Puis-je accéder aux données brutes de l'analyse ?",
      answer: "Actuellement, vous recevez un rapport formaté avec les informations essentielles. Le plan Pro (à venir) permettra d'exporter les données complètes au format JSON ou Excel pour intégration dans vos propres outils ou pour analyse approfondie.",
    },
    {
      question: "Proposez-vous une API pour intégrer Vision'AI're dans nos outils ?",
      answer: "Pas encore, mais c'est prévu dans le plan Pro. L'API permettra aux agences et entreprises d'intégrer nos analyses dans leurs workflows existants, tableaux de bord ou systèmes CRM. Inscrivez-vous à la liste d'attente Pro pour être informé du lancement.",
    },
  ];

  // Résultats (Results) - 6 questions
  const resultsFAQs = [
    {
      question: "Les estimations d'impact financier sont-elles fiables ?",
      answer: "Les estimations sont des fourchettes indicatives basées sur des données sectorielles et votre taille d'entreprise. Par exemple, améliorer votre appel à l'action peut augmenter vos conversions de 15-30%, ce qui pour un site générant 100K€/an représente 15-30K€ d'impact potentiel. Ces chiffres ne sont pas des garanties mais des projections réalistes pour vous aider à prioriser et justifier vos investissements.",
    },
    {
      question: "Que faire si je ne suis pas d'accord avec une recommandation ?",
      answer: "Les recommandations de l'IA sont basées sur les meilleures pratiques et les standards de votre secteur, mais vous connaissez votre business mieux que quiconque. Si une recommandation ne vous semble pas pertinente, vous pouvez l'ignorer. Concentrez-vous sur les priorités qui font sens pour votre stratégie. Le rapport est un outil d'aide à la décision, pas un diktat.",
    },
    {
      question: "Puis-je partager mon rapport avec mon équipe ou mon agence ?",
      answer: "Oui, absolument. Vous pouvez partager le lien unique de votre rapport avec qui vous voulez : votre équipe marketing, votre direction, votre agence web, vos développeurs. Le lien reste accessible à vie. Vous pouvez aussi exporter en PDF (plan Pro à venir) pour faciliter le partage.",
    },
    {
      question: "Les recommandations sont-elles techniques ? Vais-je comprendre ?",
      answer: "Non, nous évitons au maximum le jargon technique. Chaque recommandation est expliquée en langage simple avec : le problème identifié, pourquoi c'est important pour votre business, l'impact attendu et les étapes concrètes pour corriger. Si une recommandation nécessite des compétences techniques (ex: optimisation code), nous l'indiquons clairement pour que vous puissiez briefer un développeur.",
    },
    {
      question: "Vais-je recevoir 3 recommandations ou plus ?",
      answer: "Vous recevez toujours vos 3 priorités principales (les plus impactantes). Le rapport complet inclut aussi votre score global, le détail des 47 critères évalués, et votre benchmark sectoriel. Le plan Pro (à venir) débloquera le Top 10 des opportunités pour aller plus loin.",
    },
    {
      question: "Comment savoir si mon score est bon ou mauvais ?",
      answer: "Votre score est contextualisé avec un benchmark sectoriel. Par exemple, un score de 65/100 peut être excellent pour un restaurant local (moyenne secteur: 58) mais moyen pour un e-commerce (moyenne secteur: 72). Nous indiquons clairement si vous êtes en avance, dans la moyenne ou en retard par rapport à votre industrie.",
    },
  ];

  // Support (Support) - 6 questions
  const supportFAQs = [
    {
      question: "Puis-je obtenir de l'aide pour interpréter mon rapport ?",
      answer: "Oui. Si vous avez des questions sur votre rapport, envoyez un email à support@visionai.re avec votre question et le lien de votre rapport. Nous répondons sous 24-48h (jours ouvrés). Le plan Pro (à venir) inclura un appel mensuel de 30 minutes pour accompagnement personnalisé.",
    },
    {
      question: "Pouvez-vous m'aider à implémenter les recommandations ?",
      answer: "Vision'AI're est un outil d'analyse, pas une agence d'implémentation. Cependant, nos recommandations sont conçues pour être actionnables. Vous pouvez les implémenter vous-même (pour les plus simples) ou les utiliser pour briefer votre agence/développeur. Si vous cherchez un prestataire, nous pouvons vous recommander des partenaires qualifiés (sans commission de notre côté).",
    },
    {
      question: "Proposez-vous des formations ou webinaires ?",
      answer: "Pas encore, mais c'est dans notre roadmap. Nous prévoyons de créer des ressources éducatives gratuites (guides, vidéos, webinaires) pour vous aider à comprendre et implémenter les recommandations. Inscrivez-vous à notre newsletter pour être informé.",
    },
    {
      question: "Je suis une agence. Puis-je utiliser Vision'AI're pour mes clients ?",
      answer: "Oui, avec le plan gratuit vous pouvez analyser le site d'un client (avec sa permission). Pour une utilisation professionnelle régulière (analyses multiples, suivi client), le plan Pro sera plus adapté avec analyses illimitées, rapports personnalisables et accès API. Contactez-nous à pro@visionai.re pour discuter de vos besoins.",
    },
    {
      question: "Comment puis-je contacter le support ?",
      answer: "Email : support@visionai.re (réponse sous 24-48h jours ouvrés). Questions confidentialité : privacy@visionai.re. Partenariats : pro@visionai.re. Nous n'avons pas encore de chat en direct, mais c'est prévu pour le plan Pro.",
    },
    {
      question: "Proposez-vous du support en anglais ou autres langues ?",
      answer: "Actuellement, le support est en français uniquement. Le site et l'IA sont prévus pour supporter l'anglais dans les prochains mois. Si vous avez besoin d'aide en anglais urgent, contactez-nous et nous ferons notre possible.",
    },
  ];

  // Divers (Miscellaneous) - 5 questions
  const miscFAQs = [
    {
      question: "Qui a créé Vision'AI're ?",
      answer: "Vision'AI're a été créé par une équipe de spécialistes du digital et de l'IA passionnés par la croissance des PME. Notre objectif : démocratiser l'accès à l'analyse digitale de qualité pour toutes les entreprises, quel que soit leur budget. En savoir plus sur notre page À propos.",
    },
    {
      question: "Comment puis-je rester informé des nouvelles fonctionnalités ?",
      answer: "Inscrivez-vous à notre newsletter (bas de page) ou suivez-nous sur nos réseaux sociaux. Nous communiquons régulièrement sur les nouvelles fonctionnalités, études de cas et conseils digitaux. Fréquence : 2 emails par mois maximum, désabonnement facile.",
    },
    {
      question: "Puis-je donner mon avis ou suggérer des améliorations ?",
      answer: "Absolument ! Nous sommes en amélioration continue et vos retours sont précieux. Envoyez vos suggestions à feedback@visionai.re. Nous lisons chaque email et intégrons les meilleures idées dans notre roadmap. Les fonctionnalités les plus demandées sont priorisées.",
    },
    {
      question: "Êtes-vous une startup ou une entreprise établie ?",
      answer: "Vision'AI're est une jeune entreprise française en phase de lancement. Nous avons déjà analysé 500+ sites et affiné notre IA sur des milliers de pages. Notre focus : croître de manière durable en créant de la valeur réelle pour les PME, pas lever des millions sans produit solide.",
    },
    {
      question: "Avez-vous des success stories ou études de cas ?",
      answer: "Oui ! Plus de 500 PME ont déjà utilisé Vision'AI're pour clarifier leurs priorités digitales. Nous publierons bientôt des études de cas anonymisées sur notre blog. Si vous souhaitez partager votre expérience publiquement (avec votre accord), contactez-nous à stories@visionai.re.",
    },
  ];

  // Combine all FAQs for structured data
  const allFAQs = [
    ...productFAQs,
    ...pricingFAQs,
    ...privacyFAQs,
    ...technicalFAQs,
    ...resultsFAQs,
    ...supportFAQs,
    ...miscFAQs,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* FAQPage Structured Data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }),
        }}
      />

      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Questions fréquentes
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Vous avez des questions ? Nous avons les réponses. Si vous ne trouvez pas ce que vous cherchez, contactez-nous à{' '}
              <a href="mailto:support@visionai.re" className="text-blue-600 underline hover:no-underline">
                support@visionai.re
              </a>
            </p>
          </div>
        </section>
        {/* Section 1: Produit */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="info" className="text-base px-4 py-2">Produit</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Fonctionnement et caractéristiques
              </h2>
            </div>
            <Accordion items={productFAQs} />
          </div>
        </section>

        {/* Section 2: Tarifs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="success" className="text-base px-4 py-2">Tarifs</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Pricing et facturation
              </h2>
            </div>
            <Accordion items={pricingFAQs} />
          </div>
        </section>

        {/* Section 3: Confidentialité */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="warning" className="text-base px-4 py-2">Confidentialité</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Sécurité et protection des données
              </h2>
            </div>
            <Accordion items={privacyFAQs} />
          </div>
        </section>

        {/* Section 4: Technique */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="default" className="text-base px-4 py-2">Technique</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Questions techniques
              </h2>
            </div>
            <Accordion items={technicalFAQs} />
          </div>
        </section>

        {/* Section 5: Résultats */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="info" className="text-base px-4 py-2">Résultats</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Interprétation et utilisation
              </h2>
            </div>
            <Accordion items={resultsFAQs} />
          </div>
        </section>

        {/* Section 6: Support */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="success" className="text-base px-4 py-2">Support</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Aide et accompagnement
              </h2>
            </div>
            <Accordion items={supportFAQs} />
          </div>
        </section>

        {/* Section 7: Divers */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="default" className="text-base px-4 py-2">Divers</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                Autres questions
              </h2>
            </div>
            <Accordion items={miscFAQs} />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contactez-nous à{' '}
              <a href="mailto:support@visionai.re" className="text-blue-600 underline hover:no-underline">
                support@visionai.re
              </a>{' '}
              et nous vous répondrons dans les 24 heures (jours ouvrés). Ou commencez directement votre analyse gratuite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200">
                Analyser mon site maintenant
              </a>
              <a href="mailto:support@visionai.re" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-white text-gray-900 font-medium border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200">
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Vision'AI're</h3>
              <p className="text-gray-400 text-sm">
                Analyse digitale accessible à toutes les PME
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/legal/privacy" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="/legal/terms" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="/legal/cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:support@visionai.re" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="mailto:privacy@visionai.re" className="hover:text-white transition-colors">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Vision'AI're. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
