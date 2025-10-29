"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SSEReconnectionBannerProps {
  isReconnecting: boolean;
  attemptNumber: number;
  maxAttempts: number;
  onManualRetry?: () => void;
}

/**
 * SSEReconnectionBanner Component
 *
 * Displays a banner when SSE connection is lost and reconnection is in progress.
 * Shows attempt number and provides manual retry after max attempts reached.
 *
 * @param isReconnecting - Whether reconnection is currently in progress
 * @param attemptNumber - Current reconnection attempt (1-based)
 * @param maxAttempts - Maximum number of automatic reconnection attempts
 * @param onManualRetry - Callback for manual retry button
 */
export default function SSEReconnectionBanner({
  isReconnecting,
  attemptNumber,
  maxAttempts,
  onManualRetry,
}: SSEReconnectionBannerProps) {
  const hasReachedMaxAttempts = attemptNumber > maxAttempts;

  return (
    <AnimatePresence>
      {isReconnecting && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-amber-100 dark:bg-amber-900/90 border-b-2 border-amber-400 dark:border-amber-600 shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            {!hasReachedMaxAttempts ? (
              // Reconnecting state
              <div className="flex items-center justify-center gap-3">
                {/* Spinning loader */}
                <svg
                  className="animate-spin h-5 w-5 text-amber-600 dark:text-amber-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    Reconnexion en cours...
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    (Tentative {attemptNumber}/{maxAttempts})
                  </p>
                </div>
              </div>
            ) : (
              // Max attempts reached state
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                      Connexion perdue
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Vérifiez votre connexion internet
                    </p>
                  </div>
                </div>

                {onManualRetry && (
                  <button
                    onClick={onManualRetry}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    🔄 Réessayer
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
