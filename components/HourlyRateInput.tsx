'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HourlyRateInputProps {
  value: number | null;
  onChange: (rate: number | null) => void;
  className?: string;
}

/**
 * HourlyRateInput Component
 *
 * Input field for hourly rate with validation ($20-$500 CAD range).
 * Includes real-time error messages and Quebec-style formatting hints.
 *
 * @param value - Current hourly rate value (null if not set)
 * @param onChange - Callback when valid rate is entered (null if invalid)
 * @param className - Additional CSS classes
 */
export default function HourlyRateInput({
  value,
  onChange,
  className = '',
}: HourlyRateInputProps) {
  const [inputValue, setInputValue] = useState(value?.toString() || '');
  const [error, setError] = useState<string | null>(null);

  const validateAndUpdate = (rawValue: string) => {
    setInputValue(rawValue);

    // Empty input - reset to null
    if (!rawValue.trim()) {
      onChange(null);
      setError(null);
      return;
    }

    // Parse number
    const numericValue = parseFloat(rawValue);

    // Validation: Must be a number
    if (isNaN(numericValue)) {
      setError('Veuillez entrer un nombre valide');
      onChange(null);
      return;
    }

    // Validation: Range $20-$500/h
    if (numericValue < 20) {
      setError('Le taux horaire minimum est de 20 $ CAD');
      onChange(null);
      return;
    }

    if (numericValue > 500) {
      setError('Le taux horaire maximum est de 500 $ CAD');
      onChange(null);
      return;
    }

    // Valid - update parent
    setError(null);
    onChange(numericValue);
  };

  return (
    <div className={`${className}`}>
      <label
        htmlFor="hourly-rate"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        💰 Quel est votre taux horaire?
      </label>

      <div className="relative">
        <input
          id="hourly-rate"
          type="number"
          min="20"
          max="500"
          step="5"
          value={inputValue}
          onChange={(e) => validateAndUpdate(e.target.value)}
          placeholder="Ex: 75"
          className={`
            w-full px-4 py-3 pr-16
            bg-white dark:bg-gray-800
            border-2 rounded-lg
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-colors
            ${error
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
          aria-describedby={error ? 'hourly-rate-error' : 'hourly-rate-help'}
          aria-invalid={!!error}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            $ CAD/h
          </span>
        </div>
      </div>

      {/* Help Text */}
      {!error && (
        <p
          id="hourly-rate-help"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Entrez votre taux horaire entre 20 $ et 500 $ CAD pour calculer la valeur monétaire des opportunités.
        </p>
      )}

      {/* Error Message */}
      {error && (
        <motion.p
          id="hourly-rate-error"
          className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}
