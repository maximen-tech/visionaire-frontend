import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 text-base border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';

    const errorStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(baseStyles, errorStyles, className)}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('block text-sm font-medium text-gray-900 mb-2', className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';
