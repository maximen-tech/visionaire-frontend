// components/dashboard/DashboardLayout.tsx
// Main layout container for dashboard (3-column responsive grid)

import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({ children, className = '' }: DashboardLayoutProps) {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`} data-testid="dashboard-layout">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
