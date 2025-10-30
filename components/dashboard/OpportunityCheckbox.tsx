// components/dashboard/OpportunityCheckbox.tsx
// Custom checkbox for task status tracking

import { Check, Loader2 } from 'lucide-react';
import type { TaskStatus } from '@/lib/types/dashboard';

interface OpportunityCheckboxProps {
  status: TaskStatus;
  onChange: (newStatus: TaskStatus) => Promise<void>;
  opportunityType: string;
  disabled?: boolean;
}

export default function OpportunityCheckbox({
  status,
  onChange,
  opportunityType,
  disabled = false,
}: OpportunityCheckboxProps) {
  const isNotStarted = status === 'NOT_STARTED';
  const isInProgress = status === 'IN_PROGRESS';
  const isImplemented = status === 'IMPLEMENTED';

  const handleClick = async () => {
    if (disabled) return;

    let newStatus: TaskStatus;
    if (isNotStarted) {
      newStatus = 'IN_PROGRESS';
    } else if (isInProgress) {
      newStatus = 'IMPLEMENTED';
    } else {
      newStatus = 'NOT_STARTED'; // cycle back
    }

    await onChange(newStatus);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      data-testid={`task-checkbox-${opportunityType}`}
      aria-label={`Marquer comme ${isNotStarted ? 'en cours' : isInProgress ? 'terminé' : 'non commencé'}`}
      className="w-6 h-6 rounded border-2 border-slate-300 flex items-center justify-center transition-all hover:border-cyan-500 focus-visible:outline-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: isImplemented ? '#06b6d4' : isInProgress ? '#fbbf24' : 'transparent',
        borderColor: isImplemented ? '#06b6d4' : isInProgress ? '#fbbf24' : '#cbd5e1',
      }}
    >
      {isImplemented && <Check size={16} className="text-white" />}
      {isInProgress && <Loader2 size={14} className="text-white animate-spin" />}
    </button>
  );
}
