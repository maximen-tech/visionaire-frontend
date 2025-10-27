import { Metadata } from 'next';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';

export const metadata: Metadata = {
  title: 'Politique de Cookies - Vision\'AI\'re',
  description: 'Politique de cookies de Vision\'AI\'re. Gestion de vos préférences cookies.',
  robots: 'noindex, nofollow',
};

export default function CookiesPage() {
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
            Politique de Cookies
          </h1>
          <p className="text-lg text-gray-600">Dernière mise à jour : 26 octobre 2025</p>
        </header>

        <main id="main-content" className="prose prose-lg max-w-none">
          <Alert variant="info" className="mb-8">
            <AlertTitle>En bref</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Cookies essentiels : Toujours actifs (nécessaires au fonctionnement)</li>
                <li>Cookies analytiques : Nécessitent votre consentement</li>
                <li>Pas de cookies publicitaires ou de tracking intrusif</li>
                <li>Vous pouvez gérer vos préférences à tout moment</li>
              </ul>
            </AlertDescription>
          </Alert>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Les cookies servent à :</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Mémoriser vos préférences</li>
                  <li>Vous identifier quand vous revenez</li>
                  <li>Comprendre comment vous utilisez le site</li>
                  <li>Améliorer votre expérience</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Les cookies ne peuvent pas :</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Accéder à d'autres fichiers</li>
                  <li>Installer des virus</li>
                  <li>Lire vos emails</li>
                  <li>Vous identifier personnellement</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Types de cookies que nous utilisons</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Cookies essentiels (toujours actifs)</h3>
            <p className="text-gray-700 mb-4">
              Ces cookies sont nécessaires au fonctionnement du site. Vous ne pouvez pas les désactiver.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Nom</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Finalité</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700 font-mono text-sm">visionai_session</td>
                    <td className="px-4 py-3 text-gray-700">Maintenir votre connexion</td>
                    <td className="px-4 py-3 text-gray-700">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-mono text-sm">visionai_consent</td>
                    <td className="px-4 py-3 text-gray-700">Mémoriser vos choix de cookies</td>
                    <td className="px-4 py-3 text-gray-700">13 mois</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 font-mono text-sm">csrf_token</td>
                    <td className="px-4 py-3 text-gray-700">Sécurité (protection CSRF)</td>
                    <td className="px-4 py-3 text-gray-700">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-mono text-sm">report_id</td>
                    <td className="px-4 py-3 text-gray-700">Lien session - rapport</td>
                    <td className="px-4 py-3 text-gray-700">7 jours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Cookies analytiques (nécessitent consentement)</h3>
            <p className="text-gray-700 mb-4">
              Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Google Analytics 4 (si vous acceptez)</h4>
              <p className="text-gray-700 mb-2"><strong>Ce que nous mesurons :</strong></p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
                <li>Pages visitées et durée de visite</li>
                <li>Parcours utilisateur</li>
                <li>Taux de rebond et conversion</li>
                <li>Appareil utilisé (desktop, mobile)</li>
                <li>Pays et langue (pas de ville précise)</li>
              </ul>
              <p className="text-gray-700 mb-2"><strong>Ce que nous NE mesurons PAS :</strong></p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Votre identité personnelle (IP anonymisée)</li>
                <li>Vos clics exacts ou mouvements de souris</li>
                <li>Votre historique hors visionai.re</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                <strong>Configuration :</strong> Anonymisation IP activée, suppression automatique après 14 mois
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Cookies que nous N'UTILISONS PAS</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700"><strong>Cookies publicitaires</strong> : Nous n'affichons aucune publicité</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700"><strong>Cookies de réseaux sociaux</strong> : Pas de boutons qui vous trackent</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700"><strong>Cookies de retargeting</strong> : Nous ne vous suivons pas sur d'autres sites</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Gestion de vos préférences</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Via notre bannière de consentement</h3>
            <p className="text-gray-700 mb-4">
              Lors de votre première visite, vous pouvez :
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700"><strong>Tout accepter</strong> : Cookies essentiels + analytiques</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 flex-shrink-0">✗</span>
                <p className="text-gray-700"><strong>Tout refuser</strong> : Seulement les cookies essentiels</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 flex-shrink-0">⚙</span>
                <p className="text-gray-700"><strong>Personnaliser</strong> : Choisir catégorie par catégorie</p>
              </div>
            </div>

            <Alert variant="warning" className="mb-6">
              <AlertDescription>
                <p className="font-semibold mb-2">Modifier vos choix plus tard :</p>
                <p className="text-sm">Un lien "Gérer les cookies" sera disponible dans le footer de toutes les pages. Vous pouvez changer d'avis à tout moment.</p>
              </AlertDescription>
            </Alert>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Via les paramètres de votre navigateur</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Google Chrome</p>
                <p className="text-sm text-gray-700">Paramètres → Confidentialité et sécurité → Cookies → Gérer les données</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Firefox</p>
                <p className="text-sm text-gray-700">Paramètres → Vie privée et sécurité → Cookies et données de sites → Gérer les données</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Safari</p>
                <p className="text-sm text-gray-700">Préférences → Confidentialité → Gérer les données de sites web</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Durée de conservation</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Type de cookie</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Durée</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Après expiration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Session</td>
                    <td className="px-4 py-3 text-gray-700">Fermeture du navigateur</td>
                    <td className="px-4 py-3 text-gray-700">Supprimé automatiquement</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">Essentiels persistants</td>
                    <td className="px-4 py-3 text-gray-700">7 jours à 13 mois</td>
                    <td className="px-4 py-3 text-gray-700">Vous devrez reconsentir</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Analytiques</td>
                    <td className="px-4 py-3 text-gray-700">14 mois maximum</td>
                    <td className="px-4 py-3 text-gray-700">Supprimé automatiquement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies et vie privée</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Anonymisation</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-2"><strong>Adresse IP :</strong></p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Google Analytics : Anonymisée (dernier octet supprimé)</li>
                <li>Logs serveur : Anonymisée après 24h</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                <strong>Exemple :</strong> Votre IP 192.168.1.42 → IP stockée 192.168.1.0 (non identifiable)
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Vos droits RGPD</h3>
            <p className="text-gray-700 mb-4">
              Les données collectées via cookies sont soumises au RGPD. Vous pouvez :
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700">Demander quelles données sont collectées</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700">Refuser les cookies analytiques</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <p className="text-gray-700">Supprimer vos cookies et données associées</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              <strong>Contact :</strong> <a href="mailto:privacy@visionai.re" className="text-blue-600 underline hover:no-underline">privacy@visionai.re</a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Contact</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Questions sur les cookies :</strong><br />
              <a href="mailto:privacy@visionai.re" className="text-blue-600 underline hover:no-underline">privacy@visionai.re</a></p>
              <p className="text-gray-700 mb-2"><strong>Support technique :</strong><br />
              <a href="mailto:support@visionai.re" className="text-blue-600 underline hover:no-underline">support@visionai.re</a></p>
              <p className="text-gray-700"><strong>Délai de réponse :</strong> 7 jours ouvrés maximum</p>
            </div>
          </section>

          <Alert variant="success" className="mt-12">
            <AlertTitle>Résumé (TL;DR)</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Cookies essentiels :</strong> Toujours actifs (nécessaires)</li>
                <li><strong>Cookies analytiques :</strong> Seulement si vous acceptez (Google Analytics)</li>
                <li><strong>Pas de publicité :</strong> Aucun cookie publicitaire</li>
                <li><strong>Votre choix :</strong> Acceptez, refusez ou personnalisez</li>
                <li><strong>Conforme RGPD :</strong> IP anonymisée, suppression facile</li>
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
