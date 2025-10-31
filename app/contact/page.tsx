import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Nous sommes là pour répondre à toutes vos questions sur l'automatisation et l'IA pour votre entreprise.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Contact Form + Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form (2 columns) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar (1 column) */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="text-cyan-600 text-3xl mb-3">✉️</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Contact Direct
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Envoyez-nous un email directement
              </p>
              <a
                href="mailto:contact@visionai.re"
                className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm underline"
              >
                contact@visionai.re
              </a>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="text-cyan-600 text-3xl mb-3">❓</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Questions Fréquentes
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Trouvez des réponses immédiates
              </p>
              <Link
                href="/faq"
                className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm underline"
              >
                Consulter la FAQ
              </Link>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="text-cyan-600 text-3xl mb-3">🕐</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Heures d'Ouverture
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Lun - Ven:</span>
                  <span>9h - 17h</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Sam - Dim:</span>
                  <span>Fermé</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                * Réponse sous 24h en semaine
              </p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="text-cyan-600 text-3xl mb-3">📍</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Localisation
              </h3>
              <p className="text-sm text-slate-700 font-semibold">
                Vision'AI're
              </p>
              <p className="text-sm text-slate-600">
                Québec, Canada
              </p>
              <p className="text-xs text-slate-500 mt-3">
                Services disponibles partout au Québec
              </p>
            </div>
          </div>
        </div>

        {/* Consultation CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Transformer Votre Entreprise?
            </h2>
            <p className="text-cyan-50 mb-6 text-lg">
              Commencez par une analyse gratuite de 2 minutes. Découvrez combien d'heures vous pourriez économiser grâce à l'automatisation intelligente.
            </p>
            <div className="bg-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-3">Ce que vous recevrez:</h3>
              <ul className="space-y-2 text-cyan-50 text-left max-w-xl mx-auto">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Analyse personnalisée de votre maturité digitale</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Estimation précise du temps récupérable par an</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Blueprint actionnable avec opportunités priorisées</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">✓</span>
                  <span>Consultation gratuite de 30 minutes (optionnelle)</span>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Commencer l'Analyse Gratuite →
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
