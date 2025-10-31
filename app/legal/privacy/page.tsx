import { Metadata } from 'next';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Vision\'AI\'re',
  description: 'Politique de confidentialité de Vision\'AI\'re. RGPD compliant. Vos données sont protégées.',
  robots: 'noindex, nofollow',
};

export default function PrivacyPage() {
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
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-gray-600">Dernière mise à jour : 26 octobre 2025</p>
        </header>

        <main id="main-content" className="prose prose-lg max-w-none">
          <Alert variant="info" className="mb-8">
            <AlertTitle>En bref</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nous collectons le minimum nécessaire</li>
                <li>Nous ne vendons jamais vos données</li>
                <li>Vous gardez le contrôle total</li>
                <li>Nous sommes conformes RGPD</li>
              </ul>
            </AlertDescription>
          </Alert>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Qui sommes-nous ?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Responsable du traitement :</strong> Vision'AI're<br />
              <strong>Email :</strong> privacy@visionai.re
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Quelles données collectons-nous ?</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Données que vous nous fournissez</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">URL de votre site web (obligatoire)</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li><strong>Pourquoi :</strong> Pour effectuer l'analyse</li>
                  <li><strong>Durée :</strong> 12 mois</li>
                  <li><strong>Base légale :</strong> Exécution du contrat</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Adresse email (optionnel)</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li><strong>Pourquoi :</strong> Pour vous envoyer vos résultats</li>
                  <li><strong>Durée :</strong> 24 mois ou jusqu'à désinscription</li>
                  <li><strong>Base légale :</strong> Consentement</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Données collectées automatiquement</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Données de navigation (cookies techniques)</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Pages visitées sur visionai.re</li>
                <li>Durée de session</li>
                <li>Type de navigateur et appareil</li>
                <li>Adresse IP (anonymisée après 24h)</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Comment utilisons-nous vos données ?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Effectuer l'analyse de votre site</p>
                  <p className="text-gray-700">Nous scannons votre site pour identifier votre secteur, calculer votre score et générer vos recommandations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Vous envoyer vos résultats</p>
                  <p className="text-gray-700">Si vous fournissez votre email, nous vous envoyons un lien vers votre rapport.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Améliorer notre service</p>
                  <p className="text-gray-700">Nous analysons les données agrégées et anonymisées pour améliorer la précision de notre IA.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Qui a accès à vos données ?</h2>

            <Alert variant="error" className="mb-6">
              <AlertTitle>Nous NE partageons JAMAIS vos données avec :</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2">
                  <li>Annonceurs</li>
                  <li>Courtiers en données</li>
                  <li>Réseaux sociaux</li>
                  <li>Concurrents</li>
                </ul>
              </AlertDescription>
            </Alert>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Partage uniquement avec :</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Prestataires techniques essentiels (RGPD)</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Hébergement : Railway / Vercel (Europe)</li>
                <li>Analytics : Google Analytics 4 (si consentement)</li>
                <li>Tous ont signé des accords de confidentialité stricts</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Vos droits (RGPD)</h2>
            <p className="text-gray-700 mb-4">Vous avez le contrôle total sur vos données :</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">✓ Droit d'accès</p>
                <p className="text-sm text-gray-700">Obtenez une copie de toutes vos données</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">✓ Droit de rectification</p>
                <p className="text-sm text-gray-700">Corrigez les données inexactes</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">✓ Droit à l'effacement</p>
                <p className="text-sm text-gray-700">Supprimez votre compte et vos données</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">✓ Droit de portabilité</p>
                <p className="text-sm text-gray-700">Exportez vos données (format JSON)</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comment exercer vos droits</h3>
              <p className="text-gray-700 mb-2">Envoyez un email à <a href="mailto:privacy@visionai.re" className="text-blue-600 underline hover:no-underline">privacy@visionai.re</a> avec :</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Votre email ou URL analysée</li>
                <li>Le droit que vous souhaitez exercer</li>
              </ul>
              <p className="text-gray-700 mt-4"><strong>Délai de réponse :</strong> 30 jours maximum (généralement sous 7 jours)</p>
              <p className="text-gray-700 mt-2"><strong>Recours :</strong> Si vous n'êtes pas satisfait, contactez la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:no-underline">www.cnil.fr</a></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Sécurité de vos données</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900">Chiffrement en transit</p>
                  <p className="text-sm text-gray-700">HTTPS/TLS 1.3</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900">Chiffrement au repos</p>
                  <p className="text-sm text-gray-700">Bases de données chiffrées</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900">Accès restreint</p>
                  <p className="text-sm text-gray-700">Authentification multi-facteurs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900">Sauvegardes</p>
                  <p className="text-sm text-gray-700">Quotidiennes, chiffrées</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies</h2>
            <p className="text-gray-700 mb-4">
              Consultez notre <a href="/legal/cookies" className="text-blue-600 underline hover:no-underline">Politique de Cookies</a> complète.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Résumé :</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Cookies essentiels :</strong> Toujours actifs (fonctionnement du site)</li>
                <li><strong>Cookies analytiques :</strong> Nécessitent votre consentement (Google Analytics)</li>
                <li><strong>Pas de cookies publicitaires</strong></li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Transferts internationaux</h2>
            <p className="text-gray-700 mb-4">
              <strong>Localisation des données :</strong> Union Européenne (France, Allemagne)
            </p>
            <p className="text-gray-700">
              <strong>Transferts hors UE :</strong> Uniquement si vous utilisez Google Analytics (États-Unis). Mécanisme : Clauses contractuelles types (CCT). Vous pouvez refuser via les paramètres cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contact</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Questions sur la confidentialité :</strong><br />
              <a href="mailto:privacy@visionai.re" className="text-blue-600 underline hover:no-underline">privacy@visionai.re</a></p>
              <p className="text-gray-700 mb-2"><strong>Support général :</strong><br />
              <a href="mailto:support@visionai.re" className="text-blue-600 underline hover:no-underline">support@visionai.re</a></p>
              <p className="text-gray-700"><strong>Délai de réponse :</strong> 7 jours ouvrés maximum</p>
            </div>
          </section>

          <Alert variant="success" className="mt-12">
            <AlertTitle>Résumé (TL;DR)</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nous collectons : URL de votre site, email (optionnel), données de navigation</li>
                <li>Nous utilisons : Pour analyser votre site et améliorer notre service</li>
                <li>Nous protégeons : Chiffrement, accès restreint, conformité RGPD</li>
                <li>Vous contrôlez : Accès, rectification, suppression à tout moment</li>
                <li>Nous NE vendons JAMAIS vos données</li>
              </ul>
            </AlertDescription>
          </Alert>
        </main>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <Link href="/" className="text-blue-600 underline hover:no-underline">← Retour à l&apos;accueil</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
