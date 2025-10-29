import { Metadata } from 'next';

const INDUSTRIES = {
  retail: {
    title: "Commerce de Détail - Analyseur IA | Vision'AI're",
    description: "Optimisez votre commerce avec l'IA. Découvrez comment récupérer jusqu'à 15h/semaine grâce à l'automatisation intelligente. Analyse gratuite pour commerces de détail québécois.",
    keywords: "commerce détail IA, automatisation commerce, boutique en ligne, gestion stock automatique, chatbot service client",
  },
  services: {
    title: "Services Professionnels - Automatisation IA | Vision'AI're",
    description: "Automatisez vos processus et récupérez jusqu'à 20h/semaine. Calendrier en ligne, facturation automatique, CRM intelligent. Analyse gratuite pour professionnels québécois.",
    keywords: "services professionnels IA, automatisation cabinet, CRM intelligent, facturation automatique, prise rendez-vous en ligne",
  },
  manufacturing: {
    title: "Fabrication & Production - Optimisation IA | Vision'AI're",
    description: "Optimisez votre production avec l'IA. Récupérez jusqu'à 18h/semaine grâce à la planification automatisée et la maintenance prédictive. Analyse gratuite pour manufacturiers québécois.",
    keywords: "fabrication IA, production automatisée, maintenance prédictive, planification production, contrôle qualité digital",
  },
};

export function generateMetadata({ params }: { params: { sector: string } }): Metadata {
  const sector = params.sector as keyof typeof INDUSTRIES;
  const industry = INDUSTRIES[sector];

  if (!industry) {
    return {
      title: "Industrie non trouvée | Vision'AI're",
      description: "Page industrie non disponible",
    };
  }

  return {
    title: industry.title,
    description: industry.description,
    keywords: industry.keywords,
    openGraph: {
      title: industry.title,
      description: industry.description,
      url: `https://visionaire-frontend.vercel.app/industries/${sector}`,
      siteName: "Vision'AI're",
      locale: 'fr_CA',
      type: 'website',
      images: [
        {
          url: `https://visionaire-frontend.vercel.app/og-images/industry-${sector}.png`,
          width: 1200,
          height: 630,
          alt: industry.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: industry.title,
      description: industry.description,
      images: [`https://visionaire-frontend.vercel.app/og-images/industry-${sector}.png`],
    },
    alternates: {
      canonical: `https://visionaire-frontend.vercel.app/industries/${sector}`,
    },
  };
}
