import React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', className, children, ...props }, ref) => {
    const baseStyles = 'p-4 rounded-lg border';

    const variantStyles = {
      success: 'bg-green-50 border-green-200 text-green-900',
      error: 'bg-red-50 border-red-200 text-red-900',
      warning: 'bg-orange-50 border-orange-200 text-orange-900',
      info: 'bg-blue-50 border-blue-200 text-blue-900',
    };

    const icons = {
      success: '✓',
      error: '⚠️',
      warning: '⚠',
      info: 'ℹ',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{icons[variant]}</span>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('font-semibold mb-1', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';
