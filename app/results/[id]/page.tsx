"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAnalysisResults } from "@/lib/api";
import type { AnalysisResults } from "@/lib/types";
import LeadForm from "@/components/LeadForm";
import OpportunityCard from "@/components/OpportunityCard";
import toast, { Toaster } from "react-hot-toast";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id as string;

  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hourlyRate, setHourlyRate] = useState<number | null>(null);
  const [hourlyRateInput, setHourlyRateInput] = useState("");
  const [showValorization, setShowValorization] = useState(false);

  useEffect(() => {
    if (!analysisId) return;

    const fetchResults = async () => {
      try {
        const data = await getAnalysisResults(analysisId);
        setResults(data);
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

  const handleCalculateValue = () => {
    const rate = parseFloat(hourlyRateInput);
    if (!isNaN(rate) && rate > 0) {
      setHourlyRate(rate);
      setShowValorization(true);
      const totalValue = results ? Math.round(results.total_hours_per_year * rate) : 0;
      toast.success(
        `Valorisation calculée: ${totalValue.toLocaleString("fr-FR")} $ CAD/an!`,
        { duration: 4000 }
      );
    } else {
      toast.error("Veuillez entrer un taux horaire valide");
    }
  };

  // Copy Analysis ID to clipboard
  const copyAnalysisId = () => {
    navigator.clipboard.writeText(analysisId);
    toast.success("ID d'analyse copié!", { duration: 2000 });
  };

  // Scroll to Lead Form
  const scrollToLeadForm = () => {
    const leadFormElement = document.getElementById("lead-form");
    if (leadFormElement) {
      leadFormElement.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Réservez votre place 👇", { duration: 2000, icon: "🎁" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Erreur
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  const totalYearlyValue = hourlyRate
    ? results.total_hours_per_year * hourlyRate
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Vos Opportunités de Temps Sauvé
            </h1>
            <p className="text-gray-600">
              {results.identity_a1.company_name} •{" "}
              {results.identity_a1.sector}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors"
          >
            ← Nouvelle analyse
          </button>
        </div>

        {/* Valorisation Input Section */}
        {!showValorization && (
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-lg p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Combien vaut votre temps?
              </h2>
              <p className="text-indigo-100 mb-6 text-lg">
                Entrez votre taux horaire pour voir la valeur économique de
                chaque opportunité
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="relative">
                  <input
                    type="number"
                    value={hourlyRateInput}
                    onChange={(e) => setHourlyRateInput(e.target.value)}
                    placeholder="75"
                    className="w-48 px-4 py-3 text-lg text-gray-900 rounded-lg focus:ring-2 focus:ring-white outline-none"
                    min="0"
                    step="5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $ CAD/h
                  </span>
                </div>
                <button
                  onClick={handleCalculateValue}
                  className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors text-lg"
                >
                  Calculer la valeur
                </button>
              </div>
              <p className="text-indigo-200 text-sm mt-4">
                Moyenne PME québécoise: 50-100 $ CAD/h
              </p>
            </div>
          </div>
        )}

        {/* Total Summary Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-indigo-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Temps Total Récupérable
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div>
                <p className="text-5xl font-bold text-indigo-600">
                  {results.total_hours_per_week.toFixed(1)}h
                </p>
                <p className="text-gray-600 mt-2">par semaine</p>
              </div>
              <div className="text-4xl text-gray-300">→</div>
              <div>
                <p className="text-5xl font-bold text-indigo-600">
                  {Math.round(results.total_hours_per_year)}h
                </p>
                <p className="text-gray-600 mt-2">par année</p>
              </div>
            </div>

            {showValorization && totalYearlyValue && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Valeur économique totale
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {Math.round(totalYearlyValue).toLocaleString("fr-FR")} $ CAD
                </p>
                <p className="text-gray-600 mt-1">par année</p>
              </div>
            )}
          </div>
        </div>

        {/* Reality Check Section */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-900 mb-2 flex items-center gap-2">
            ⚠️ Reality Check
          </h3>
          <p className="text-orange-800 mb-4">
            <span className="font-bold">73% des PME</span> qui identifient ces
            opportunités ne passent jamais à l&apos;action. Pourquoi?
            Manque de temps, de ressources, ou d&apos;expertise technique. Ne
            faites pas cette erreur.
          </p>
          <button
            onClick={scrollToLeadForm}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105"
          >
            🎁 Réserver ma consultation GRATUITE →
          </button>
        </div>

        {/* 3 Opportunity Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">⏱️</span>
            Vos 3 Opportunités Détaillées
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OpportunityCard
              title="Présence Digitale"
              opportunity={results.digital_presence}
              hourlyRate={hourlyRate}
              icon="🌐"
            />
            <OpportunityCard
              title="Création de Valeur"
              opportunity={results.value_creation}
              hourlyRate={hourlyRate}
              icon="💎"
            />
            <OpportunityCard
              title="Gestion Business"
              opportunity={results.business_management}
              hourlyRate={hourlyRate}
              icon="📊"
            />
          </div>
        </div>

        {/* Implementation Time Comparison */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Temps d&apos;Implémentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">👤</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  En Solo
                </h3>
              </div>
              <p className="text-4xl font-bold text-gray-700 mb-2">
                {results.implementation_time_solo.hours}h
              </p>
              <p className="text-gray-600">
                {results.implementation_time_solo.description}
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🚀</div>
                <h3 className="text-xl font-semibold text-green-900">
                  Avec Expert
                </h3>
              </div>
              <p className="text-4xl font-bold text-green-700 mb-2">
                {results.implementation_time_expert.hours}h
              </p>
              <p className="text-green-800">
                {results.implementation_time_expert.description}
              </p>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm font-semibold text-green-900">
                  Économie:{" "}
                  {results.implementation_time_solo.hours -
                    results.implementation_time_expert.hours}
                  h d&apos;implémentation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA - Conversion Lead */}
        <div id="lead-form">
          <LeadForm analysisId={results.analysis_id} />
        </div>

        {/* Métadonnées */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <p>
              Analyse ID: <span className="font-mono font-semibold">{results.analysis_id}</span>
            </p>
            <button
              onClick={copyAnalysisId}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs font-medium transition-colors"
              title="Copier l'ID"
            >
              📋 Copier
            </button>
          </div>
          <p>URL analysée: {results.url}</p>
        </div>
      </div>
    </div>
  );
}
