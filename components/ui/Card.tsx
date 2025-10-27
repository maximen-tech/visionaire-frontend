import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'feature' | 'outlined';
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hoverable = false, className, children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-xl p-6';

    const variantStyles = {
      default: 'border border-gray-200 shadow-sm',
      feature: 'border border-gray-200 shadow-sm',
      outlined: 'border-2 border-gray-300',
    };

    const hoverStyles = hoverable ? 'hover:shadow-md transition-all duration-300 hover:-translate-y-1' : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold text-gray-900', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-gray-600 leading-relaxed', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';
