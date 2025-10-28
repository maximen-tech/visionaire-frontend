import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Vision'AI're - Nous Joindre",
  description: "Contactez l'équipe Vision'AI're pour toute question sur l'analyse de maturité digitale, l'automatisation, ou pour réserver une consultation gratuite.",
  keywords: ["contact", "support", "consultation", "aide", "démo", "question"],
  openGraph: {
    title: "Contact | Vision'AI're",
    description: "Contactez-nous pour toute question",
    url: "https://visionai.re/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Contactez-Nous
          </h1>
          <p className="text-lg text-gray-600">
            Nous sommes là pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-indigo-600 text-4xl mb-4">✉️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Par Email
            </h2>
            <p className="text-gray-700 mb-4">
              Envoyez-nous un email et nous vous répondrons dans les 24 heures.
            </p>
            <a
              href="mailto:contact@visionai.re"
              className="inline-block text-indigo-600 hover:text-indigo-700 font-semibold underline"
            >
              contact@visionai.re
            </a>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-indigo-600 text-4xl mb-4">❓</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Questions Fréquentes
            </h2>
            <p className="text-gray-700 mb-4">
              Consultez notre FAQ pour des réponses immédiates aux questions courantes.
            </p>
            <Link
              href="/faq"
              className="inline-block text-indigo-600 hover:text-indigo-700 font-semibold underline"
            >
              Voir la FAQ
            </Link>
          </div>
        </div>

        {/* Consultation Booking */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Réservez une Consultation Gratuite
          </h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Après votre analyse, discutez de vos résultats avec notre équipe lors d'un appel de 30 minutes. 
            Nous vous aidons à prioriser les actions et à créer un plan d'automatisation sur mesure.
          </p>
          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-3">Lors de la consultation, nous discutons:</h3>
            <ul className="space-y-2 text-indigo-100">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Vos résultats d'analyse en détail</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Priorisation des opportunités selon votre budget</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Outils et solutions adaptés à vos besoins</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Plan d'action concret et réaliste</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-indigo-200 mb-6">
            Pour réserver une consultation, complétez d'abord votre analyse gratuite.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Commencer l'analyse gratuite
          </Link>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Heures d'Ouverture
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Lundi - Vendredi:</span>
              <span>9h00 - 17h00 (HNE)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Samedi - Dimanche:</span>
              <span>Fermé</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            * Les emails reçus en dehors des heures d'ouverture seront traités le prochain jour ouvrable.
          </p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Localisation
          </h2>
          <p className="text-gray-700 text-lg">
            <strong>Vision'AI're</strong><br />
            Québec, Canada
          </p>
          <p className="text-gray-600 mt-4">
            Nous servons les PME partout au Québec et au Canada.
          </p>
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
  );
}
