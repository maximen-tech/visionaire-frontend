import { Metadata } from 'next';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation - Vision\'AI\'re',
  description: 'Conditions générales d\'utilisation de Vision\'AI\'re. CGU et mentions légales.',
  robots: 'noindex, nofollow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-lg text-gray-600">Dernière mise à jour : 26 octobre 2025</p>
        </header>

        <main id="main-content" className="prose prose-lg max-w-none">
          <Alert variant="info" className="mb-8">
            <AlertTitle>En bref</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Service gratuit pour analyser votre site web</li>
                <li>Vous gardez tous les droits sur vos données</li>
                <li>Nous ne garantissons pas de résultats spécifiques</li>
                <li>Vous pouvez arrêter à tout moment</li>
              </ul>
            </AlertDescription>
          </Alert>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              En utilisant Vision'AI're, vous acceptez ces conditions générales d'utilisation, notre Politique de Confidentialité et notre Politique de Cookies.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Qui peut utiliser Vision'AI're ?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <p className="text-gray-700">Vous avez au moins 18 ans</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <p className="text-gray-700">Vous représentez une entreprise légalement constituée</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <p className="text-gray-700">Vous acceptez ces conditions</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Description du service</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Plan Gratuit (actuel)</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Analyse IA de votre site web en 7-10 minutes</li>
                <li>Identification du secteur et de la taille</li>
                <li>Score de maturité digitale (47 critères)</li>
                <li>Top 3 opportunités d'amélioration</li>
                <li>Estimation d'impact financier</li>
                <li>Benchmark sectoriel</li>
                <li>Rapport accessible à vie</li>
                <li>Support par email</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Ce que nous ne garantissons pas</h3>
            <Alert variant="warning" className="mb-4">
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Résultats spécifiques :</strong> Les recommandations sont basées sur l'IA et ne garantissent pas d'augmentation de chiffre d'affaires.</li>
                  <li><strong>Exactitude à 100% :</strong> Notre IA peut faire des erreurs. Les estimations sont indicatives.</li>
                  <li><strong>Disponibilité permanente :</strong> Des maintenances peuvent survenir.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Utilisation du service</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Utilisation autorisée ✓</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700">Analyser votre propre site ou celui d'un client (avec permission)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700">Partager votre rapport avec votre équipe ou direction</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700">Utiliser les recommandations pour améliorer votre site</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Utilisation interdite ✗</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Analyser un site sans permission (spam, concurrents sans accord)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Automatiser les analyses (scraping, bots) sans accord écrit</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Tenter de reverse-engineer notre IA</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Revendre ou redistribuer nos rapports commercialement</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Notre propriété</h3>
                <p className="text-gray-700 mb-2">Vision'AI're détient :</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Code source et algorithme IA</li>
                  <li>Design et interface</li>
                  <li>Marque "Vision'AI're"</li>
                  <li>Méthodologie d'analyse</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Votre propriété</h3>
                <p className="text-gray-700 mb-2">Vous détenez :</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>URL et contenu de votre site</li>
                  <li>Données fournies</li>
                  <li>Contenu du rapport (usage libre)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Limitation de responsabilité</h2>

            <Alert variant="warning" className="mb-6">
              <AlertTitle>IMPORTANT</AlertTitle>
              <AlertDescription>
                Vision'AI're est un outil d'aide à la décision, pas un conseil professionnel.
              </AlertDescription>
            </Alert>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous ne sommes pas responsables de :</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Décisions business prises sur la base de nos recommandations</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Pertes financières liées à l'implémentation</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Erreurs ou imprécisions dans l'analyse IA</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700">Indisponibilité temporaire du service</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Responsabilité maximale :</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Plan Gratuit : 0€ (vous n'avez rien payé)</li>
                <li>Plan Pro : Montant payé au cours des 12 derniers mois</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Résiliation</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Par vous</h3>
            <p className="text-gray-700 mb-4">
              Vous pouvez arrêter d'utiliser Vision'AI're à tout moment. Pour supprimer vos données, envoyez un email à <a href="mailto:privacy@visionai.re" className="text-blue-600 underline hover:no-underline">privacy@visionai.re</a>.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Par nous</h3>
            <p className="text-gray-700 mb-2">Nous pouvons suspendre votre accès si :</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Vous violez ces conditions</li>
              <li>Vous utilisez le service de manière abusive</li>
              <li>Requis par la loi</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Loi applicable</h2>
            <p className="text-gray-700 mb-4">
              Ces conditions sont régies par le droit français.
            </p>
            <p className="text-gray-700">
              <strong>Juridiction compétente :</strong> Tribunaux de France
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Questions sur ces conditions :</strong><br />
              <a href="mailto:legal@visionai.re" className="text-blue-600 underline hover:no-underline">legal@visionai.re</a></p>
              <p className="text-gray-700 mb-2"><strong>Support général :</strong><br />
              <a href="mailto:support@visionai.re" className="text-blue-600 underline hover:no-underline">support@visionai.re</a></p>
              <p className="text-gray-700"><strong>Délai de réponse :</strong> 7 jours ouvrés maximum</p>
            </div>
          </section>

          <Alert variant="success" className="mt-12">
            <AlertTitle>Résumé (TL;DR)</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Service gratuit pour analyser votre site web</li>
                <li>Vous gardez tous vos droits sur vos données</li>
                <li>Nous ne garantissons pas de résultats spécifiques (outil d'aide, pas conseil)</li>
                <li>Utilisation fair-use (pas de spam, pas de copie de notre IA)</li>
                <li>Vous pouvez arrêter à tout moment</li>
                <li>Responsabilité limitée (service gratuit = 0€ max)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </main>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <a href="/" className="text-blue-600 underline hover:no-underline">← Retour à l'accueil</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
