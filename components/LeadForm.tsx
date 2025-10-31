"use client";

import { useState, useEffect } from "react";
import { convertLead, scheduleDripCampaign } from "@/lib/api";
import type { LeadConversionRequest } from "@/lib/types";
import {
  trackLeadSubmit,
  trackLeadSubmitSuccess,
  trackLeadSubmitError,
} from "@/lib/analytics";
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePhone,
  checkRateLimit,
} from "@/lib/security/sanitize";
import PulsingButton from "@/components/design-system/PulsingButton";

interface LeadFormProps {
  analysisId: string;
  totalHoursPerYear?: number;
}

export default function LeadForm({ analysisId, totalHoursPerYear }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    opportunity: "all", // Pre-select "all opportunities"
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [hoursLost, setHoursLost] = useState(0);

  // Urgency counter - simulate hours lost while reading
  useEffect(() => {
    const interval = setInterval(() => {
      setHoursLost((prev) => prev + 0.01); // Increment by 0.01h every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Client-side rate limiting (5 attempts per minute)
    const rateLimitCheck = checkRateLimit('lead-form-submit', 5, 60000);
    if (!rateLimitCheck.allowed) {
      setError("Trop de tentatives. Veuillez attendre quelques instants avant de réessayer.");
      setIsSubmitting(false);
      return;
    }

    // Sanitize and validate inputs
    const sanitizedName = sanitizeName(formData.name);
    const sanitizedEmail = sanitizeEmail(formData.email);
    const sanitizedPhone = sanitizePhone(formData.phone);
    const sanitizedCompany = sanitizeName(formData.company);

    // Validation errors
    if (!sanitizedName) {
      setError("Nom invalide. Veuillez entrer un nom valide (lettres, espaces, traits d'union uniquement).");
      setIsSubmitting(false);
      return;
    }

    if (!sanitizedEmail) {
      setError("Email invalide. Veuillez entrer une adresse email valide.");
      setIsSubmitting(false);
      return;
    }

    if (!sanitizedPhone) {
      setError("Numéro de téléphone invalide. Veuillez entrer un numéro à 10 chiffres.");
      setIsSubmitting(false);
      return;
    }

    if (!sanitizedCompany) {
      setError("Nom d'entreprise invalide. Veuillez entrer un nom valide.");
      setIsSubmitting(false);
      return;
    }

    // Track lead submission attempt
    trackLeadSubmit(analysisId, formData.opportunity);

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

      // Track successful submission
      trackLeadSubmitSuccess(analysisId, response.lead_id);

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
        // Don't block user flow - log only
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        opportunity: "all",
        newsletter: false,
      });

      // Optional: Show success message for a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "Erreur lors de l'envoi du formulaire";
      setError(errorMessage);

      // Track error
      trackLeadSubmitError(analysisId, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          Félicitations! Votre place est réservée
        </h3>
        <p className="text-green-700 text-lg mb-4">
          Nous avons bien reçu votre demande. Notre équipe vous contactera sous
          24h pour votre consultation GRATUITE de 300$.
        </p>
        <p className="text-green-600 text-sm">
          Vous recevrez un email de confirmation dans les prochaines minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scarcity Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 text-center">
        <p className="text-lg font-bold">
          ⏰ Seulement 3 places disponibles cette semaine
        </p>
        <p className="text-sm mt-1 opacity-90">
          Nous limitons nos consultations pour garantir un service de qualité
        </p>
      </div>

      {/* Urgency Counter */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-800 text-sm">
          Pendant que vous lisez cette page...
        </p>
        <p className="text-3xl font-bold text-red-600 mt-2">
          {hoursLost.toFixed(2)}h perdues
        </p>
        <p className="text-red-700 text-xs mt-1">
          Et ce chiffre continue d&apos;augmenter à chaque seconde
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border-2 border-indigo-200 rounded-lg p-8">
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg mb-4">
            🎁 Consultation 300$ GRATUITE
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Prêt à récupérer votre temps?
          </h3>
          <p className="text-gray-600">
            Réservez votre consultation gratuite avec nos experts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email professionnel <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="jean.dupont@entreprise.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="+1 514 123 4567"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom de l&apos;entreprise <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quelle opportunité vous intéresse? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="opportunity"
                  value="digital"
                  checked={formData.opportunity === "digital"}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-800">Présence digitale</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="opportunity"
                  value="value"
                  checked={formData.opportunity === "value"}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-800">Création de valeur</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="opportunity"
                  value="management"
                  checked={formData.opportunity === "management"}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-800">Gestion business</span>
              </label>
              <label className="flex items-center p-3 border-2 border-indigo-500 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer">
                <input
                  type="radio"
                  name="opportunity"
                  value="all"
                  checked={formData.opportunity === "all"}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-indigo-900 font-semibold">
                  ⭐ Les 3 opportunités (recommandé)
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={(e) =>
                setFormData({ ...formData, newsletter: e.target.checked })
              }
              className="mt-1 mr-2"
            />
            <label htmlFor="newsletter" className="text-sm text-gray-600">
              J&apos;accepte de recevoir des conseils et actualités par email
              (optionnel)
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <PulsingButton
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full"
            rightIcon={<span className="text-2xl">→</span>}
          >
            🎁 Réserver ma consultation GRATUITE
          </PulsingButton>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>SSL Sécurisé</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Données protégées</span>
            </div>
            <a href="/legal/privacy" className="hover:underline hover:text-gray-700">
              Politique de confidentialité
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mt-2">
            En soumettant ce formulaire, vous acceptez d&apos;être contacté par
            notre équipe. Vos données sont sécurisées et conformes au RGPD.
          </p>
        </form>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-bold text-gray-900 mb-4 text-center">
          Ce que disent nos clients
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              &quot;En 3 semaines, nous avons automatisé notre gestion de leads. Économie: 15h/semaine!&quot;
            </p>
            <p className="text-gray-600 text-xs">
              — Marie L., Directrice Marketing
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              &quot;Le ROI est dingue. Les outils recommandés ont transformé notre business.&quot;
            </p>
            <p className="text-gray-600 text-xs">
              — Pierre D., CEO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
