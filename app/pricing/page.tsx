import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Tarifs - Vision\'AI\'re | Analyse gratuite pour PME',
  description: 'Analyse digitale gratuite pour toutes les PME. Obtenez vos 3 priorités en 10 minutes sans carte bancaire. Des options premium à venir pour aller plus loin.',
  openGraph: {
    title: 'Tarifs - Vision\'AI\'re',
    description: 'Commencez gratuitement. Analyse digitale en 10 minutes sans carte bancaire.',
    type: 'website',
  },
};

export default function PricingPage() {
  const pricingFAQs = [
    {
      question: "Pourquoi est-ce gratuit ?",
      answer: "Notre mission est de rendre l'analyse digitale accessible à toutes les PME, quel que soit leur budget. Nous croyons que chaque entreprise devrait pouvoir connaître ses priorités avant d'investir. Le plan gratuit restera toujours disponible.",
    },
    {
      question: "Y a-t-il une limite d'utilisation pour le plan gratuit ?",
      answer: "Vous pouvez analyser un site web gratuitement. Si vous souhaitez analyser plusieurs sites ou faire des analyses régulières, vous pourrez souscrire au plan Pro quand il sera disponible.",
    },
    {
      question: "Quand le plan Pro sera-t-il disponible ?",
      answer: "Nous développons actuellement les fonctionnalités avancées du plan Pro. Inscrivez-vous à la liste d'attente pour être informé du lancement et bénéficier d'une réduction early-bird.",
    },
    {
      question: "Puis-je essayer le plan Pro avant de m'abonner ?",
      answer: "Oui. Quand le plan Pro sera lancé, nous proposerons une période d'essai gratuite de 14 jours pour que vous puissiez tester toutes les fonctionnalités avancées sans engagement.",
    },
    {
      question: "Les données de mon analyse gratuite seront-elles conservées si je passe en Pro ?",
      answer: "Absolument. Votre historique d'analyses sera conservé et vous pourrez comparer vos progrès dans le temps dès que vous passerez au plan Pro.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
              Commencez gratuitement, évoluez quand vous êtes prêt
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Notre mission est de rendre l'analyse digitale accessible à toutes les PME. C'est pourquoi l'analyse de base est et restera toujours gratuite.
            </p>
          </div>
        </section>
        {/* Pricing Tiers */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Nos tarifs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Tier */}
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <Badge variant="success" className="w-fit mb-2">Gratuit</Badge>
                  <CardTitle>Analyse Gratuite</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">0 $ CAD</span>
                    <span className="text-gray-600 ml-2">/ toujours gratuit</span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Tout ce dont vous avez besoin pour commencer
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Analyse complète en 10 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Identification automatique du secteur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Score de maturité digitale sur 47 critères</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Top 3 priorités d'amélioration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Estimation d'impact financier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Benchmark sectoriel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Rapport accessible à vie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-700 flex-shrink-0">✓</span>
                      <span className="text-gray-700">Support par email</span>
                    </li>
                  </ul>
                  <Link href="/" className="inline-flex items-center justify-center w-full px-8 py-4 text-lg bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200">
                    Analyser mon site maintenant
                  </Link>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    <strong>Idéal pour :</strong> PME qui veulent clarifier leurs priorités digitales sans engagement
                  </p>
                </CardContent>
              </Card>

              {/* Pro Tier */}
              <Card className="border-2 border-blue-600 relative">
                <div className="absolute top-0 right-0 bg-orange-700 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  Bientôt disponible
                </div>
                <CardHeader>
                  <Badge variant="info" className="w-fit mb-2">Pro</Badge>
                  <CardTitle>Vision'AI're Pro</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">À venir</span>
                    <span className="text-gray-600 ml-2">/ tarif non défini</span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Pour aller plus loin dans votre transformation digitale
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Tout du plan Gratuit, plus :
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Analyses illimitées (suivi mensuel)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Top 10 opportunités (au lieu de 3)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Analyse concurrentielle (3 concurrents)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Roadmap priorisée sur 6 mois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Estimation budgétaire détaillée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Recommandations techniques approfondies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Accès API pour intégrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Rapports exportables (PDF, Excel)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Support prioritaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 flex-shrink-0">⭐</span>
                      <span className="text-gray-700">Consultation mensuelle (30 min)</span>
                    </li>
                  </ul>
                  <a href="mailto:pro@visionai.re?subject=Liste%20d%27attente%20Pro" className="inline-flex items-center justify-center w-full px-8 py-4 text-lg bg-white text-blue-600 font-medium border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200">
                    Rejoindre la liste d'attente
                  </a>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    <strong>Idéal pour :</strong> PME en croissance qui veulent un suivi régulier et des insights avancés
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Comparaison détaillée
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Fonctionnalité</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Gratuit</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Pro (À venir)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Durée d'analyse</td>
                    <td className="text-center px-6 py-4">10 minutes</td>
                    <td className="text-center px-6 py-4">15 minutes</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Nombre de priorités</td>
                    <td className="text-center px-6 py-4">Top 3</td>
                    <td className="text-center px-6 py-4">Top 10</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Score de maturité</td>
                    <td className="text-center px-6 py-4">✅</td>
                    <td className="text-center px-6 py-4">✅ Détaillé</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Impact financier</td>
                    <td className="text-center px-6 py-4">Estimation</td>
                    <td className="text-center px-6 py-4">Détaillé par priorité</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Benchmark sectoriel</td>
                    <td className="text-center px-6 py-4">✅</td>
                    <td className="text-center px-6 py-4">✅ + Tendances</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Analyse concurrentielle</td>
                    <td className="text-center px-6 py-4">❌</td>
                    <td className="text-center px-6 py-4">✅ (3 concurrents)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Roadmap priorisée</td>
                    <td className="text-center px-6 py-4">❌</td>
                    <td className="text-center px-6 py-4">✅ (6 mois)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Analyses par mois</td>
                    <td className="text-center px-6 py-4">1 par site</td>
                    <td className="text-center px-6 py-4">Illimitées</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Export PDF/Excel</td>
                    <td className="text-center px-6 py-4">❌</td>
                    <td className="text-center px-6 py-4">✅</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Support</td>
                    <td className="text-center px-6 py-4">Email</td>
                    <td className="text-center px-6 py-4">Prioritaire + Call mensuel</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700 font-semibold">Prix</td>
                    <td className="text-center px-6 py-4 font-bold text-green-700">0 $ CAD</td>
                    <td className="text-center px-6 py-4 font-bold text-blue-600">TBD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section (Pricing-specific) */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Questions sur les tarifs
            </h2>
            <Accordion items={pricingFAQs} />
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Plus de 500 PME nous font confiance
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl mb-2">💼</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">entreprises analysées</div>
              </div>
              <div>
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
                <div className="text-sm text-gray-600">de satisfaction</div>
              </div>
              <div>
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">8 min</div>
                <div className="text-sm text-gray-600">durée moyenne</div>
              </div>
              <div>
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">45K $ CAD</div>
                <div className="text-sm text-gray-600">impact moyen identifié</div>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 italic mb-4">
                    "L'analyse gratuite nous a permis d'identifier nos 3 priorités en quelques minutes. Nous attendons avec impatience le plan Pro pour suivre nos progrès mensuellement."
                  </p>
                  <p className="text-sm text-gray-600">
                    — Thomas Martin, CEO, PME e-commerce (85 employés)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Commencez gratuitement aujourd'hui
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-95">
              Pas besoin de carte bancaire. Pas d'engagement. Juste 10 minutes pour connaître vos 3 priorités digitales avec leur impact financier estimé. Plus de 500 PME ont déjà franchi le pas. Rejoignez-les maintenant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-white">
                Analyser mon site gratuitement
              </Link>
              <a href="mailto:pro@visionai.re?subject=Liste%20d%27attente%20Pro" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white">
                Rejoindre la liste d'attente Pro
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
              <p className="font-bold text-lg mb-4">Vision'AI're</p>
              <p className="text-gray-400 text-sm">
                Analyse digitale accessible à toutes les PME
              </p>
            </div>
            <div>
              <p className="font-semibold mb-4">Produit</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Légal</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/legal/privacy" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="/legal/terms" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="/legal/cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Contact</p>
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
