"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import LogStream from "@/components/LogStream";
import StatusCard from "@/components/StatusCard";
import EmailNotificationButton from "@/components/EmailNotificationButton";
import { getSSEStreamURL } from "@/lib/api";
import type { SSEEvent } from "@/lib/types";

interface LogEntry {
  timestamp: string;
  message: string;
  phase?: "A1" | "A2" | "SYNTHESIS";
}

export default function WarRoomPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id as string;

  const [status, setStatus] = useState<string>("INITIATED");
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [url, setUrl] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!analysisId) return;

    // Connexion au stream SSE
    const sseUrl = getSSEStreamURL(analysisId);
    const eventSource = new EventSource(sseUrl);

    // Gestionnaire de messages SSE
    eventSource.onmessage = (event) => {
      try {
        const data: SSEEvent = JSON.parse(event.data);

        // Mettre à jour le statut et la progression
        setStatus(data.status);
        setProgress(data.progress_percentage);

        // Ajouter le log
        const newLog: LogEntry = {
          timestamp: data.timestamp,
          message: data.log_message,
          phase: data.phase,
        };
        setLogs((prevLogs) => [...prevLogs, newLog]);

        // Si l'analyse est terminée, rediriger vers les résultats
        if (data.status === "COMPLETE") {
          setTimeout(() => {
            eventSource.close();
            router.push(`/results/${analysisId}`);
          }, 2000);
        }

        // Si l'analyse a échoué, afficher l'erreur
        if (data.status === "FAILED") {
          setError(
            data.log_message || "L'analyse a échoué. Veuillez réessayer."
          );
          eventSource.close();
        }
      } catch (err) {
        console.error("Erreur parsing SSE:", err);
      }
    };

    // Gestionnaire d'erreurs SSE
    eventSource.onerror = (err) => {
      console.error("Erreur SSE:", err);
      setError("Connexion au serveur perdue. Actualiser la page.");
      eventSource.close();
    };

    // Log initial
    setLogs([
      {
        timestamp: new Date().toISOString(),
        message: `Connexion au stream d'analyse ${analysisId}...`,
      },
    ]);

    // Cleanup
    return () => {
      eventSource.close();
    };
  }, [analysisId, router]);

  if (!analysisId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">ID d&apos;analyse invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">
            War Room - Analyse en temps réel
          </h1>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors"
          >
            ← Retour
          </button>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Statut et Progression */}
          <div className="lg:col-span-1 space-y-6">
            <StatusCard
              analysisId={analysisId}
              url={url || "Chargement..."}
              status={status}
              createdAt={createdAt}
            />

            <div className="bg-white rounded-lg shadow-md p-6">
              <ProgressBar progress={progress} status={status} />
            </div>

            {/* Instructions */}
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-2">
                ℹ️ Informations
              </h3>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Analyse en cours (7-10 min)</li>
                <li>• Les logs s&apos;actualisent en temps réel</li>
                <li>
                  • Vous serez redirigé automatiquement à la fin
                </li>
              </ul>
            </div>

            {/* Email Notification */}
            <EmailNotificationButton analysisId={analysisId} />
          </div>

          {/* Colonne droite - Logs */}
          <div className="lg:col-span-2">
            <LogStream logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
