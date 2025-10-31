import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries, industryOrder } from '@/lib/data/industries';

interface IndustryPageProps {
  params: Promise<{ sector: string }>;
}

export async function generateStaticParams() {
  return industryOrder.map((slug) => ({
    sector: slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { sector } = await params;
  const industry = industries[sector];

  if (!industry) {
    return {
      title: 'Industrie non trouvée',
    };
  }

  return {
    title: `${industry.name} | Vision'AI're - Automatisation Spécialisée`,
    description: `${industry.tagline}. Découvrez comment automatiser vos processus et récupérer du temps précieux.`,
    keywords: [
      industry.name,
      'automatisation',
      'IA',
      'PME',
      'Québec',
      'transformation digitale',
      ...industry.challenges.map((c) => c.title),
    ],
    openGraph: {
      title: `${industry.name} | Vision'AI're`,
      description: industry.tagline,
      url: `https://visionai.re/industries/${sector}`,
      type: 'website',
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { sector } = await params;
  const industry = industries[sector];

  if (!industry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="text-6xl mb-6">{industry.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{industry.name}</h1>
            <p className="text-xl md:text-2xl text-cyan-50 mb-8 max-w-3xl mx-auto">
              {industry.tagline}
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Analyser Mon Entreprise Gratuitement
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Introduction */}
        <section>
          <p className="text-lg text-slate-700 leading-relaxed">{industry.description}</p>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Défis Communs dans le Secteur
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {industry.challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{challenge.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{challenge.title}</h3>
                <p className="text-slate-600">{challenge.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Solutions d'Automatisation Concrètes
          </h2>
          <div className="space-y-8">
            {industry.useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 md:mb-0">
                    {useCase.title}
                  </h3>
                  <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md whitespace-nowrap">
                    ⏱️ {useCase.hoursSaved} économisées
                  </div>
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-semibold text-slate-600">Outils suggérés:</span>
                  {useCase.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opportunities Summary */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Potentiel d'Économie de Temps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {industry.opportunities.map((opp, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-slate-900 mb-2">{opp.area}</h3>
                <div className="text-3xl font-bold text-cyan-600 mb-3">{opp.potential}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Complexité:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-4 rounded ${
                          i < opp.complexity ? 'bg-amber-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-slate-700 mb-4">
              <strong>Total potentiel:</strong> Jusqu'à{' '}
              <span className="text-2xl font-bold text-cyan-600">
                {industry.opportunities.reduce((sum, opp) => {
                  const hours = parseInt(opp.potential.split('-')[1]) || 0;
                  return sum + hours;
                }, 0)}
                h/semaine
              </span>{' '}
              récupérables
            </p>
            <p className="text-slate-600">
              Soit l'équivalent de{' '}
              <strong>
                {Math.round(
                  (industry.opportunities.reduce((sum, opp) => {
                    const hours = parseInt(opp.potential.split('-')[1]) || 0;
                    return sum + hours;
                  }, 0) *
                    52) /
                    8
                )}{' '}
                jours de travail par an
              </strong>
            </p>
          </div>
        </section>

        {/* Testimonial */}
        {industry.testimonial && (
          <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-cyan-600">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl text-cyan-600">"</div>
              <p className="text-xl text-slate-700 italic leading-relaxed">
                {industry.testimonial.quote}
              </p>
            </div>
            <div className="ml-16">
              <p className="font-bold text-slate-900">{industry.testimonial.author}</p>
              <p className="text-slate-600">
                {industry.testimonial.role}, {industry.testimonial.company}
              </p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à Libérer du Temps dans Votre Entreprise?
          </h2>
          <p className="text-lg text-amber-50 mb-8 max-w-2xl mx-auto">
            Notre analyse gratuite de 2 minutes identifiera les opportunités d'automatisation
            spécifiques à votre situation dans le secteur{' '}
            <strong>{industry.name.toLowerCase()}</strong>.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Commencer l'Analyse Gratuite →
          </Link>
          <p className="text-sm text-amber-100 mt-4">
            ⏱️ 2 minutes • 🎯 Résultats personnalisés • 💯 100% gratuit
          </p>
        </section>

        {/* Other Industries */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Autres Secteurs d'Activité
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industryOrder
              .filter((slug) => slug !== sector)
              .map((slug) => {
                const ind = industries[slug];
                return (
                  <Link
                    key={slug}
                    href={`/industries/${slug}`}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="text-3xl mb-2">{ind.icon}</div>
                    <p className="text-sm font-semibold text-slate-900">{ind.name}</p>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* Back Link */}
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
