import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Vision'AI're",
  description: "Politique de confidentialité de Vision'AI're. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.",
  keywords: ["politique de confidentialité", "protection des données", "RGPD", "données personnelles", "sécurité"],
  openGraph: {
    title: "Politique de Confidentialité | Vision'AI're",
    description: "Politique de confidentialité de Vision'AI're",
    url: "https://visionai.re/politique-confidentialite",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "28 octobre 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-gray-600">
            Dernière mise à jour : {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vision'AI're (ci-après "nous", "notre" ou "la Plateforme") s'engage à protéger votre vie privée.
              Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et
              sauvegardons vos informations lorsque vous utilisez notre plateforme web et nos services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Veuillez lire attentivement cette politique. Si vous n'acceptez pas nos pratiques en matière
              de confidentialité, veuillez ne pas utiliser notre Plateforme.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Informations que Nous Collectons
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Informations Fournies Directement
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>URL du site web</strong> : L'adresse web de votre entreprise que vous soumettez
                  pour analyse
                </li>
                <li>
                  <strong>Informations d'identité</strong> : Nom, prénom, email et détails de l'entreprise
                  (raison sociale, secteur d'activité, taille, etc.)
                </li>
                <li>
                  <strong>Informations de contact</strong> : Adresse email, numéro de téléphone (optionnel)
                </li>
                <li>
                  <strong>Données du formulaire</strong> : Toute information que vous fournissez via nos
                  formulaires de contact ou d'analyse
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Informations Collectées Automatiquement
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Données d'accès</strong> : Adresse IP, type de navigateur, système d'exploitation,
                  pages visitées, durée des visites
                </li>
                <li>
                  <strong>Cookies et technologies similaires</strong> : Identificateurs uniques stockés sur
                  votre appareil
                </li>
                <li>
                  <strong>Données d'analyse</strong> : Via Google Analytics, nous collectons des données sur
                  votre utilisation de la Plateforme (pages visitées, actions effectuées, durée de session)
                </li>
                <li>
                  <strong>Données de suivi des erreurs</strong> : Via Sentry, nous collectons automatiquement
                  les erreurs et les anomalies de la Plateforme pour améliorer la stabilité
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Données Analysées depuis votre Site Web
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Lors de l'analyse de votre site web, notre IA peut collecter des données publiques incluant :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Structure et contenu du site web</li>
                <li>Métadonnées et informations techniques</li>
                <li>Présence sur les réseaux sociaux</li>
                <li>Données publiques d'identité de l'entreprise</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Comment Nous Utilisons vos Informations
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Nous utilisons les informations collectées pour :
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Fournir nos services</strong> : Analyser votre maturité digitale et générer des
                rapports personnalisés
              </li>
              <li>
                <strong>Communication</strong> : Vous envoyer les résultats de votre analyse, répondre à vos
                questions, et vous contacter concernant nos services
              </li>
              <li>
                <strong>Amélioration de la Plateforme</strong> : Analyser l'utilisation pour améliorer nos
                algorithmes et l'expérience utilisateur
              </li>
              <li>
                <strong>Marketing et lead generation</strong> : Envoyer des communications marketing (avec
                consentement), proposer nos services
              </li>
              <li>
                <strong>Conformité légale</strong> : Respecter les obligations légales et réglementaires
              </li>
              <li>
                <strong>Sécurité et prévention de la fraude</strong> : Détecter et prévenir les activités
                frauduleuses ou non autorisées
              </li>
              <li>
                <strong>Analyse statistique</strong> : Générer des statistiques anonymisées sur les tendances
                d'automatisation
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <p className="text-gray-700">
                <strong>Base légale</strong> : Nous traitons vos données sur la base de votre consentement
                explicite (pour les données sensibles) ou de notre intérêt commercial légitime à fournir et
                améliorer nos services.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Partage de vos Données
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Nous ne vendons jamais vos données personnelles à des tiers. Cependant, nous partageons vos
              données avec les entités suivantes :
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Prestataires de Services Tiers
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Google Analytics</strong> : Pour analyser le trafic et le comportement des
                  utilisateurs
                </li>
                <li>
                  <strong>Sentry</strong> : Pour le suivi des erreurs et la surveillance de la Plateforme
                </li>
                <li>
                  <strong>Vercel</strong> : Fournisseur d'hébergement cloud pour la Plateforme
                </li>
                <li>
                  <strong>Prestataires d'email</strong> : Pour envoyer vos rapports d'analyse
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Autres Partages
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nous pouvons divulguer vos données :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Si la loi l'exige ou pour se conformer à une obligation légale</li>
                <li>Pour protéger nos droits, votre sécurité ou celle d'autrui</li>
                <li>En cas de fusion, acquisition ou vente de nos actifs</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
              <p className="text-gray-700">
                <strong>Transferts internationaux</strong> : Certains de nos prestataires peuvent être basés
                en dehors du Canada. En utilisant notre Plateforme, vous consentez au transfert de vos données
                à ces juridictions.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sécurité de vos Données
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger
              vos données personnelles contre l'accès non autorisé, la modification ou la destruction :
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Chiffrement SSL/TLS</strong> : Toutes les données transmises sont chiffrées en transit
              </li>
              <li>
                <strong>Stockage sécurisé</strong> : Données stockées dans des serveurs sécurisés avec contrôle
                d'accès
              </li>
              <li>
                <strong>Authentification</strong> : Accès restreint au personnel autorisé
              </li>
              <li>
                <strong>Conformité RGPD</strong> : Respect des standards européens de protection des données
              </li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 p-4">
              <p className="text-gray-700">
                <strong>Avertissement</strong> : Bien que nous fassions de notre mieux pour sécuriser vos
                données, aucune méthode de transmission sur Internet n'est 100% sécurisée. Vous utilisez la
                Plateforme à vos propres risques.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Rétention des Données
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Nous conservons vos données personnelles pour la durée nécessaire à :
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Fournir nos services</strong> : Pendant toute la durée de votre compte et après, pour
                les besoins de conformité
              </li>
              <li>
                <strong>Conformité légale</strong> : Pendant les périodes requises par la loi québécoise,
                canadienne ou internationale
              </li>
              <li>
                <strong>Intérêts commerciaux</strong> : Jusqu'à 7 ans pour les dossiers comptables et
                contractuels
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              Vous pouvez demander la suppression de vos données à tout moment (voir section "Vos Droits").
              Les données anonymisées peuvent être conservées indéfiniment à des fins statistiques.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vos Droits
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Vous avez les droits suivants concernant vos données personnelles (applicables selon votre
              juridiction) :
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">Droit d'accès</h3>
                <p className="text-gray-700">
                  Demander l'accès à vos données personnelles que nous détenons
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">Droit de rectification</h3>
                <p className="text-gray-700">
                  Demander la correction de vos données inexactes ou incomplètes
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">Droit à l'oubli</h3>
                <p className="text-gray-700">
                  Demander la suppression de vos données personnelles sous certaines conditions
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">Droit à la portabilité</h3>
                <p className="text-gray-700">
                  Recevoir une copie de vos données dans un format structuré et facilement transférable
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">Droit d'opposition</h3>
                <p className="text-gray-700">
                  Vous opposer au traitement de vos données pour le marketing direct
                </p>
              </div>

              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="font-bold text-gray-800 mb-1">Droit de retrait du consentement</h3>
                <p className="text-gray-700">
                  Retirer votre consentement au traitement de vos données à tout moment
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mt-6">
              Pour exercer ces droits, veuillez nous contacter à l'adresse email ci-dessous.
            </p>
          </section>

          {/* Cookies */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies et Technologies de Suivi
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Notre Plateforme utilise des cookies et des technologies similaires pour améliorer votre
              expérience :
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Types de Cookies
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Cookies essentiels</strong> : Nécessaires au fonctionnement de la Plateforme
                </li>
                <li>
                  <strong>Cookies d'analyse</strong> : Utilisés par Google Analytics pour comprendre le
                  comportement des utilisateurs
                </li>
                <li>
                  <strong>Cookies marketing</strong> : Pour personnaliser les communications marketing
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Vous pouvez gérer les préférences de cookies via les paramètres de votre navigateur ou en
              cliquant sur le banneau de consentement. Veuillez noter que désactiver les cookies essentiels
              peut affecter le fonctionnement de la Plateforme.
            </p>
          </section>

          {/* Third Party Services */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Services Tiers
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Notre Plateforme utilise les services tiers suivants :
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Google Analytics</h3>
                <p className="text-gray-700 mb-2">
                  Nous utilisons Google Analytics pour analyser le trafic et le comportement des utilisateurs.
                  Google peut utiliser ces données pour améliorer ses propres services et pour la publicité ciblée.
                </p>
                <p className="text-gray-700">
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Politique de confidentialité Google
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Sentry</h3>
                <p className="text-gray-700 mb-2">
                  Nous utilisons Sentry pour surveiller et enregistrer les erreurs de la Plateforme.
                  Cela nous permet d'identifier et de corriger rapidement les problèmes de stabilité.
                </p>
                <p className="text-gray-700">
                  <a
                    href="https://sentry.io/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Politique de confidentialité Sentry
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Vercel</h3>
                <p className="text-gray-700 mb-2">
                  Vercel est notre fournisseur d'hébergement cloud et héberge notre Plateforme.
                  Vos données sont stockées et traitées sur les serveurs de Vercel.
                </p>
                <p className="text-gray-700">
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Politique de confidentialité Vercel
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vie Privée des Enfants
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Notre Plateforme n'est pas destinée aux enfants de moins de 13 ans (ou l'âge minimum requis
              dans votre juridiction). Nous ne collectons pas intentionnellement de données personnelles
              d'enfants. Si nous découvrons que nous avons collecté des données d'un enfant, nous les
              supprimerons immédiatement. Si vous croyez que nous avons collecté des données d'enfant,
              veuillez nous contacter.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Modifications de cette Politique
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Nous pouvons mettre à jour cette Politique de Confidentialité de temps en temps. Nous vous
              informerons de tout changement important par email ou par un avis proéminent sur la Plateforme.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Votre utilisation continue de la Plateforme après des modifications constitue votre acceptation
              de la Politique mise à jour. Nous vous encourageons à consulter cette politique régulièrement
              pour rester informé de la façon dont nous protégeons vos informations.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Questions sur cette Politique?
            </h2>

            <p className="text-indigo-100 mb-6">
              Si vous avez des questions, des préoccupations ou des demandes concernant cette Politique de
              Confidentialité ou nos pratiques en matière de confidentialité, veuillez nous contacter :
            </p>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-white mb-2">
                <strong>Email :</strong>{" "}
                <a
                  href="mailto:contact@visionai.re"
                  className="text-indigo-200 hover:text-white underline font-semibold"
                >
                  contact@visionai.re
                </a>
              </p>
              <p className="text-white mb-2">
                <strong>Entreprise :</strong> Vision'AI're
              </p>
              <p className="text-white">
                <strong>Pays :</strong> Canada (Québec)
              </p>
            </div>

            <p className="text-indigo-100 mt-6">
              Nous répondrons à vos demandes dans les 30 jours ouvrables.
            </p>
          </section>

          {/* Additional Information */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Informations Supplémentaires
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Droits des Résidents du Québec
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Vous avez des droits spécifiques en vertu de la Loi sur la protection des renseignements
                personnels dans le secteur privé du Québec (Loi 25). Vous pouvez demander l'accès à vos
                données, leur rectification ou suppression. Pour les plaintes, vous pouvez vous adresser à
                la Commission d'accès à l'information du Québec.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Droits des Résidents de l'UE
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Si vous êtes résident de l'Union Européenne, vous bénéficiez des protections du Règlement
                Général sur la Protection des Données (RGPD). En plus des droits énumérés ci-dessus, vous
                avez le droit de déposer plainte auprès de votre autorité de protection des données.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Droit de Demande d'Accès
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Pour demander une copie de vos données personnelles, veuillez nous envoyer un email à
                contact@visionai.re avec le sujet "Demande d'Accès aux Données". Nous traiterons votre
                demande dans les 30 jours.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center space-y-4">
          <Link
            href="/"
            className="inline-block text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Retour à l'accueil
          </Link>

          <p className="text-gray-500 text-sm">
            © 2025 Vision'AI're. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
