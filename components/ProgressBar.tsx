"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  status: string;
}

/**
 * ProgressBar Component
 *
 * Blueprint-style progress bar with animated gradient and phase indicators.
 * Uses Cyan → Emerald gradient for visual appeal.
 *
 * @param progress - Progress percentage (0-100)
 * @param status - Analysis status string
 *
 * @example
 * <ProgressBar progress={65} status="RUNNING_A2" />
 */
export default function ProgressBar({ progress, status }: ProgressBarProps) {

  // Determine phase from progress percentage
  const getPhaseInfo = () => {
    if (status === "COMPLETE") {
      return { label: "Terminé", emoji: "✅", color: "text-emerald-600" };
    }
    if (status === "FAILED") {
      return { label: "Échec", emoji: "❌", color: "text-red-600" };
    }

    if (progress < 20) {
      return { label: "Phase 1 - Bienvenue", emoji: "👋", color: "text-cyan-600" };
    } else if (progress < 45) {
      return { label: "Phase 2 - Découverte", emoji: "🔍", color: "text-cyan-600" };
    } else if (progress < 75) {
      return { label: "Phase 3 - Analyse", emoji: "📊", color: "text-purple-600" };
    } else if (progress < 95) {
      return { label: "Phase 4 - Révélation", emoji: "🎯", color: "text-amber-600" };
    } else {
      return { label: "Phase 5 - Invitation", emoji: "💎", color: "text-emerald-600" };
    }
  };

  const phaseInfo = getPhaseInfo();
  const cappedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{phaseInfo.emoji}</span>
          <span className={cn("text-sm font-semibold", phaseInfo.color)}>
            {phaseInfo.label}
          </span>
        </div>

        <motion.span
          key={cappedProgress}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg font-mono font-bold text-slate-900"
        >
          {cappedProgress}%
        </motion.span>
      </div>

      {/* Progress bar container */}
      <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        {/* Blueprint grid lines background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="progress-grid"
                width="20"
                height="12"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#progress-grid)" />
          </svg>
        </div>

        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${cappedProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "h-full relative",
            status === "COMPLETE" && "bg-gradient-to-r from-emerald-500 to-emerald-600",
            status === "FAILED" && "bg-gradient-to-r from-red-500 to-red-600",
            !["COMPLETE", "FAILED"].includes(status) &&
              "bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
          )}
        >
          {/* Animated shine effect */}
          {status !== "FAILED" && status !== "COMPLETE" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Status text */}
      <div className="mt-3 text-xs text-slate-600 text-center font-medium">
        {status === "INITIATED" && "Initialisation de l'analyse..."}
        {status === "RUNNING_A1" && "Phase A1 - Identification de votre entreprise en cours..."}
        {status === "RUNNING_A2" && "Phase A2 - Calcul des opportunités de temps..."}
        {status === "RUNNING_SYNTHESIS" && "Synthèse finale en cours..."}
        {status === "COMPLETE" && "✅ Analyse terminée avec succès ! Découvrez vos résultats."}
        {status === "FAILED" && "❌ Une erreur s'est produite. Veuillez réessayer."}
      </div>
    </div>
  );
}
