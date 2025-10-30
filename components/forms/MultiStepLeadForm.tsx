'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertLead } from '@/lib/api';
import type { LeadConversionRequest } from '@/lib/types';
import {
  trackLeadSubmit,
  trackLeadSubmitSuccess,
  trackLeadSubmitError,
  trackLeadFormFieldFocus,
} from '@/lib/analytics';
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePhone,
  checkRateLimit,
} from '@/lib/security/sanitize';
import PulsingButton from '@/components/design-system/PulsingButton';
import ProgressBar from './ProgressBar';
import { useABTrack } from '@/lib/hooks/useABTest';

interface MultiStepLeadFormProps {
  analysisId: string;
}

interface FormData {
  email: string;
  name: string;
  company: string;
  phone: string;
  opportunity: string;
}

const STEP_LABELS = ['Email', 'Informations', 'Détails'];

export default function MultiStepLeadForm({ analysisId }: MultiStepLeadFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    phone: '',
    opportunity: 'all',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const trackEvent = useABTrack('lead_form_test');

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`lead_form_progress_${analysisId}`);
    if (saved) {
      try {
        const { formData: savedData, step } = JSON.parse(saved);
        setFormData(savedData);
        setCurrentStep(step);
        trackEvent('progress_restored', step);
      } catch (error) {
        console.error('Failed to restore form progress:', error);
      }
    }
  }, [analysisId, trackEvent]);

  // Save progress to localStorage
  useEffect(() => {
    if (currentStep > 1 || formData.email) {
      localStorage.setItem(
        `lead_form_progress_${analysisId}`,
        JSON.stringify({ formData, step: currentStep })
      );
    }
  }, [formData, currentStep, analysisId]);

  // Track step completion
  useEffect(() => {
    if (currentStep > 1) {
      trackEvent(`step_${currentStep}_reached`, currentStep);
    }
  }, [currentStep, trackEvent]);

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email requis';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
    } else if (step === 2) {
      // Validate name and company
      if (!formData.name.trim()) {
        newErrors.name = 'Nom requis';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Nom trop court';
      }

      if (!formData.company.trim()) {
        newErrors.company = 'Nom d\'entreprise requis';
      } else if (formData.company.trim().length < 2) {
        newErrors.company = 'Nom d\'entreprise trop court';
      }
    } else if (step === 3) {
      // Validate phone
      if (!formData.phone.trim()) {
        newErrors.phone = 'Téléphone requis';
      } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Téléphone invalide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      trackEvent(`step_${currentStep}_completed`, currentStep);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      trackEvent(`step_${currentStep}_validation_failed`, currentStep);
    }
  };

  const handleBack = () => {
    trackEvent(`step_${currentStep}_back`, currentStep);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Rate limiting
    const rateLimitCheck = checkRateLimit('lead-form-submit', 5, 60000);
    if (!rateLimitCheck.allowed) {
      setSubmitError('Trop de tentatives. Veuillez attendre quelques instants.');
      setIsSubmitting(false);
      trackEvent('rate_limit_exceeded');
      return;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeName(formData.name);
    const sanitizedEmail = sanitizeEmail(formData.email);
    const sanitizedPhone = sanitizePhone(formData.phone);
    const sanitizedCompany = sanitizeName(formData.company);

    if (!sanitizedName || !sanitizedEmail || !sanitizedPhone || !sanitizedCompany) {
      setSubmitError('Données invalides. Veuillez vérifier vos informations.');
      setIsSubmitting(false);
      trackEvent('sanitization_failed');
      return;
    }

    // Track submission attempt
    trackLeadSubmit(analysisId, formData.opportunity);
    trackEvent('form_submitted');

    try {
      const payload: LeadConversionRequest = {
        analysis_id: analysisId,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany,
      };

      const response = await convertLead(payload);
      setIsSuccess(true);

      // Track success
      trackLeadSubmitSuccess(analysisId, response.lead_id);
      trackEvent('form_success', 1);

      // Clear saved progress
      localStorage.removeItem(`lead_form_progress_${analysisId}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de l\'envoi';
      setSubmitError(errorMessage);
      trackLeadSubmitError(analysisId, errorMessage);
      trackEvent('form_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center"
      >
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          Félicitations! Votre place est réservée
        </h3>
        <p className="text-green-700 text-lg mb-4">
          Nous avons bien reçu votre demande. Notre équipe vous contactera sous 24h
          pour votre consultation GRATUITE de 300$.
        </p>
        <p className="text-green-600 text-sm">
          Vous recevrez un email de confirmation dans les prochaines minutes.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scarcity Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 text-center"
      >
        <p className="text-lg font-bold">⏰ Seulement 3 places disponibles cette semaine</p>
        <p className="text-sm mt-1 opacity-90">
          Nous limitons nos consultations pour garantir un service de qualité
        </p>
      </motion.div>

      {/* Main Form Card */}
      <div className="bg-white border-2 border-indigo-200 rounded-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg mb-4">
            🎁 Consultation 300$ GRATUITE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Prêt à récupérer votre temps?
          </h3>
          <p className="text-gray-600">Complétez votre réservation en 3 étapes</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={3} labels={STEP_LABELS} />

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Email */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Commençons par votre email
                </h4>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email professionnel <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onFocus={() => trackLeadFormFieldFocus('email', analysisId)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="jean.dupont@entreprise.com"
                  autoFocus
                  className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <PulsingButton
                onClick={handleNext}
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<span>→</span>}
              >
                Continuer
              </PulsingButton>

              <p className="text-xs text-gray-500 text-center">
                💡 Prend seulement 30 secondes
              </p>
            </motion.div>
          )}

          {/* Step 2: Name & Company */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Parlez-nous de vous
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onFocus={() => trackLeadFormFieldFocus('name', analysisId)}
                      placeholder="Jean Dupont"
                      autoFocus
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nom de l'entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      onFocus={() => trackLeadFormFieldFocus('company', analysisId)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="Nom de votre entreprise"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                        errors.company ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.company && (
                      <p className="text-red-600 text-sm mt-1">{errors.company}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  ← Retour
                </button>
                <PulsingButton
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  rightIcon={<span>→</span>}
                >
                  Continuer
                </PulsingButton>
              </div>

              <p className="text-xs text-gray-500 text-center">
                💡 Dernière étape après celle-ci
              </p>
            </motion.div>
          )}

          {/* Step 3: Phone & Opportunity */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Dernière étape!
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onFocus={() => trackLeadFormFieldFocus('phone', analysisId)}
                      placeholder="+1 514 123 4567"
                      autoFocus
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quelle opportunité vous intéresse? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'digital', label: 'Présence digitale' },
                        { value: 'value', label: 'Création de valeur' },
                        { value: 'management', label: 'Gestion business' },
                        {
                          value: 'all',
                          label: '⭐ Les 3 opportunités (recommandé)',
                          highlight: true,
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 border-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                            formData.opportunity === option.value
                              ? option.highlight
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-cyan-500 bg-cyan-50'
                              : 'border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="opportunity"
                            value={option.value}
                            checked={formData.opportunity === option.value}
                            onChange={(e) => handleChange('opportunity', e.target.value)}
                            className="mr-3"
                          />
                          <span
                            className={
                              option.highlight && formData.opportunity === option.value
                                ? 'text-indigo-900 font-semibold'
                                : 'text-gray-800'
                            }
                          >
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{submitError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  ← Retour
                </button>
                <PulsingButton
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  rightIcon={<span>✓</span>}
                >
                  🎁 Réserver ma consultation
                </PulsingButton>
              </div>

              <p className="text-xs text-gray-500 text-center">
                🔒 Vos données sont sécurisées et conformes au RGPD
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust Signals */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>SSL Sécurisé</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Données protégées</span>
        </div>
      </div>
    </div>
  );
}
