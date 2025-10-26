"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAnalysisResults } from "@/lib/api";
import type { AnalysisResults } from "@/lib/types";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id as string;

  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Résultats de l&apos;analyse
            </h1>
            <p className="text-gray-600">
              Analyse terminée le{" "}
              {results.completed_at
                ? new Date(results.completed_at).toLocaleString("fr-FR")
                : "N/A"}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors"
          >
            ← Nouvelle analyse
          </button>
        </div>

        {/* URL analysée */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            URL analysée
          </h2>
          <p className="text-lg text-gray-900 break-all">{results.url}</p>
        </div>

        {/* Grille de résultats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Identité A1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900">
                Identité (A1)
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Secteur
                </span>
                <p className="text-lg text-gray-900 font-semibold">
                  {results.identity_a1.sector}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Taille estimée
                </span>
                <p className="text-lg text-gray-900 font-semibold">
                  {results.identity_a1.estimated_size}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Tier</span>
                <p className="text-lg text-gray-900 font-semibold">
                  {results.identity_a1.tier}
                </p>
              </div>
            </div>
          </div>

          {/* Score A2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">📊</div>
              <h2 className="text-2xl font-bold text-gray-900">Score (A2)</h2>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Score obtenu
                </span>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl text-indigo-600 font-bold">
                    {results.score_a2.score}
                  </p>
                  <span className="text-gray-500">/ 100</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Benchmark secteur
                </span>
                <p className="text-2xl text-gray-700 font-semibold">
                  {results.score_a2.benchmark}
                </p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-500">
                  Interprétation
                </span>
                <p className="text-gray-900 mt-1">
                  {results.score_a2.interpretation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Gaps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">💡</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Top 3 Opportunités d&apos;amélioration
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.top_3_gaps.map((gap, index) => (
              <div
                key={index}
                className="border-2 border-indigo-100 rounded-lg p-5 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {gap.title}
                  </h3>
                </div>
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-500">
                    Impact financier mensuel
                  </span>
                  <p className="text-2xl font-bold text-green-600">
                    {gap.impact_financial_monthly.toLocaleString("fr-FR")} €
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Opportunité IA
                  </span>
                  <p className="text-gray-700 mt-1">{gap.ia_opportunity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Conversion Lead */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à transformer votre entreprise avec l&apos;IA ?
          </h2>
          <p className="text-indigo-100 mb-6 text-lg">
            Discutons de comment mettre en œuvre ces opportunités concrètes
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
            Prendre rendez-vous
          </button>
        </div>

        {/* Métadonnées */}
        <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
          <p>
            Analyse ID: <span className="font-mono">{results.analysis_id}</span>
          </p>
          <p>
            Créée le:{" "}
            {new Date(results.created_at).toLocaleString("fr-FR")}
          </p>
        </div>
      </div>
    </div>
  );
}
