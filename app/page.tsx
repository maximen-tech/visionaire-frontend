"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startAnalysis } from "@/lib/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Appel API backend pour démarrer l'analyse
      const response = await startAnalysis(url);

      // Redirection vers la War Room avec l'ID d'analyse
      router.push(`/analysis/${response.analysis_id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du démarrage de l'analyse"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Vision'<span className="text-indigo-600">AI</span>'re
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12">
          Analysez votre site web avec l'IA en <span className="font-semibold text-indigo-600">7-10 minutes</span>
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <div className="flex items-center gap-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-red-900 font-semibold">Erreur</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://votresite.com"
              required
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              )}
              {isLoading ? "Démarrage..." : "Analyser"}
            </button>
          </div>
        </form>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Analyse A1</h3>
            <p className="text-gray-600">Identification du secteur et de la taille</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Score A2</h3>
            <p className="text-gray-600">Scoring IA avec benchmark</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="text-lg font-semibold mb-2">Top 3 Gaps</h3>
            <p className="text-gray-600">Opportunités d'amélioration identifiées</p>
          </div>
        </div>
      </main>
    </div>
  );
}
