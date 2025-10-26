"use client";

import { useState } from "react";
import { enableEmailNotification } from "@/lib/api";

interface EmailNotificationButtonProps {
  analysisId: string;
}

export default function EmailNotificationButton({
  analysisId,
}: EmailNotificationButtonProps) {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await enableEmailNotification(analysisId, { email });
      setIsSuccess(true);
      setShowForm(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'activation de la notification"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-xl">✅</span>
          <div>
            <p className="text-green-900 font-semibold">
              Notification activée !
            </p>
            <p className="text-green-700 text-sm">
              Vous recevrez un email à {email} quand l&apos;analyse sera
              terminée.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              📧 Recevoir une notification
            </h4>
            <p className="text-blue-700 text-sm">
              Vous pouvez fermer cette page. Nous vous enverrons un email quand
              l&apos;analyse sera terminée.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Activer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-semibold text-blue-900 mb-3">
        📧 Notification par email
      </h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-blue-900 mb-1"
          >
            Votre email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="votre@email.com"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Activation..." : "Activer"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 bg-white text-blue-700 border border-blue-300 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
