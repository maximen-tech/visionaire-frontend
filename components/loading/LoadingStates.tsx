"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Blueprint drawing animation
export function BlueprintLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="2"
          strokeDasharray="251"
          strokeDashoffset="251"
          animate={{
            strokeDashoffset: [251, 0],
            rotate: [0, 360],
          }}
          transition={{
            strokeDashoffset: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="2"
          strokeDasharray="188"
          strokeDashoffset="188"
          animate={{
            strokeDashoffset: [188, 0],
            rotate: [360, 0],
          }}
          transition={{
            strokeDashoffset: { duration: 1.5, repeat: Infinity },
            rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="125"
          strokeDashoffset="125"
          animate={{
            strokeDashoffset: [125, 0],
          }}
          transition={{
            duration: 1, repeat: Infinity,
          }}
        />
      </svg>
    </motion.div>
  );
}

// AI Thinking dots
export function AIThinkingLoader() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-600 dark:text-dark-text-secondary font-medium">
        IA en réflexion
      </span>
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-cyan-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Progress bar with tips
const LOADING_TIPS = [
  "💡 Astuce : L'IA analyse 47 critères de maturité digitale",
  "⚡ Saviez-vous ? 85% des PME économisent 10h+/semaine avec l'automatisation",
  "🎯 En cours : Comparaison avec votre secteur d'activité",
  "🔍 Analyse : Évaluation de votre présence digitale",
  "📊 Calcul : Estimation de votre potentiel d'économie",
  "✨ Presque là : Finalisation de votre rapport personnalisé",
];

export function ProgressBarWithTips({ progress }: { progress: number }) {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-slate-200 dark:bg-dark-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
          style={{ width: `${progress}%` }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            backgroundPosition: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Percentage */}
      <div className="flex justify-between items-center text-sm">
        <motion.span
          key={currentTip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-slate-600 dark:text-dark-text-secondary"
        >
          {LOADING_TIPS[currentTip]}
        </motion.span>
        <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

// Skeleton loader for cards
export function SkeletonCard() {
  return (
    <div className="p-6 bg-white dark:bg-dark-bg-secondary rounded-xl border border-slate-200 dark:border-dark-border-medium space-y-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-200 dark:bg-dark-bg-tertiary rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-dark-bg-tertiary rounded w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-dark-bg-tertiary rounded w-1/2" />
        </div>
      </div>

      {/* Content lines */}
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 dark:bg-dark-bg-tertiary rounded" />
        <div className="h-3 bg-slate-200 dark:bg-dark-bg-tertiary rounded w-5/6" />
        <div className="h-3 bg-slate-200 dark:bg-dark-bg-tertiary rounded w-4/6" />
      </div>

      {/* Footer */}
      <div className="flex gap-2">
        <div className="h-8 bg-slate-200 dark:bg-dark-bg-tertiary rounded flex-1" />
        <div className="h-8 bg-slate-200 dark:bg-dark-bg-tertiary rounded w-20" />
      </div>
    </div>
  );
}

// Skeleton grid
export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

// Pulsing dots loader
export function PulsingDots({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className="flex gap-2">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`${sizes[size]} rounded-full bg-cyan-500`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Spinner with text
export function SpinnerWithText({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-16 h-16 border-4 border-slate-200 dark:border-dark-border-medium border-t-cyan-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-slate-600 dark:text-dark-text-secondary font-medium">{text}</p>
    </div>
  );
}

// Full page loading overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  variant?: "blueprint" | "spinner" | "dots";
}

export function LoadingOverlay({
  isLoading,
  text = "Chargement en cours...",
  variant = "blueprint",
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-6">
        {variant === "blueprint" && <BlueprintLoader size="lg" />}
        {variant === "spinner" && <SpinnerWithText text={text} />}
        {variant === "dots" && <PulsingDots size="lg" />}
        {variant === "blueprint" && (
          <p className="text-slate-600 dark:text-dark-text-secondary font-medium text-lg">
            {text}
          </p>
        )}
      </div>
    </motion.div>
  );
}
