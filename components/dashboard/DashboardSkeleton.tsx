// components/dashboard/DashboardSkeleton.tsx
// Loading skeleton for dashboard

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse" data-testid="dashboard-skeleton">
      {/* Progress Section Skeleton */}
      <div className="lg:col-span-1 space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
        <div className="h-48 bg-slate-200 rounded"></div>
        <div className="h-48 bg-slate-200 rounded"></div>
        <div className="h-48 bg-slate-200 rounded"></div>
      </div>

      {/* Badges Section Skeleton */}
      <div className="lg:col-span-1 space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Metrics Section Skeleton */}
      <div className="lg:col-span-1 space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="h-24 bg-slate-200 rounded"></div>
        <div className="h-24 bg-slate-200 rounded"></div>
        <div className="h-40 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}
