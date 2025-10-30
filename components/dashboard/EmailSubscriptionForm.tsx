// components/dashboard/EmailSubscriptionForm.tsx
// Email subscription form for progress reports

'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { subscribeToReports } from '@/lib/api/dashboard';
import type { SubscribeRequest } from '@/lib/types/dashboard';

interface EmailSubscriptionFormProps {
  analysisId: string;
  defaultEmail?: string;
}

export default function EmailSubscriptionForm({ analysisId, defaultEmail = '' }: EmailSubscriptionFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validation
    if (!email) {
      setErrorMessage('Email requis');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Email invalide');
      return;
    }

    setIsSubmitting(true);

    try {
      const data: SubscribeRequest = {
        email,
        frequency,
      };

      if (hourlyRate && parseFloat(hourlyRate) > 0) {
        data.hourly_rate = parseFloat(hourlyRate);
      }

      const response = await subscribeToReports(analysisId, data);
      setSuccessMessage(`Abonnement confirmé! Prochain rapport: ${new Date(response.next_email_date).toLocaleDateString('fr-CA')}`);

      // Reset form
      setEmail('');
      setHourlyRate('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erreur lors de l\'abonnement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-100 rounded-full p-2">
          <Mail size={20} className="text-purple-600" />
        </div>
        <h3 className="font-heading font-bold text-lg">Rapports de progrès</h3>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Recevez des rapports réguliers sur vos économies de temps par email.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-colors"
            required
          />
        </div>

        {/* Frequency selector */}
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-slate-700 mb-1">
            Fréquence
          </label>
          <select
            id="frequency"
            data-testid="frequency-select"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'weekly' | 'monthly')}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-colors"
          >
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuel</option>
          </select>
        </div>

        {/* Hourly rate (optional) */}
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-700 mb-1">
            Tarif horaire (optionnel)
          </label>
          <div className="relative">
            <input
              type="number"
              id="hourlyRate"
              data-testid="hourly-rate-input"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="75"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              $ CAD/h
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pour calculer vos économies en argent
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          data-testid="subscribe-button"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Abonnement...
            </>
          ) : (
            <>
              <Send size={20} />
              S&apos;abonner
            </>
          )}
        </button>
      </form>

      {/* Success message */}
      {successMessage && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3" data-testid="toast-success">
          <p className="text-sm text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
