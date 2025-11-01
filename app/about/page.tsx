import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'À propos - Vision\'AI\'re | Analyse digitale accessible aux PME',
  description: 'Vision\'AI\'re rend l\'analyse digitale accessible aux PME. Découvrez vos priorités en 10 minutes avec notre IA. Gratuit, rapide et actionable.',
  openGraph: {
    title: 'À propos - Vision\'AI\'re',
    description: 'Vision\'AI\'re rend l\'analyse digitale accessible aux PME. Découvrez vos priorités en 10 minutes avec notre IA.',
    type: 'website',
  },
};

export default function AboutPage() {
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
              Nous rendons l'analyse digitale accessible à toutes les PME
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Trop de PME investissent leur budget digital sans savoir si ce sont les bonnes priorités. Nous avons créé Vision'AI're pour changer ça.
            </p>
          </div>
        </section>
        {/* Section 1: Notre Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Pourquoi Vision'AI're existe
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Chaque semaine, des dizaines de dirigeants de PME nous contactaient avec la même question : "Par où commencer pour améliorer notre présence digitale ?" Les audits traditionnels coûtent entre 5 000 $ CAD et 15 000 $ CAD et prennent plusieurs semaines. Les agences proposent des prestations complètes mais sans priorisation claire. Résultat : beaucoup de PME n'osent pas commencer.
              </p>

              <p>
                Nous avons créé Vision'AI're pour démocratiser l'analyse digitale. Notre conviction : chaque PME devrait pouvoir connaître ses priorités d'amélioration en quelques minutes, gratuitement. Pas pour remplacer l'expertise humaine, mais pour donner un point de départ clair. Pour permettre aux dirigeants de prendre des décisions éclairées et de justifier leurs investissements avec des données concrètes.
              </p>

              <p>
                Aujourd'hui, plus de 500 PME ont utilisé Vision'AI're pour clarifier leur stratégie digitale. Certaines ont implémenté nos recommandations en interne. D'autres ont utilisé notre rapport pour mieux briefer leurs prestataires. Toutes ont gagné du temps et de la clarté. Notre mission est simple : donner à chaque PME les moyens de savoir où elle se situe et quoi améliorer en priorité pour faire croître son chiffre d'affaires.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Le Problème */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Le problème que nous résolvons
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              Les PME sont coincées entre deux options : payer des milliers d'euros pour un audit complet dont elles n'utiliseront que 20%, ou avancer à l'aveugle en copiant leurs concurrents. Les outils gratuits donnent des données techniques incompréhensibles. Les consultants sont trop chers. Il manquait une solution accessible, rapide et actionable.
            </p>
          </div>
        </section>

        {/* Section 3: Notre Approche */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Comment nous le résolvons
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Approche 1 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">⚡</div>
                  <CardTitle>Analyse IA en 10 minutes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Notre IA scanne 47 critères essentiels de maturité digitale</li>
                    <li>• Identification automatique du secteur et benchmark sectoriel</li>
                    <li>• Pas de questionnaire, juste votre URL</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Approche 2 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">🎯</div>
                  <CardTitle>Top 3 priorités, pas une liste interminable</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Nous classons les opportunités par impact potentiel</li>
                    <li>• Seulement les 3 actions les plus importantes</li>
                    <li>• Avec estimation d'impact financier pour chaque priorité</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Approche 3 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">🎁</div>
                  <CardTitle>Gratuit et sans engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Pas de carte bancaire, pas de limite d'utilisation</li>
                    <li>• Votre rapport est accessible à vie</li>
                    <li>• Données sécurisées et conformes RGPD</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4: Nos Valeurs */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Nos valeurs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Value 1 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">🌍</div>
                  <CardTitle>Accessibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Toutes les PME méritent d'accéder à une analyse digitale de qualité, quel que soit leur budget.
                  </p>
                </CardContent>
              </Card>

              {/* Value 2 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">💡</div>
                  <CardTitle>Clarté</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nous traduisons la complexité technique en recommandations actionables. Pas de jargon, juste ce qui compte.
                  </p>
                </CardContent>
              </Card>

              {/* Value 3 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">📈</div>
                  <CardTitle>Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nous ne mesurons pas notre succès au nombre d'analyses, mais à l'impact réel sur le business de nos utilisateurs.
                  </p>
                </CardContent>
              </Card>

              {/* Value 4 */}
              <Card>
                <CardHeader>
                  <div className="text-4xl mb-3">🔍</div>
                  <CardTitle>Transparence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Notre méthodologie, nos limites, nos prix : tout est clair et accessible. Pas de surprise, pas de coût caché.
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
              Prêt à connaître vos priorités ?
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-95">
              Rejoignez les 500+ PME qui ont déjà clarifié leur stratégie digitale. Analyse gratuite en 10 minutes. Sans engagement. Commencez maintenant et découvrez les 3 actions qui auront le plus d'impact sur votre chiffre d'affaires.
            </p>
            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-white">
              Analyser mon site maintenant
            </Link>
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
