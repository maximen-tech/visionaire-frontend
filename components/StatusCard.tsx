// Composant StatusCard - Affiche le statut actuel et les métadonnées de l'analyse

interface StatusCardProps {
  analysisId: string;
  url: string;
  status: string;
  createdAt?: string;
}

export default function StatusCard({
  analysisId,
  url,
  status,
  createdAt,
}: StatusCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "INITIATED":
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            🔄 Initialisé
          </span>
        );
      case "RUNNING_A1":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-pulse">
            🔍 Phase A1
          </span>
        );
      case "RUNNING_A2":
        return (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium animate-pulse">
            📊 Phase A2
          </span>
        );
      case "COMPLETE":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✅ Terminé
          </span>
        );
      case "FAILED":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            ❌ Échoué
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyse en cours
          </h2>
          {getStatusBadge()}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-500">URL analysée</span>
          <p className="text-sm text-gray-900 break-all mt-1">{url}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500">ID Analyse</span>
            <p className="text-xs text-gray-700 font-mono mt-1">
              {analysisId}
            </p>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">
              Démarrée le
            </span>
            <p className="text-xs text-gray-700 mt-1">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
