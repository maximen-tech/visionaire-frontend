"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAnalysisResults } from "@/lib/api";
import type { AnalysisResults } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  formatCAD,
  formatHoursPerWeek,
  formatHoursPerYear,
} from "@/lib/formatters";

// Lazy load heavy components for better performance
const LeadForm = lazy(() => import("@/components/LeadForm"));
const OpportunityCard = lazy(() => import("@/components/OpportunityCard"));
import HourlyRateInput from "@/components/HourlyRateInput";
import {
  trackResultsEnter,
  trackValorizationCalculate,
  trackAnalysisIDCopy,
  trackScrollToLeadForm,
  trackLeadFormView,
} from "@/lib/analytics";
import { SkeletonResults, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import BlueprintGrid from "@/components/design-system/BlueprintGrid";
import GlassmorphicCard, {
  GlassmorphicInput,
} from "@/components/design-system/GlassmorphicCard";
import PulsingButton from "@/components/design-system/PulsingButton";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id as string;

  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hourlyRate, setHourlyRate] = useState<number | null>(null);

  useEffect(() => {
    if (!analysisId) return;

    const fetchResults = async () => {
      try {
        const data = await getAnalysisResults(analysisId);
        setResults(data);

        // Track results page entry
        trackResultsEnter(analysisId, data.total_hours_per_year);

        // Track lead form visibility (user can see it)
        setTimeout(() => {
          trackLeadFormView(analysisId);
        }, 3000); // Track after 3 seconds (engaged user)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors de la récupération des résultats"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [analysisId]);

  // Handle hourly rate change
  const handleHourlyRateChange = (rate: number | null) => {
    setHourlyRate(rate);

    // Track valorization calculation when rate is set
    if (rate && results) {
      const totalValue = Math.round(results.total_hours_per_year * rate);

      trackValorizationCalculate(
        analysisId,
        rate,
        totalValue,
        results.total_hours_per_year
      );

      toast.success(
        `Valorisation calculée: ${formatCAD(totalValue)}/an!`,
        { duration: 4000 }
      );
    }
  };

  // Copy Analysis ID to clipboard
  const copyAnalysisId = () => {
    navigator.clipboard.writeText(analysisId);
    toast.success("ID d'analyse copié!", { duration: 2000 });

    // Track copy action
    trackAnalysisIDCopy(analysisId);
  };

  // Scroll to Lead Form
  const scrollToLeadForm = () => {
    const leadFormElement = document.getElementById("lead-form");
    if (leadFormElement) {
      leadFormElement.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Réservez votre place 👇", { duration: 2000, icon: "🎁" });

      // Track scroll action
      trackScrollToLeadForm(analysisId);
    }
  };

  if (isLoading) {
    return <SkeletonResults />;
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-zinc-50 p-8 relative">
        <BlueprintGrid density="low" animated={true} />
        <GlassmorphicCard className="max-w-md w-full p-8 text-center relative z-10">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">
            Erreur
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <PulsingButton
            onClick={() => router.push("/")}
            variant="primary"
            size="md"
          >
            Retour à l&apos;accueil
          </PulsingButton>
        </GlassmorphicCard>
      </div>
    );
  }

  // Calculate total valorization
  const totalYearlyValue = hourlyRate && results
    ? results.total_hours_per_year * hourlyRate
    : null;
  const totalWeeklyValue = hourlyRate && results
    ? results.total_hours_per_week * hourlyRate
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-50 p-4 md:p-8 relative">
      <BlueprintGrid density="low" animated={true} />
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">
              ⏰ Vos Opportunités de Temps Sauvé
            </h1>
            <p className="text-slate-600 font-medium">
              {results.identity_a1.company_name} •{" "}
              {results.identity_a1.sector}
            </p>
          </div>
          <PulsingButton
            onClick={() => router.push("/")}
            variant="secondary"
            size="md"
            leftIcon={<span>←</span>}
          >
            Nouvelle analyse
          </PulsingButton>
        </div>

        {/* Valorisation Input Section */}
        <GlassmorphicCard variant="highlighted" className="p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4">
                💰 Calculez la valeur de vos opportunités
              </h2>
              <p className="text-slate-700 text-lg">
                Entrez votre taux horaire pour voir la valeur monétaire annuelle des gains de temps identifiés.
              </p>
            </div>

            <HourlyRateInput
              value={hourlyRate}
              onChange={handleHourlyRateChange}
              className="max-w-md mx-auto"
            />

            {/* Total Valorization Summary (if hourly rate provided) */}
            {hourlyRate && totalYearlyValue && totalWeeklyValue && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-3 text-center">
                  📊 Valeur Totale des Opportunités
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Économie hebdomadaire:
                    </p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      {formatCAD(totalWeeklyValue)}/semaine
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Économie annuelle:
                    </p>
                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">
                      {formatCAD(totalYearlyValue)}/an
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-slate-500 text-sm mt-4 text-center">
              💡 Moyenne PME québécoise: 50-100 $ CAD/h
            </p>
          </div>
        </GlassmorphicCard>

        {/* Total Summary Card */}
        <GlassmorphicCard variant="highlighted" className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">
              ⚡ Temps Total Récupérable
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div>
                <p className="text-5xl font-heading font-bold text-cyan-600">
                  {formatHoursPerWeek(results.total_hours_per_week)}
                </p>
                <p className="text-slate-600 mt-2 font-medium">par semaine</p>
              </div>
              <div className="text-4xl text-cyan-300">→</div>
              <div>
                <p className="text-5xl font-heading font-bold text-cyan-600">
                  {formatHoursPerYear(results.total_hours_per_year)}
                </p>
                <p className="text-slate-600 mt-2 font-medium">par année</p>
              </div>
            </div>

            {hourlyRate && totalYearlyValue && (
              <div className="mt-6 pt-6 border-t border-cyan-200/50">
                <p className="text-sm text-slate-600 mb-2 font-medium">
                  💰 Valeur économique totale
                </p>
                <p className="text-4xl font-heading font-bold text-amber-600">
                  {formatCAD(totalYearlyValue)}
                </p>
                <p className="text-slate-600 mt-1">par année</p>
              </div>
            )}
          </div>
        </GlassmorphicCard>

        {/* Reality Check Section */}
        <GlassmorphicCard className="p-6 bg-gradient-to-br from-amber-50/80 to-orange-50/80 border-2 border-amber-300/50">
          <h3 className="text-xl font-heading font-bold text-amber-900 mb-2 flex items-center gap-2">
            ⚠️ Reality Check
          </h3>
          <p className="text-slate-800 mb-4 leading-relaxed">
            <span className="font-bold text-amber-900">73% des PME</span> qui identifient ces
            opportunités ne passent jamais à l&apos;action. Pourquoi?
            Manque de temps, de ressources, ou d&apos;expertise technique. Ne
            faites pas cette erreur.
          </p>
          <PulsingButton
            onClick={scrollToLeadForm}
            variant="primary"
            size="md"
            rightIcon={<span>→</span>}
          >
            🎁 Réserver ma consultation GRATUITE
          </PulsingButton>
        </GlassmorphicCard>

        {/* 3 Opportunity Cards */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            Vos 3 Opportunités Détaillées
          </h2>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <OpportunityCard
                number={1}
                title="Présence Digitale"
                opportunity={results.digital_presence}
                hourlyRate={hourlyRate}
                icon={<span className="text-2xl">🌐</span>}
              />
              <OpportunityCard
                number={2}
                title="Création de Valeur"
                opportunity={results.value_creation}
                hourlyRate={hourlyRate}
                icon={<span className="text-2xl">💎</span>}
              />
              <OpportunityCard
                number={3}
                title="Gestion Business"
                opportunity={results.business_management}
                hourlyRate={hourlyRate}
                icon={<span className="text-2xl">📊</span>}
              />
            </div>
          </Suspense>
        </div>


        {/* CTA - Conversion Lead */}
        <div id="lead-form">
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-lg p-8">
                <SkeletonText lines={8} />
              </div>
            }
          >
            <LeadForm analysisId={results.analysis_id} />
          </Suspense>
        </div>

        {/* Métadonnées */}
        <GlassmorphicCard className="p-4 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-2">
            <p className="font-medium">
              Analyse ID: <span className="font-mono font-semibold text-cyan-600">{results.analysis_id}</span>
            </p>
            <button
              onClick={copyAnalysisId}
              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-medium transition-colors"
              title="Copier l'ID"
            >
              📋 Copier
            </button>
          </div>
          <p className="text-center">
            <span className="font-medium">URL analysée:</span> {results.url}
          </p>
        </GlassmorphicCard>
      </div>
    </div>
  );
}
