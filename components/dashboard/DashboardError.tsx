// components/dashboard/DashboardError.tsx
// Error state for dashboard

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface DashboardErrorProps {
  error: Error;
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  if (error.message.includes('404')) {
    return (
      <div className="text-center py-12" data-testid="dashboard-error">
        <h2 className="font-heading font-bold text-2xl mb-2">Analyse introuvable</h2>
        <p className="text-slate-600 mb-4">Cette analyse n&apos;existe pas ou a expiré.</p>
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto" data-testid="dashboard-error">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="text-red-500" size={24} />
        <h3 className="font-semibold text-red-900 text-lg">Erreur de chargement</h3>
      </div>
      <p className="text-red-700 mb-4">{error.message}</p>
      <button onClick={reset} className="btn-secondary" data-testid="retry-button">
        Réessayer
      </button>
    </div>
  );
}
