'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { sanitizeEmail, checkRateLimit } from '@/lib/security/sanitize';

const EXIT_INTENT_COOKIE = 'exit_intent_shown';
const EXIT_INTENT_THRESHOLD = 50; // pixels from top to trigger

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if popup already shown in this session
    if (typeof window === 'undefined') return;

    const hasShown = sessionStorage.getItem(EXIT_INTENT_COOKIE);
    if (hasShown) return;

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect if mouse is moving toward top of window (exit intent)
      if (e.clientY <= EXIT_INTENT_THRESHOLD && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem(EXIT_INTENT_COOKIE, 'true');
        trackEvent('exit_intent_popup_shown', {
          event_category: 'engagement',
          event_label: 'exit_intent',
        });
      }
    };

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('exit_intent_popup_closed', {
      event_category: 'engagement',
      event_label: 'popup_dismissed',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      setError('Email invalide. Veuillez entrer une adresse email valide.');
      trackEvent('exit_intent_invalid_email', {
        event_category: 'error',
        event_label: 'validation_failed',
      });
      return;
    }

    // Rate limiting
    const rateLimitCheck = checkRateLimit('exit-intent-submit', 3, 60000);
    if (!rateLimitCheck.allowed) {
      setError('Trop de tentatives. Veuillez attendre quelques instants.');
      trackEvent('exit_intent_rate_limited', {
        event_category: 'error',
        event_label: 'rate_limit',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to email API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: sanitizedEmail,
          subject: 'Votre analyse gratuite Vision\'AI\'re',
          text: 'Merci pour votre intérêt! Notre équipe vous contactera sous 24h.',
          html: `
            <h2>Merci pour votre intérêt!</h2>
            <p>Notre équipe vous contactera sous 24h pour vous guider dans votre analyse.</p>
            <p>En attendant, découvrez comment nos clients ont économisé jusqu'à 200h/an avec l'automatisation IA.</p>
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setIsSuccess(true);
      trackEvent('exit_intent_conversion', {
        event_category: 'conversion',
        event_label: 'email_captured',
        value: 1,
      });

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
      trackEvent('exit_intent_submission_error', {
        event_category: 'error',
        event_label: 'api_error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Parfait! Nous vous avons envoyé un email
              </h3>
              <p className="text-green-700">
                Vérifiez votre boîte de réception dans les prochaines minutes.
              </p>
            </div>
          ) : (
            // Form State
            <>
              {/* Icon */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Attendez! Ne partez pas sans votre analyse gratuite
                </h2>
                <p className="text-gray-600">
                  Recevez votre analyse par email en 2 minutes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="exit-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Votre email professionnel
                  </label>
                  <input
                    type="email"
                    id="exit-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean.dupont@entreprise.com"
                    required
                    autoFocus
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi...' : '📧 Recevoir Mon Analyse'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  100% gratuit • Sans engagement • Données protégées
                </p>
              </form>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Ce que vous recevrez:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Analyse complète de votre maturité digitale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Calcul précis des heures récupérables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Recommandations d'outils personnalisées</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
