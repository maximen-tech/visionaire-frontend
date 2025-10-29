"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import BlueprintGrid from "@/components/design-system/BlueprintGrid";
import GlassmorphicCard from "@/components/design-system/GlassmorphicCard";
import PulsingButton from "@/components/design-system/PulsingButton";
import { BreadcrumbListSchema } from "@/components/StructuredData";
import { fadeIn, fadeInUp } from "@/lib/animations";
import { trackEvent } from "@/lib/analytics";

// Industry data configuration
const INDUSTRIES = {
  retail: {
    name: "Commerce de Détail",
    icon: "🛍️",
    description: "Optimisez votre commerce avec l'IA et récupérez jusqu'à 15h/semaine",
    challenges: [
      "Gestion manuelle des stocks et commandes",
      "Présence digitale limitée (pas de boutique en ligne)",
      "Service client chronophage (emails, téléphone)",
      "Marketing dispersé sans suivi des résultats",
      "Facturation et comptabilité manuelles",
    ],
    solutions: [
      "Système de gestion de stock automatisé (économie: 5h/semaine)",
      "Boutique en ligne clé en main avec paiement intégré (3h/semaine)",
      "Chatbot IA pour service client 24/7 (4h/semaine)",
      "Marketing automation (emails, réseaux sociaux) (2h/semaine)",
      "Facturation et comptabilité automatisées (1h/semaine)",
    ],
    totalHours: 15,
    stats: {
      avgRevenue: "125 000 $",
      avgEmployees: "3-10",
      digitalMaturity: "35%",
    },
    testimonial: {
      quote: "Nous avons automatisé notre gestion de stock et notre boutique en ligne. Économie: 12h/semaine et +40% de ventes!",
      author: "Marie Dubois",
      company: "Boutique Mode MTL",
      avatar: "👩‍💼",
    },
  },
  services: {
    name: "Services Professionnels",
    icon: "💼",
    description: "Automatisez vos processus et récupérez jusqu'à 20h/semaine",
    challenges: [
      "Prise de rendez-vous manuelle (téléphone, emails)",
      "Facturation et suivi des paiements chronophages",
      "Prospection et suivi client dispersés",
      "Création de documents/contrats répétitive",
      "Gestion administrative manuelle",
    ],
    solutions: [
      "Calendrier de réservation en ligne automatisé (4h/semaine)",
      "Facturation automatique avec rappels de paiement (3h/semaine)",
      "CRM intelligent pour prospection et suivi (5h/semaine)",
      "Templates de documents automatisés (IA) (3h/semaine)",
      "Assistants virtuels pour tâches admin (5h/semaine)",
    ],
    totalHours: 20,
    stats: {
      avgRevenue: "180 000 $",
      avgEmployees: "2-8",
      digitalMaturity: "42%",
    },
    testimonial: {
      quote: "Le CRM et la facturation automatisés ont transformé notre cabinet. Plus de temps pour nos clients, moins de stress administratif.",
      author: "Pierre Lambert",
      company: "Cabinet Conseil Pro",
      avatar: "👨‍💼",
    },
  },
  manufacturing: {
    name: "Fabrication & Production",
    icon: "🏭",
    description: "Optimisez votre production et récupérez jusqu'à 18h/semaine",
    challenges: [
      "Planification de production manuelle",
      "Suivi des commandes fournisseurs dispersé",
      "Contrôle qualité sans traçabilité digitale",
      "Maintenance réactive (pas de prévention)",
      "Rapports et analytics manuels",
    ],
    solutions: [
      "Système de planification de production automatisé (5h/semaine)",
      "Gestion des commandes et stocks en temps réel (4h/semaine)",
      "Contrôle qualité digitalisé avec traçabilité (3h/semaine)",
      "Maintenance prédictive propulsée par IA (3h/semaine)",
      "Dashboards automatiques (production, qualité, coûts) (3h/semaine)",
    ],
    totalHours: 18,
    stats: {
      avgRevenue: "350 000 $",
      avgEmployees: "10-50",
      digitalMaturity: "38%",
    },
    testimonial: {
      quote: "La maintenance prédictive et la planification automatisée ont réduit nos coûts de 25% et libéré 15h/semaine pour l'innovation.",
      author: "Jean Tremblay",
      company: "Usine Tech QC",
      avatar: "👨‍🔧",
    },
  },
};

type IndustrySector = keyof typeof INDUSTRIES;

export default function IndustryPage() {
  const params = useParams();
  const router = useRouter();
  const sector = params.sector as IndustrySector;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if invalid sector
  if (!INDUSTRIES[sector]) {
    router.push("/");
    return null;
  }

  const industry = INDUSTRIES[sector];

  const handleAnalysisStart = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track industry page conversion
    trackEvent("industry_page_conversion", {
      sector: sector,
      event_category: "conversion",
      event_label: `industry_${sector}`,
    });

    // Redirect to homepage with pre-filled email
    router.push(`/?email=${encodeURIComponent(email)}&sector=${sector}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <BlueprintGrid density="low" animated={true} />

      {/* Breadcrumb Schema */}
      <BreadcrumbListSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: industry.name, url: `/industries/${sector}` },
        ]}
      />

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center space-y-4">
          <div className="text-6xl mb-4">{industry.icon}</div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            {industry.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {industry.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <GlassmorphicCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-slate-400 mb-1">Revenu Moyen</p>
                <p className="text-2xl font-bold text-white">{industry.stats.avgRevenue}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Employés</p>
                <p className="text-2xl font-bold text-white">{industry.stats.avgEmployees}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Maturité Digitale</p>
                <p className="text-2xl font-bold text-amber-400">{industry.stats.digitalMaturity}</p>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Challenges */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <GlassmorphicCard>
            <h2 className="text-2xl font-heading font-bold text-white mb-6">
              ❌ Défis Communs
            </h2>
            <ul className="space-y-3">
              {industry.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5">•</span>
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </GlassmorphicCard>
        </motion.div>

        {/* Solutions */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
          <GlassmorphicCard className="border-2 border-green-500/30">
            <h2 className="text-2xl font-heading font-bold text-white mb-6">
              ✅ Solutions IA
            </h2>
            <ul className="space-y-3">
              {industry.solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-400 text-xl mt-0.5">✓</span>
                  <span className="text-slate-300">{solution}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-center text-green-300 font-bold text-xl">
                💎 Total: {industry.totalHours} heures/semaine récupérées
              </p>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Testimonial */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <GlassmorphicCard className="border-2 border-cyan-500/30">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{industry.testimonial.avatar}</div>
              <div className="flex-1">
                <p className="text-slate-300 italic mb-4">
                  &quot;{industry.testimonial.quote}&quot;
                </p>
                <p className="text-sm text-slate-400">
                  — {industry.testimonial.author}, {industry.testimonial.company}
                </p>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* CTA Form */}
        <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
          <GlassmorphicCard className="border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-amber-600/5">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-heading font-bold text-white">
                🎁 Analyse Gratuite pour {industry.name}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Découvrez exactement combien d&apos;heures VOTRE entreprise pourrait récupérer avec l&apos;IA.
                Analyse personnalisée en 2 minutes.
              </p>

              <form onSubmit={handleAnalysisStart} className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre.email@entreprise.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <PulsingButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  rightIcon={<span>→</span>}
                >
                  🚀 Commencer mon analyse gratuite
                </PulsingButton>
              </form>

              <p className="text-xs text-slate-400">
                ✓ Gratuit · ✓ 2 minutes · ✓ Résultats immédiats
              </p>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Retour à l&apos;accueil
          </button>
        </div>
      </div>
    </div>
  );
}
