'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, requestTypeLabels, type ContactFormData } from '@/lib/validation/contact-schema';

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      requestType: 'question',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message');
      }

      setSubmitStatus('success');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.'
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Envoyez-nous un Message
        </h2>
        <p className="text-slate-600">
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.
        </p>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <h3 className="text-green-900 font-semibold">Message envoyé avec succès!</h3>
              <p className="text-green-700 text-sm mt-1">
                Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
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
            <div>
              <h3 className="text-red-900 font-semibold">Erreur lors de l'envoi</h3>
              <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Request Type */}
        <div>
          <label htmlFor="requestType" className="block text-sm font-medium text-slate-700 mb-2">
            Type de demande <span className="text-red-500">*</span>
          </label>
          <select
            id="requestType"
            {...register('requestType')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
              errors.requestType ? 'border-red-500' : 'border-slate-300'
            }`}
          >
            {Object.entries(requestTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.requestType && (
            <p className="mt-1 text-sm text-red-600">{errors.requestType.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="Jean Tremblay"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Adresse email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="jean.tremblay@exemple.ca"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Company & Phone (Row) */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              {...register('company')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                errors.company ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Mon Entreprise Inc."
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="514-123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
            Sujet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
              errors.subject ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="Question sur l'automatisation de mes processus"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${
              errors.message ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="Décrivez votre besoin ou votre question en détail..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
          <p className="mt-1 text-xs text-slate-500">
            Minimum 20 caractères, maximum 2000 caractères
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitStatus === 'loading'}
            className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
              submitStatus === 'loading'
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
            } text-white`}
          >
            {submitStatus === 'loading' ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Envoi en cours...
              </span>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-slate-500 text-center">
          En soumettant ce formulaire, vous acceptez notre{' '}
          <a href="/legal/privacy" className="text-cyan-600 hover:text-cyan-700 underline">
            politique de confidentialité
          </a>
          . Vos informations ne seront jamais partagées avec des tiers.
        </p>
      </form>
    </div>
  );
}
