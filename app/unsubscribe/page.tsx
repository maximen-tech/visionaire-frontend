'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [email, setEmail] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [showReasonInput, setShowReasonInput] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    // Check current unsubscribe status
    fetch(`/api/email/unsubscribe?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error');
        } else {
          setEmail(data.email);
          if (data.unsubscribed) {
            setStatus('already');
          } else {
            setStatus('loading');
          }
        }
      })
      .catch(() => {
        setStatus('error');
      });
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          reason: reason || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.alreadyUnsubscribed) {
          setStatus('already');
        } else {
          setStatus('success');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Gestion des Abonnements
            </h1>
            <p className="text-lg text-slate-600">
              Vision'AI're - L'Architecte du Temps
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            {/* Invalid Token */}
            {status === 'error' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
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
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Lien Invalide
                </h2>
                <p className="text-slate-600 mb-6">
                  Ce lien de désabonnement n'est pas valide ou a expiré.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Retour à l'accueil
                </Link>
              </div>
            )}

            {/* Already Unsubscribed */}
            {status === 'already' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Déjà Désabonné
                </h2>
                <p className="text-slate-600 mb-2">
                  L'adresse <strong>{email}</strong> est déjà désabonnée de nos communications.
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Vous ne recevrez plus d'emails de notre part.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Retour à l'accueil
                </Link>
              </div>
            )}

            {/* Success */}
            {status === 'success' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Désabonnement Confirmé
                </h2>
                <p className="text-slate-600 mb-2">
                  L'adresse <strong>{email}</strong> a été retirée de notre liste d'envoi.
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Vous ne recevrez plus d'emails automatisés de Vision'AI're.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-700">
                    Nous sommes désolés de vous voir partir. Si vous changez d'avis ou si
                    vous avez des questions, n'hésitez pas à{' '}
                    <Link href="/contact" className="text-cyan-600 hover:text-cyan-700 underline">
                      nous contacter
                    </Link>
                    .
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Retour à l'accueil
                </Link>
              </div>
            )}

            {/* Confirm Unsubscribe */}
            {status === 'loading' && email && (
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-amber-600"
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
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Confirmer le Désabonnement
                </h2>
                <p className="text-slate-600 mb-6">
                  Voulez-vous vraiment vous désabonner de nos communications?
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>Adresse email:</strong> {email}
                  </p>
                  <p className="text-sm text-slate-600">
                    Vous ne recevrez plus d'emails automatisés de Vision'AI're concernant
                    votre analyse et nos recommandations.
                  </p>
                </div>

                {/* Optional Reason */}
                {!showReasonInput && (
                  <button
                    onClick={() => setShowReasonInput(true)}
                    className="text-sm text-cyan-600 hover:text-cyan-700 underline mb-4"
                  >
                    Dites-nous pourquoi (optionnel)
                  </button>
                )}

                {showReasonInput && (
                  <div className="mb-6">
                    <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                      Raison du désabonnement (optionnel)
                    </label>
                    <textarea
                      id="reason"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Vos commentaires nous aident à améliorer notre service..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Annuler
                  </Link>
                  <button
                    onClick={handleUnsubscribe}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Confirmer le Désabonnement
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Legal Notice */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              Conformément à la Loi canadienne anti-pourriel (C-28), vous pouvez vous
              désabonner à tout moment.
            </p>
            <p className="mt-2">
              Pour toute question:{' '}
              <Link href="/contact" className="text-cyan-600 hover:text-cyan-700 underline">
                nous contacter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-slate-600">Chargement...</div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
