'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertLead, scheduleDripCampaign } from '@/lib/api';
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
import { useABTrack } from '@/lib/hooks/useABTest';

interface ProgressiveLeadFormProps {
  analysisId: string;
  totalHoursPerYear?: number;
}

interface FormData {
  email: string;
  name: string;
  company: string;
  phone: string;
  opportunity: string;
}

export default function ProgressiveLeadForm({ analysisId, totalHoursPerYear }: ProgressiveLeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    phone: '',
    opportunity: 'all',
  });
  const [fieldValidity, setFieldValidity] = useState({
    email: false,
    name: false,
    company: false,
    phone: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const trackEvent = useABTrack('lead_form_test');

  // Validate individual fields
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateCompany = (company: string): boolean => {
    return company.trim().length >= 2;
  };

  const validatePhone = (phone: string): boolean => {
    return /^\+?[\d\s\-()]{10,}$/.test(phone);
  };

  // Update field validity
  useEffect(() => {
    setFieldValidity({
      email: validateEmail(formData.email),
      name: validateName(formData.name),
      company: validateCompany(formData.company),
      phone: validatePhone(formData.phone),
    });
  }, [formData]);

  // Auto-focus next field when current is valid
  useEffect(() => {
    if (fieldValidity.email && !fieldValidity.name && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 300);
      trackEvent('name_field_revealed');
    }
  }, [fieldValidity.email, fieldValidity.name, trackEvent]);

  useEffect(() => {
    if (fieldValidity.name && !fieldValidity.company && companyInputRef.current) {
      setTimeout(() => companyInputRef.current?.focus(), 300);
    }
  }, [fieldValidity.name, fieldValidity.company]);

  useEffect(() => {
    if (fieldValidity.email && fieldValidity.name && fieldValidity.company && !fieldValidity.phone && phoneInputRef.current) {
      setTimeout(() => phoneInputRef.current?.focus(), 300);
      trackEvent('phone_field_revealed');
    }
  }, [fieldValidity.email, fieldValidity.name, fieldValidity.company, fieldValidity.phone, trackEvent]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!fieldValidity.email || !fieldValidity.name || !fieldValidity.company || !fieldValidity.phone) {
      setSubmitError('Veuillez remplir tous les champs requis');
      trackEvent('incomplete_submission');
      return;
    }

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

    // Track submission
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

      // Schedule drip campaign (FE-015)
      scheduleDripCampaign({
        email: sanitizedEmail,
        name: sanitizedName,
        company: sanitizedCompany,
        analysisId,
        totalHoursPerYear,
        opportunity: formData.opportunity,
      }).catch((err) => {
        console.error('Drip campaign scheduling failed:', err);
      });
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

  // Determine which fields to show
  const showNameAndCompany = fieldValidity.email;
  const showPhoneAndOpportunity = fieldValidity.email && fieldValidity.name && fieldValidity.company;
  const canSubmit = fieldValidity.email && fieldValidity.name && fieldValidity.company && fieldValidity.phone;

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
          <p className="text-gray-600">Réservez votre consultation en quelques secondes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (always visible) */}
          <motion.div
            initial={{ opacity: 1 }}
            className="relative"
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email professionnel <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onFocus={() => trackLeadFormFieldFocus('email', analysisId)}
                placeholder="jean.dupont@entreprise.com"
                autoFocus
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
              {fieldValidity.email && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Name & Company (revealed when email valid) */}
          <AnimatePresence>
            {showNameAndCompany && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      ref={nameInputRef}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onFocus={() => trackLeadFormFieldFocus('name', analysisId)}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                    {fieldValidity.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative overflow-hidden"
                >
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="company"
                      ref={companyInputRef}
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      onFocus={() => trackLeadFormFieldFocus('company', analysisId)}
                      placeholder="Nom de votre entreprise"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                    {fieldValidity.company && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Phone & Opportunity (revealed when name+company valid) */}
          <AnimatePresence>
            {showPhoneAndOpportunity && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden"
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      ref={phoneInputRef}
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onFocus={() => trackLeadFormFieldFocus('phone', analysisId)}
                      placeholder="+1 514 123 4567"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                    {fieldValidity.phone && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative overflow-hidden"
                >
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
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {submitError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p className="text-red-800 text-sm">{submitError}</p>
            </motion.div>
          )}

          <AnimatePresence>
            {canSubmit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PulsingButton
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  rightIcon={<span>✓</span>}
                >
                  🎁 Réserver ma consultation GRATUITE
                </PulsingButton>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-gray-500 text-center">
            🔒 Vos données sont sécurisées et conformes au RGPD
          </p>
        </form>
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
