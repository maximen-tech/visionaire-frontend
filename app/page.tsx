"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startAnalysis } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await startAnalysis(url);
      router.push(`/waiting-room/${response.analysis_id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du démarrage de l'analyse"
      );
      setIsLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
      {/* Hero Section - Variation A */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connaissez vos 3 priorités digitales en 10 minutes
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Analyse IA gratuite de votre site web. Identifiez vos opportunités d'amélioration avec impact financier. Sans carte bancaire, résultats immédiats.
            </p>

            {/* URL Input Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
              {error && (
                <Alert variant="error" className="mb-4">
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://votresite.com"
                  required
                  className="flex-1 text-lg"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="sm:w-auto w-full"
                >
                  {isLoading ? "Démarrage..." : "Analysez votre site"}
                </Button>
              </div>
            </form>

            <p className="text-sm text-gray-600 mb-4">
              Déjà <span className="font-semibold text-blue-600">500+ PME</span> ont identifié leurs priorités
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">✓ 100% gratuit</span>
              <span className="flex items-center gap-1">✓ Résultats en 10 minutes</span>
              <span className="flex items-center gap-1">✓ Sans carte bancaire</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi la plupart des PME n'arrivent pas à prioriser leur digital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pain Point 1 */}
            <Card hoverable>
              <CardHeader>
                <div className="text-4xl mb-3">🧭</div>
                <CardTitle className="text-xl">Le flou stratégique coûte cher</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Vos concurrents avancent pendant que vous hésitez. Les agences vous proposent 15 chantiers à la fois. Votre équipe débat pendant des semaines. Résultat : vous investissez 20 000€ sans savoir si c'est la bonne priorité.
                </p>
                <p className="font-semibold text-orange-700">
                  Coût d'opportunité : 50 000-150 000€ de CA perdus par an
                </p>
              </CardContent>
            </Card>

            {/* Pain Point 2 */}
            <Card hoverable>
              <CardHeader>
                <div className="text-4xl mb-3">⏳</div>
                <CardTitle className="text-xl">Les audits traditionnels prennent trop de temps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Un audit digital classique prend 2 à 3 semaines minimum. Vous devez bloquer votre équipe pour des entretiens. Remplir des questionnaires interminables. Attendre le rapport. Pendant ce temps, le marché évolue.
                </p>
                <p className="font-semibold text-orange-700">
                  2-3 semaines perdues
                </p>
              </CardContent>
            </Card>

            {/* Pain Point 3 */}
            <Card hoverable>
              <CardHeader>
                <div className="text-4xl mb-3">🔢</div>
                <CardTitle className="text-xl">Impossible de prouver le ROI avant d'investir</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Votre DAF demande des preuves avant de débloquer le budget. Les agences parlent de visibilité et d'engagement sans chiffres concrets. Vous ne pouvez pas démontrer l'impact financier. Le budget reste bloqué.
                </p>
                <p className="font-semibold text-orange-700">
                  5 000-15 000€ perdus par mois de retard
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Et si vous pouviez avoir ces réponses aujourd'hui ?
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              C'est exactement ce que Vision'AI're fait. En 10 minutes, vous obtenez vos 3 priorités digitales classées par impact financier. Sans questionnaire interminable. Sans bloquer votre équipe. Sans attendre des semaines. Juste les actions qui comptent vraiment pour votre business.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              3 étapes pour connaître vos priorités digitales
            </h2>
            <p className="text-lg text-gray-600">
              Pas de questionnaire. Pas de réunion. Juste votre URL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Badge variant="info" className="mb-4">01 - 30 secondes</Badge>
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Entrez votre URL
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Collez l'adresse de votre site web dans le formulaire. Notre IA commence immédiatement l'analyse de votre présence digitale. Elle scanne votre site, évalue votre positionnement et identifie votre secteur d'activité. Pas besoin de créer de compte ni de renseigner votre carte bancaire.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <Badge variant="info" className="mb-4">02 - 7-10 minutes</Badge>
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                L'IA analyse votre site
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Pendant que vous prenez un café, notre IA évalue 47 critères digitaux. Elle compare votre site aux standards de votre secteur. Elle identifie vos forces et vos lacunes. Elle calcule votre score de maturité digitale. Vous voyez la progression en temps réel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <Badge variant="success" className="mb-4">03 - Résultats immédiats</Badge>
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Obtenez vos 3 priorités
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vous recevez un rapport clair et actionable. Vos 3 opportunités d'amélioration classées par impact. Pour chaque priorité : le problème identifié, le bénéfice attendu et l'estimation d'impact financier. Pas de jargon technique. Juste les actions concrètes qui feront la différence.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Analyser mon site maintenant
            </Button>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span>✓ Gratuit et sans engagement</span>
              <span>✓ Résultats en 10 minutes</span>
              <span>✓ Aucune carte bancaire requise</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que vous obtenez dans votre rapport
            </h2>
            <p className="text-lg text-gray-600">
              Pas de jargon. Pas de données inutiles. Juste ce qui compte pour votre business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <Card>
              <CardHeader>
                <Badge variant="info" className="mb-2">Analyse contextuelle</Badge>
                <div className="text-4xl mb-3">🎯</div>
                <CardTitle>Votre positionnement clarifié</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Nous identifions votre secteur d'activité et la taille de votre entreprise. Vous découvrez comment votre site se compare aux standards de votre industrie. Plus besoin de deviner si votre digital est à la hauteur. Vous savez enfin si vous êtes en avance, dans la moyenne ou en retard par rapport à vos concurrents directs.
                </p>
                <p className="text-sm text-gray-500 italic">
                  Évitez de copier les mauvaises pratiques d'autres secteurs
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card>
              <CardHeader>
                <Badge variant="info" className="mb-2">Scoring intelligent</Badge>
                <div className="text-4xl mb-3">📊</div>
                <CardTitle>Un score clair, pas un rapport de 50 pages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Vous obtenez un score global sur 100 basé sur 47 critères essentiels. Nous évaluons votre présence en ligne, votre expérience utilisateur, votre performance technique et votre visibilité. Chaque dimension est notée et expliquée. Vous comprenez immédiatement vos forces et vos faiblesses.
                </p>
                <p className="text-sm text-orange-700 font-semibold">
                  Identifiez les faiblesses qui vous coûtent des clients chaque semaine
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card>
              <CardHeader>
                <Badge variant="success" className="mb-2">Opportunités classées</Badge>
                <div className="text-4xl mb-3">📋</div>
                <CardTitle>Les 3 actions qui auront le plus d'impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Nous ne vous donnons pas une liste de 20 choses à faire. Nous identifions vos 3 opportunités les plus impactantes. Chaque recommandation est classée par priorité et expliquée simplement. Vous savez quoi faire en premier, pourquoi c'est important et quel résultat attendre. Votre équipe peut commencer à agir dès aujourd'hui.
                </p>
                <p className="text-sm text-orange-700 font-semibold">
                  Concentrez votre budget sur les actions à fort ROI
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card>
              <CardHeader>
                <Badge variant="warning" className="mb-2">ROI projeté</Badge>
                <div className="text-4xl mb-3">💰</div>
                <CardTitle>Des chiffres pour convaincre votre DAF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Pour chaque priorité identifiée, nous estimons l'impact financier potentiel sur votre chiffre d'affaires. Vous obtenez une fourchette réaliste basée sur votre secteur et votre taille. Vous pouvez enfin présenter un business case solide. Fini les discussions où vous devez justifier vos investissements digitaux sans données concrètes.
                </p>
                <p className="text-sm text-orange-700 font-semibold">
                  Démontrez le ROI avant d'investir un seul euro
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Prêt à voir ce que vous obtenez ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Rejoignez les 500+ PME qui ont déjà clarifié leurs priorités digitales. Analyse gratuite en 10 minutes. Sans engagement. Sans carte bancaire. Juste les réponses dont vous avez besoin pour avancer.
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Analyser mon site gratuitement
            </Button>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span>✓ 100% gratuit</span>
              <span>✓ Résultats en 10 minutes</span>
              <span>✓ Données sécurisées (RGPD)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir avant de commencer
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Combien de temps prend l'analyse ?",
                answer: "Entre 7 et 10 minutes en moyenne, 8 minutes la plupart du temps. Notre IA commence immédiatement après que vous ayez entré votre URL. Vous voyez la progression en temps réel pendant l'analyse. Contrairement aux audits traditionnels qui prennent 2 à 3 semaines, vous obtenez vos résultats le jour même, sans avoir à bloquer votre équipe ou remplir des questionnaires.",
              },
              {
                question: "Est-ce vraiment gratuit ? Y a-t-il des frais cachés ?",
                answer: "Oui, c'est 100% gratuit et sans aucun engagement. Vous n'avez pas besoin de carte bancaire pour commencer. Aucun frais ne sera jamais débité sans votre accord explicite. Notre mission est de rendre l'analyse digitale accessible à toutes les PME, pas de vous piéger avec des coûts cachés.",
              },
              {
                question: "Mes données sont-elles en sécurité ? Que faites-vous de mes informations ?",
                answer: "Vos données sont protégées et conformes au RGPD. Nous analysons uniquement les informations publiques de votre site web. Nous ne vendons jamais vos données à des tiers. Toutes vos informations sont stockées de manière sécurisée et vous pouvez demander leur suppression à tout moment.",
              },
              {
                question: "Est-ce que ça marche avec tous les types de sites ?",
                answer: "Oui, notre IA analyse tous les sites web, quelle que soit la technologie utilisée. WordPress, Shopify, sites sur mesure, e-commerce, sites vitrines : tous sont compatibles. Notre IA s'adapte automatiquement à votre plateforme et à votre secteur d'activité pour fournir une analyse pertinente.",
              },
              {
                question: "Comment puis-je être sûr que les recommandations sont pertinentes pour mon secteur ?",
                answer: "Notre IA identifie automatiquement votre secteur et compare vos performances aux standards de votre industrie. Nous avons entraîné notre IA sur des milliers de sites dans différents secteurs. Les recommandations sont contextualisées selon votre activité et votre taille. Plus de 500 PME ont déjà validé la pertinence de nos analyses avec un taux de satisfaction de 92%.",
              },
              {
                question: "Puis-je partager les résultats avec mon équipe ou ma direction ?",
                answer: "Oui, vous pouvez facilement partager ou exporter votre rapport d'analyse. Vous recevez un lien unique pour consulter vos résultats à tout moment. Vous pouvez partager ce lien avec votre équipe, votre direction ou vos partenaires en un clic.",
              },
              {
                question: "Que se passe-t-il après l'analyse ? Vais-je recevoir de l'aide pour mettre en œuvre les recommandations ?",
                answer: "Vous recevez un rapport clair et actionable que vous pouvez mettre en œuvre immédiatement. Chaque recommandation est expliquée simplement avec des étapes concrètes. Si vous souhaitez de l'aide pour implémenter les priorités identifiées, nous pouvons vous mettre en relation avec des partenaires qualifiés. Mais le rapport est conçu pour être compréhensible et actionable même sans accompagnement externe.",
              },
              {
                question: "Que se passe-t-il si mon site obtient un mauvais score ?",
                answer: "C'est justement le moment idéal pour identifier vos priorités d'amélioration. Un score faible signifie que vous avez des opportunités importantes d'amélioration. Notre rapport vous montre exactement quoi faire pour progresser rapidement. Nous estimons aussi l'impact financier potentiel, ce qui facilite la justification de votre budget d'amélioration.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-blue-600">
                    {expandedFaq === index ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              D'autres questions ?
            </h3>
            <p className="text-gray-600 mb-6">
              Contactez-nous à{" "}
              <a href="mailto:support@visionai.re" className="text-blue-600 underline hover:no-underline">
                support@visionai.re
              </a>{" "}
              et nous vous répondrons dans les 24 heures.
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Lancer mon analyse maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à connaître vos priorités digitales ?
          </h2>
          <p className="text-xl mb-8 leading-relaxed opacity-95">
            Arrêtez de deviner où investir votre budget digital. En 10 minutes, vous saurez exactement quelles sont vos 3 priorités d'amélioration avec leur impact financier estimé. Gratuit. Sans engagement. Sans carte bancaire. Juste les réponses concrètes dont vous avez besoin pour faire avancer votre business et convaincre votre direction.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://votresite.com"
                required
                className="flex-1 text-lg bg-white"
              />
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 sm:w-auto w-full"
              >
                {isLoading ? "Démarrage..." : "Analyser mon site maintenant"}
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
            <span>✓ 100% gratuit</span>
            <span>✓ Résultats en 10 minutes</span>
            <span>✓ Sans carte bancaire</span>
            <span>✓ Conforme RGPD</span>
          </div>

          <div className="mt-12 pt-12 border-t border-blue-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">8 min</div>
                <div className="text-sm opacity-90">durée moyenne</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm opacity-90">entreprises</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">92%</div>
                <div className="text-sm opacity-90">satisfaits</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">45K€</div>
                <div className="text-sm opacity-90">impact moyen</div>
              </div>
            </div>
          </div>
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
