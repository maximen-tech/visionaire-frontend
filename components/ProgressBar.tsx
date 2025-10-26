// Composant ProgressBar - Affiche la progression de l'analyse (0-100%)

interface ProgressBarProps {
  progress: number; // 0-100
  status: string;
}

export default function ProgressBar({ progress, status }: ProgressBarProps) {
  // Déterminer la couleur en fonction du statut
  const getProgressColor = () => {
    if (status === "COMPLETE") return "bg-green-500";
    if (status === "FAILED") return "bg-red-500";
    if (status.startsWith("RUNNING")) return "bg-indigo-600";
    return "bg-gray-400";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progression de l&apos;analyse
        </span>
        <span className="text-sm font-medium text-gray-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        {status === "INITIATED" && "Initialisation..."}
        {status === "RUNNING_A1" && "Phase A1 - Identification en cours..."}
        {status === "RUNNING_A2" && "Phase A2 - Scoring en cours..."}
        {status === "COMPLETE" && "✅ Analyse terminée avec succès"}
        {status === "FAILED" && "❌ Échec de l'analyse"}
      </div>
    </div>
  );
}
