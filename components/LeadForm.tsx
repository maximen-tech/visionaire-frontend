"use client";

import { useState, useEffect } from "react";
import { convertLead } from "@/lib/api";
import type { LeadConversionRequest } from "@/lib/types";

interface LeadFormProps {
  analysisId: string;
}

export default function LeadForm({ analysisId }: LeadFormProps) {
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

    try {
      const payload: LeadConversionRequest = {
        analysis_id: analysisId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
      };

      const response = await convertLead(payload);
      setIsSuccess(true);

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
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi du formulaire"
      );
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-bold rounded-lg hover:from-indigo-700 hover:to-indigo-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            {isSubmitting
              ? "Envoi en cours..."
              : "🎁 Réserver ma consultation GRATUITE"}
          </button>

          <p className="text-xs text-gray-500 text-center">
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
