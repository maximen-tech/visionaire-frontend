// components/dashboard/DashboardHeader.tsx
// Dashboard header with company name and meta info

interface DashboardHeaderProps {
  companyName: string;
  completionPercentage: number;
  lastUpdated?: string;
}

export default function DashboardHeader({
  companyName,
  completionPercentage,
  lastUpdated,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-heading font-bold text-3xl mb-2">
        Tableau de bord - {companyName}
      </h1>
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div>
          Progression: <span className="font-semibold text-cyan-600">{completionPercentage}%</span>
        </div>
        {lastUpdated && (
          <div>
            Dernière mise à jour: <span className="font-medium">{lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
}
