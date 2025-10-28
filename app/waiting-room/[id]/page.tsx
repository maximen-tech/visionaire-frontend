"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import LogStream from "@/components/LogStream";
import ProgressiveMessage from "@/components/ProgressiveMessage";
import { getSSEStreamURL } from "@/lib/api";
import type { SSEEvent, IdentityA1 } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";

interface LogEntry {
  timestamp: string;
  message: string;
  phase?: "A1" | "A2" | "SYNTHESIS";
}

// Extended SSE Event with optional data field
interface EnhancedSSEEvent extends SSEEvent {
  data?: {
    identity?: Partial<IdentityA1>;
    partial_hours?: number;
    [key: string]: any;
  };
}

export default function WaitingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id as string;

  const [status, setStatus] = useState<string>("INITIATED");
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [identityData, setIdentityData] = useState<IdentityA1 | null>(null);
  const [totalHours, setTotalHours] = useState<number | null>(null);
  const [messageComplete, setMessageComplete] = useState(false);
  const [showRedirectButton, setShowRedirectButton] = useState(false);
  const [error, setError] = useState<string>("");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // SSE Connection function with retry logic
  const connectSSE = () => {
    if (!analysisId) return;

    const sseUrl = getSSEStreamURL(analysisId);
    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;

    // Reset error state
    setError("");

    // Handle SSE messages
    eventSource.onmessage = (event) => {
      try {
        const data: EnhancedSSEEvent = JSON.parse(event.data);

        // Update status and progress
        setStatus(data.status);
        setProgress(data.progress_percentage);

        // Add log entry
        const newLog: LogEntry = {
          timestamp: data.timestamp,
          message: data.log_message,
          phase: data.phase,
        };
        setLogs((prevLogs) => [...prevLogs, newLog]);

        // Parse identity data if available (Phase A1)
        if (data.phase === "A1" && data.data?.identity) {
          const identity: IdentityA1 = {
            company_name: data.data.identity.company_name || "Entreprise",
            owner_first_name: data.data.identity.owner_first_name || null,
            sector: data.data.identity.sector || "Secteur non identifié",
            size: data.data.identity.size || "Non déterminé",
            tier: data.data.identity.tier || "Standard",
          };
          setIdentityData(identity);
          toast.success("Entreprise identifiée!", { duration: 2000 });
        }

        // Parse partial hours if available (Phase A2)
        if (data.phase === "A2" && data.data?.partial_hours) {
          setTotalHours(data.data.partial_hours);
        }

        // When analysis complete, we wait for message to complete
        if (data.status === "COMPLETE") {
          // Reset reconnect attempts on successful completion
          setReconnectAttempts(0);
          toast.success("Analyse terminée!", { duration: 3000 });
        }

        // If analysis failed
        if (data.status === "FAILED") {
          const errorMsg = data.log_message || "L'analyse a échoué. Veuillez réessayer.";
          setError(errorMsg);
          toast.error(errorMsg);
          eventSource.close();
        }
      } catch (err) {
        console.error("Erreur parsing SSE:", err);
        toast.error("Erreur de traitement des données");
      }
    };

    // Handle SSE errors with retry logic
    eventSource.onerror = (err) => {
      console.error("Erreur SSE:", err);
      eventSource.close();

      // Retry logic (max 3 attempts)
      if (reconnectAttempts < 3) {
        const nextAttempt = reconnectAttempts + 1;
        setReconnectAttempts(nextAttempt);

        toast.loading(`Reconnexion... (tentative ${nextAttempt}/3)`, {
          duration: 5000,
        });

        // Exponential backoff: 2s, 4s, 8s
        const delay = Math.pow(2, nextAttempt) * 1000;

        reconnectTimeoutRef.current = setTimeout(() => {
          connectSSE();
        }, delay);
      } else {
        setError("Connexion au serveur perdue. Veuillez actualiser la page.");
        toast.error("Connexion impossible. Actualisez la page.", {
          duration: 10000,
        });
      }
    };

    // Connection opened
    eventSource.onopen = () => {
      if (reconnectAttempts > 0) {
        toast.success("Reconnecté!", { duration: 2000 });
      }
    };
  };

  useEffect(() => {
    // Initial log
    setLogs([
      {
        timestamp: new Date().toISOString(),
        message: `Connexion à l'analyse ${analysisId}...`,
      },
    ]);

    // Connect SSE
    connectSSE();

    // Cleanup
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [analysisId]);

  // Handle message completion callback
  const handleMessageComplete = () => {
    setMessageComplete(true);
    // Wait 3 seconds then show redirect button
    setTimeout(() => {
      setShowRedirectButton(true);
    }, 3000);
  };

  // Handle redirect to results
  const handleViewResults = () => {
    router.push(`/results/${analysisId}`);
  };

  if (!analysisId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">ID d&apos;analyse invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Salle d&apos;Attente Virtuelle
          </h1>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors"
          >
            ← Retour
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProgressBar progress={progress} status={status} />
        </div>

        {/* Dual View Layout - Desktop: 35% / 65%, Mobile: Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
          {/* Left: Log Stream (35%) */}
          <div className="order-2 lg:order-1">
            <LogStream logs={logs} />
          </div>

          {/* Right: Progressive Message (65%) */}
          <div className="order-1 lg:order-2">
            <ProgressiveMessage
              progress={progress}
              identityData={identityData}
              totalHours={totalHours}
              status={status}
              onComplete={handleMessageComplete}
            />
          </div>
        </div>

        {/* Redirect Button - Only shows after message complete + 3 sec */}
        {showRedirectButton && (
          <div className="flex justify-center animate-fade-in">
            <button
              onClick={handleViewResults}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Voir mes résultats détaillés →
            </button>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <h3 className="font-semibold text-indigo-900 mb-2">
            ℹ️ Pendant l&apos;analyse
          </h3>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Analyse en cours (7-10 minutes)</li>
            <li>• Notre IA évalue 47 critères de maturité digitale</li>
            <li>• Vous verrez vos résultats dès que c&apos;est prêt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
