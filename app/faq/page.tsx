import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | Vision'AI're",
  description: "Réponses aux questions fréquentes sur Vision'AI're : analyse de maturité digitale, opportunités d'automatisation, et comment notre IA peut transformer votre PME.",
  keywords: ["FAQ", "questions fréquentes", "aide", "support", "maturité digitale", "automatisation", "IA"],
  openGraph: {
    title: "FAQ - Questions Fréquentes | Vision'AI're",
    description: "Réponses aux questions fréquentes sur Vision'AI're",
    url: "https://visionai.re/faq",
    type: "website",
  },
};

const faqs = [
  {
    question: "Qu'est-ce que Vision'AI're?",
    answer: "Vision'AI're est une plateforme d'analyse automatisée qui évalue la maturité digitale de votre PME en 2 minutes. Notre IA scanne votre site web et identifie des opportunités d'automatisation concrètes, mesurées en temps économisé (heures par semaine).",
  },
  {
    question: "Comment fonctionne l'analyse?",
    answer: "Notre IA analyse votre site web en 3 étapes : 1) Scan de votre présence digitale, 2) Analyse de vos processus métier, 3) Identification d'opportunités d'automatisation. L'analyse prend environ 2 minutes et vous recevez un rapport détaillé avec des recommandations personnalisées.",
  },
  {
    question: "Est-ce que l'analyse est gratuite?",
    answer: "Oui, l'analyse initiale est 100% gratuite. Vous obtenez un rapport complet avec les heures économisables par semaine dans 3 domaines : présence digitale, création de valeur, et gestion d'entreprise. Aucune carte de crédit requise.",
  },
  {
    question: "Quelles informations dois-je fournir?",
    answer: "Pour l'analyse gratuite, vous avez seulement besoin de l'URL de votre site web. Pour obtenir le rapport détaillé, nous demandons votre nom et email (pour vous l'envoyer). Aucune information sensible ou financière n'est requise.",
  },
  {
    question: "Combien de temps prend l'analyse?",
    answer: "L'analyse complète prend environ 2 minutes. Vous pouvez suivre la progression en temps réel dans notre 'Salle d'Attente Virtuelle' où notre IA vous explique ce qu'elle découvre au fur et à mesure.",
  },
  {
    question: "Quels types d'opportunités détecte Vision'AI're?",
    answer: "Nous identifions 3 catégories d'opportunités : 1) Présence Digitale (SEO, réseaux sociaux, site web), 2) Création de Valeur (automatisation des ventes, marketing), 3) Gestion d'Entreprise (facturation, comptabilité, RH). Chaque opportunité est mesurée en heures économisées par semaine.",
  },
  {
    question: "Est-ce que mes données sont sécurisées?",
    answer: "Absolument. Nous utilisons un chiffrement SSL de niveau bancaire pour toutes les données. Nous ne stockons que l'URL de votre site et votre email. Nous ne vendons jamais vos données à des tiers. Consultez notre politique de confidentialité pour plus de détails.",
  },
  {
    question: "Puis-je obtenir de l'aide pour implémenter les recommandations?",
    answer: "Oui! Après l'analyse, vous pouvez réserver une consultation gratuite de 30 minutes avec notre équipe. Nous discutons de vos résultats et vous aidons à prioriser les actions selon votre budget et vos objectifs.",
  },
  {
    question: "L'outil fonctionne-t-il pour toutes les industries?",
    answer: "Vision'AI're est optimisé pour les PME québécoises dans tous les secteurs : commerce de détail, services professionnels, restauration, santé, construction, etc. Notre IA s'adapte automatiquement à votre secteur d'activité.",
  },
  {
    question: "Comment calculez-vous les heures économisées?",
    answer: "Notre IA compare votre maturité digitale actuelle aux standards de votre industrie. Elle identifie les tâches manuelles automatisables et calcule le temps économisé basé sur des benchmarks de milliers de PME. Les estimations sont conservatives et réalistes.",
  },
];

export default function FAQPage() {
  // Generate FAQ structured data (JSON-LD)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Questions Fréquentes
            </h1>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir sur Vision'AI're
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Prêt à analyser votre maturité digitale?
            </h2>
            <p className="text-indigo-100 mb-6 text-lg">
              Découvrez combien d'heures par semaine vous pouvez économiser grâce à l'automatisation.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Commencer l'analyse gratuite
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Une autre question?{" "}
              <Link
                href="/contact"
                className="text-indigo-600 hover:text-indigo-700 underline font-semibold"
              >
                Contactez-nous
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
