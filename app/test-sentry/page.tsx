"use client";

import { useState } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { startAnalysis } from "@/lib/api";

export default function TestSentryPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // Test 1: Simple React Error
  const testReactError = () => {
    addResult("🧪 Test 1: Déclenchement erreur React...");
    throw new Error("Test Sentry: React component error!");
  };

  // Test 2: API Error (404)
  const testAPIError = async () => {
    addResult("🧪 Test 2: Déclenchement erreur API 404...");
    try {
      await startAnalysis("https://invalid-test-url-sentry-12345.com");
      addResult("❌ Test 2 échoué: L'API aurait dû échouer");
    } catch {
      addResult("✅ Test 2 réussi: Erreur API capturée et envoyée à Sentry");
    }
  };

  // Test 3: Manual Sentry Error
  const testManualSentry = () => {
    addResult("🧪 Test 3: Envoi manuel à Sentry...");
    Sentry.captureException(new Error("Test Sentry: Manual error capture"), {
      tags: {
        test_type: "manual",
        test_number: 3,
      },
      extra: {
        test_description: "Manual Sentry test from test page",
        timestamp: new Date().toISOString(),
      },
    });
    addResult("✅ Test 3 réussi: Erreur manuelle envoyée à Sentry");
  };

  // Test 4: Unhandled Promise Rejection
  const testPromiseRejection = async () => {
    addResult("🧪 Test 4: Déclenchement promise rejection...");
    // This will be caught by Sentry automatically
    Promise.reject(new Error("Test Sentry: Unhandled promise rejection"));
    addResult("✅ Test 4 déclenché: Promise rejection envoyée à Sentry");
  };

  // Test 5: Custom Message
  const testCustomMessage = () => {
    addResult("🧪 Test 5: Envoi message custom...");
    Sentry.captureMessage("Test Sentry: Custom info message", {
      level: "info",
      tags: {
        test_type: "custom_message",
        source: "test_page",
      },
    });
    addResult("✅ Test 5 réussi: Message custom envoyé");
  };

  // Test 6: Performance Transaction
  const testPerformance = async () => {
    addResult("🧪 Test 6: Test transaction performance...");

    // Use new Sentry v10+ API
    Sentry.startSpan(
      {
        op: "test",
        name: "Test Performance Transaction",
      },
      async () => {
        // Simulate slow operation
        await new Promise((resolve) => setTimeout(resolve, 1000));
        addResult("✅ Test 6 réussi: Transaction performance enregistrée");
      }
    );
  };

  // Test 7: Sentry Logger (Info Log)
  const testSentryLogger = () => {
    addResult("🧪 Test 7: Envoi log info avec Sentry.logger...");
    try {
      if (Sentry.logger && Sentry.logger.info) {
        Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' });
        addResult("✅ Test 7 réussi: Log info envoyé avec Sentry.logger");
      } else {
        // Fallback: use captureMessage
        Sentry.captureMessage('User triggered test log', {
          level: 'info',
          tags: { log_source: 'sentry_test' },
        });
        addResult("✅ Test 7 réussi: Log envoyé via captureMessage (fallback)");
      }
    } catch (error) {
      addResult("⚠️ Test 7: Erreur - " + (error as Error).message);
    }
  };

  // Test 8: Console Logging Integration
  const testConsoleLogging = () => {
    addResult("🧪 Test 8: Test console.log integration...");

    // These console calls will be captured by Sentry
    console.log("[Sentry Test] Console.log captured by Sentry", { test_id: 8, timestamp: new Date().toISOString() });
    console.warn("[Sentry Test] Console.warn captured by Sentry", { severity: "warning", test_id: 8 });
    console.error("[Sentry Test] Console.error captured by Sentry", { severity: "error", test_id: 8 });

    addResult("✅ Test 8 réussi: Console logs (log, warn, error) envoyés à Sentry");
  };

  // Clear results
  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧪 Test Sentry Error Tracking
          </h1>
          <p className="text-gray-600">
            Déclenche différents types d&apos;erreurs pour tester Sentry.
            Vérifie ensuite le dashboard:{" "}
            <a
              href="https://sentry.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              https://sentry.io/
            </a>
          </p>
        </div>

        {/* DSN Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📊 Configuration Sentry
          </h2>
          <div className="space-y-2 text-sm font-mono">
            <div>
              <span className="text-gray-600">DSN configuré:</span>{" "}
              <span className={process.env.NEXT_PUBLIC_SENTRY_DSN ? "text-green-600" : "text-red-600"}>
                {process.env.NEXT_PUBLIC_SENTRY_DSN ? "✅ OUI" : "❌ NON"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Environment:</span>{" "}
              <span className="text-indigo-600">{process.env.NODE_ENV}</span>
            </div>
            {process.env.NEXT_PUBLIC_SENTRY_DSN && (
              <div className="text-xs text-gray-500 mt-2">
                DSN: {process.env.NEXT_PUBLIC_SENTRY_DSN.substring(0, 50)}...
              </div>
            )}
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🎯 Tests Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={testReactError}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              1. React Error
            </button>
            <button
              onClick={testAPIError}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              2. API Error (404)
            </button>
            <button
              onClick={testManualSentry}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
            >
              3. Manual Capture
            </button>
            <button
              onClick={testPromiseRejection}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              4. Promise Rejection
            </button>
            <button
              onClick={testCustomMessage}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              5. Custom Message
            </button>
            <button
              onClick={testPerformance}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              6. Performance Test
            </button>
            <button
              onClick={testSentryLogger}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold"
            >
              7. Sentry Logger
            </button>
            <button
              onClick={testConsoleLogging}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              8. Console Logging
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">📋 Résultats</h2>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
            >
              Effacer
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Aucun test exécuté. Clique sur un bouton ci-dessus.
              </p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-green-400 text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-indigo-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">
            📖 Instructions
          </h3>
          <ol className="text-sm text-indigo-800 space-y-2 list-decimal list-inside">
            <li>
              Exécute les tests 2-8 (tous sauf &quot;React Error&quot;)
            </li>
            <li>
              Ouvre le dashboard Sentry:{" "}
              <a
                href="https://sentry.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                https://sentry.io/
              </a>
            </li>
            <li>Va dans Issues → Voir les erreurs capturées (1-2 min de délai)</li>
            <li>Clique sur une erreur pour voir les détails</li>
            <li>Vérifie: Stack trace, tags, extra context</li>
            <li>
              <strong>NOUVEAU Test 7:</strong> Sentry.logger.info() pour logging (SDK v10+)
            </li>
            <li>
              <strong>NOUVEAU Test 8:</strong> Console logging (console.log, console.warn, console.error)
            </li>
            <li>
              <strong>ATTENTION:</strong> Le bouton &quot;React Error&quot; va casser la page (normal, pour tester Error Boundary)
            </li>
          </ol>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
