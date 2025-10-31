"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import * as Sentry from "@sentry/nextjs";
import ProgressBar from "@/components/ProgressBar";
import LogStream from "@/components/LogStream";
import ProgressiveMessage from "@/components/ProgressiveMessage";
import PulsingButton from "@/components/design-system/PulsingButton";
import BlueprintGrid from "@/components/design-system/BlueprintGrid";
import GlassmorphicCard from "@/components/design-system/GlassmorphicCard";
import SSEReconnectionBanner from "@/components/SSEReconnectionBanner";
import { getSSEStreamURL } from "@/lib/api";
import type { SSEEvent, IdentityA1 } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import {
  trackWaitingRoomEnter,
  trackAnalysisProgress,
  trackAnalysisComplete,
  trackSSEEvent,
  trackError,
} from "@/lib/analytics";
import { fadeIn, fadeInUp } from "@/lib/animations";

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
    [key: string]: unknown;
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
  const [showRedirectButton, setShowRedirectButton] = useState(false);
  const [error, setError] = useState<string>("");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageTimeRef = useRef<number>(Date.now());
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // SSE Connection function with retry logic
  const connectSSE = () => {
    if (!analysisId) return;

    const sseUrl = getSSEStreamURL(analysisId);
    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;

    // Reset error state
    setError("");

    // Set reconnecting state if this is a retry
    if (reconnectAttempts > 0) {
      setIsReconnecting(true);
    }

    // Handle SSE messages
    eventSource.onmessage = (event) => {
      try {
        const data: EnhancedSSEEvent = JSON.parse(event.data);

        // Update last message timestamp
        lastMessageTimeRef.current = Date.now();

        // Update status and progress
        setStatus(data.status);
        setProgress(data.progress_percentage);

        // Track progress updates (every 25% milestone)
        if (data.progress_percentage % 25 === 0 && data.progress_percentage > 0) {
          trackAnalysisProgress(analysisId, data.progress_percentage, data.phase || 'unknown');
        }

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
          // Reset reconnect attempts and reconnecting state on successful completion
          setReconnectAttempts(0);
          setIsReconnecting(false);
          toast.success("Analyse terminée!", { duration: 3000 });

          // Track completion
          trackAnalysisComplete(analysisId, totalHours || 0);
        }

        // If analysis failed
        if (data.status === "FAILED") {
          const errorMsg = data.log_message || "L'analyse a échoué. Veuillez réessayer.";
          setError(errorMsg);
          toast.error(errorMsg);
          trackError('analysis_failed', errorMsg, { analysis_id: analysisId });
          eventSource.close();
        }
      } catch (err) {
        console.error("Erreur parsing SSE:", err);
        toast.error("Erreur de traitement des données");

        // Track SSE parsing error to Sentry
        Sentry.captureException(err, {
          tags: {
            error_type: "sse_parse_error",
            analysis_id: analysisId,
          },
          extra: {
            event_data: event.data,
          },
        });
      }
    };

    // Handle SSE errors with retry logic
    eventSource.onerror = (err) => {
      console.error("Erreur SSE:", err);
      eventSource.close();

      // Track SSE connection error to Sentry
      Sentry.captureException(new Error("SSE connection error"), {
        tags: {
          error_type: "sse_connection_error",
          analysis_id: analysisId,
          reconnect_attempt: reconnectAttempts + 1,
        },
        extra: {
          sse_url: sseUrl,
          error: err,
        },
      });

      // Retry logic (max 3 attempts)
      if (reconnectAttempts < 3) {
        const nextAttempt = reconnectAttempts + 1;
        setReconnectAttempts(nextAttempt);
        setIsReconnecting(true);

        // Track disconnection event
        trackSSEEvent('disconnected', analysisId, nextAttempt);

        toast.loading(`Reconnexion... (tentative ${nextAttempt}/3)`, {
          duration: 5000,
        });

        // Improved exponential backoff: 1s, 3s, 5s
        const delays = [1000, 3000, 5000];
        const delay = delays[nextAttempt - 1];

        reconnectTimeoutRef.current = setTimeout(() => {
          connectSSE();
        }, delay);
      } else {
        setIsReconnecting(false);
        setError("Connexion au serveur perdue. Veuillez actualiser la page.");
        toast.error("Connexion impossible. Actualisez la page.", {
          duration: 10000,
        });
        trackSSEEvent('failed', analysisId, 3);
        trackError('sse_connection_failed', 'Max reconnection attempts reached', {
          analysis_id: analysisId,
        });

        // Track final SSE failure to Sentry
        Sentry.captureMessage("SSE connection failed after max retries", {
          level: "error",
          tags: {
            error_type: "sse_max_retries",
            analysis_id: analysisId,
          },
          extra: {
            max_attempts: 3,
            sse_url: sseUrl,
          },
        });
      }
    };

    // Connection opened
    eventSource.onopen = () => {
      if (reconnectAttempts > 0) {
        toast.success("Reconnecté!", { duration: 2000 });
        trackSSEEvent('reconnected', analysisId, reconnectAttempts);
        setIsReconnecting(false);
        setReconnectAttempts(0);
      } else {
        trackSSEEvent('connected', analysisId);
      }

      // Reset last message timestamp
      lastMessageTimeRef.current = Date.now();
    };

    // Setup connection timeout detector (5s without messages = disconnected)
    const checkConnectionTimeout = () => {
      const timeSinceLastMessage = Date.now() - lastMessageTimeRef.current;

      // If more than 5 seconds without message and not complete
      if (timeSinceLastMessage > 5000 && status !== "COMPLETE" && !isReconnecting) {
        console.warn("No SSE message for 5s, connection may be stale");

        // Trigger reconnection
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
      }
    };

    // Check connection health every 2 seconds
    connectionTimeoutRef.current = setInterval(checkConnectionTimeout, 2000);
  };

  useEffect(() => {
    // Track page entry
    trackWaitingRoomEnter(analysisId);

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
      if (connectionTimeoutRef.current) {
        clearInterval(connectionTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // connectSSE is intentionally not in deps to avoid re-connection on every state change
  }, [analysisId]);

  // Manual retry handler
  const handleManualRetry = () => {
    setReconnectAttempts(0);
    setIsReconnecting(true);
    setError("");

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Track manual retry
    trackSSEEvent('manual_retry', analysisId);

    toast.loading("Tentative de reconnexion...", { duration: 2000 });

    // Retry connection immediately
    setTimeout(() => {
      connectSSE();
    }, 500);
  };

  // Handle message completion callback
  const handleMessageComplete = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <p className="text-red-400 text-lg font-semibold">ID d&apos;analyse invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <BlueprintGrid density="low" animated={true} />

      {/* SSE Reconnection Banner */}
      <SSEReconnectionBanner
        isReconnecting={isReconnecting}
        attemptNumber={reconnectAttempts}
        maxAttempts={3}
        onManualRetry={handleManualRetry}
      />

      <Toaster position="top-right" />

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              ⏰ Salle d&apos;Attente Virtuelle
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Notre IA dessine votre blueprint de temps récupérable...
            </p>
          </div>

          <PulsingButton
            variant="secondary"
            size="sm"
            onClick={() => router.push("/")}
            leftIcon={<span>←</span>}
          >
            Retour
          </PulsingButton>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div {...fadeIn}>
            <GlassmorphicCard className="border-2 border-red-500/50 bg-red-500/10">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="text-red-400 font-bold mb-1">Erreur</h3>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}

        {/* Progress Bar */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <GlassmorphicCard>
            <ProgressBar progress={progress} status={status} />
          </GlassmorphicCard>
        </motion.div>

        {/* Dual View Layout - Desktop: 35% / 65%, Mobile: Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
          {/* Left: Log Stream (35%) - Order 2 on mobile, 1 on desktop */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="order-2 lg:order-1 h-[400px] lg:h-[600px]"
          >
            <LogStream logs={logs} />
          </motion.div>

          {/* Right: Progressive Message (65%) - Order 1 on mobile, 2 on desktop */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="order-1 lg:order-2 h-[500px] lg:h-[600px]"
          >
            <ProgressiveMessage
              progress={progress}
              identityData={identityData}
              totalHours={totalHours}
              status={status}
              onComplete={handleMessageComplete}
            />
          </motion.div>
        </div>

        {/* Redirect Button - Only shows after message complete + 3 sec */}
        {showRedirectButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <PulsingButton
              variant="primary"
              size="lg"
              onClick={handleViewResults}
              rightIcon={<span>→</span>}
            >
              Voir mon blueprint complet
            </PulsingButton>
          </motion.div>
        )}

        {/* Info Card */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.5 }}
        >
          <GlassmorphicCard className="border border-cyan-500/30">
            <div className="flex items-start gap-4">
              <span className="text-3xl">ℹ️</span>
              <div>
                <h3 className="font-heading font-bold text-white mb-3 text-lg">
                  Pendant l&apos;analyse
                </h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Analyse en cours (7-10 minutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Notre IA évalue 47 critères de maturité digitale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>Vous verrez vos résultats dès que c&apos;est prêt</span>
                  </li>
                </ul>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </div>
  );
}
