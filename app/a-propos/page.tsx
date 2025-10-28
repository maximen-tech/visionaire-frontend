import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos | Vision'AI're - Experts en Maturité Digitale",
  description: "Vision'AI're aide les PME québécoises à identifier leurs opportunités d'automatisation et à économiser des heures chaque semaine grâce à l'intelligence artificielle.",
  keywords: ["à propos", "équipe", "mission", "vision", "maturité digitale", "automatisation PME", "Québec"],
  openGraph: {
    title: "À Propos | Vision'AI're",
    description: "Experts en analyse de maturité digitale pour PME québécoises",
    url: "https://visionai.re/a-propos",
    type: "website",
  },
};

export default function AboutPage() {
  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vision'AI're",
    "description": "Plateforme d'analyse de maturité digitale pour PME québécoises",
    "url": "https://visionai.re",
    "logo": "https://visionai.re/icons/icon-512x512.png",
    "foundingDate": "2025",
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    },
    "serviceType": ["Analyse de maturité digitale", "Automatisation d'entreprise", "Consulting IA"],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              À Propos de Vision'AI're
            </h1>
            <p className="text-lg text-gray-600">
              Experts en maturité digitale pour PME québécoises
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Notre Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Vision'AI're a pour mission de démocratiser l'automatisation pour les PME québécoises. 
              Nous croyons que chaque entreprise, peu importe sa taille, devrait avoir accès aux 
              outils d'intelligence artificielle pour automatiser ses processus et libérer du temps 
              précieux.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Notre plateforme analyse votre maturité digitale en 2 minutes et identifie des 
              opportunités concrètes d'automatisation, mesurées en heures économisées par semaine.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">
              Comment ça fonctionne?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Analyse Automatisée</h3>
                  <p className="text-indigo-100">
                    Notre IA scanne votre site web et analyse votre présence digitale en profondeur.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Identification d'Opportunités</h3>
                  <p className="text-indigo-100">
                    Nous identifions les tâches manuelles qui peuvent être automatisées dans 3 domaines clés.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Rapport Personnalisé</h3>
                  <p className="text-indigo-100">
                    Recevez un rapport détaillé avec le nombre d'heures économisables et un plan d'action.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-2">Transparence</h3>
                <p className="text-gray-700">
                  Analyse gratuite, sans engagement, avec des résultats clairs et mesurables.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-2">Accessibilité</h3>
                <p className="text-gray-700">
                  Technologie de pointe accessible à toutes les PME, peu importe leur taille.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-2">Impact Réel</h3>
                <p className="text-gray-700">
                  Focus sur des gains tangibles : heures économisées, productivité améliorée.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-2">Innovation</h3>
                <p className="text-gray-700">
                  Utilisation des dernières technologies d'IA pour des analyses précises.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à découvrir votre potentiel d'automatisation?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Analysez votre maturité digitale gratuitement en 2 minutes.
            </p>
            <Link
              href="/"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Commencer l'analyse gratuite
            </Link>
          </div>

          {/* Back to Home */}
          <div className="text-center">
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
