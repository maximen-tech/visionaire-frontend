import React from "react";
import { cn } from "@/lib/utils";

interface PulsingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

/**
 * PulsingButton Component
 *
 * Signature CTA button with animated glow effect.
 * Perfect for primary actions (e.g., "Dessiner mon blueprint").
 *
 * @param children - Button text
 * @param variant - 'primary' (amber gradient) or 'secondary' (cyan gradient)
 * @param size - Button size: 'sm', 'md', 'lg'
 * @param leftIcon - Icon to display on the left
 * @param rightIcon - Icon to display on the right
 * @param loading - Show loading spinner
 * @param className - Additional Tailwind classes
 */
export default function PulsingButton({
  children,
  variant = "primary",
  size = "lg",
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  className = "",
  ...props
}: PulsingButtonProps) {
  // Base styles
  const baseStyles = [
    "inline-flex items-center justify-center gap-3",
    "font-heading font-bold tracking-tight",
    "rounded-full",
    "transition-all duration-300",
    "focus:outline-none focus:ring-4",
    "active:scale-98",
  ];

  // Size variants
  const sizeStyles = {
    sm: "px-6 py-2 text-base",
    md: "px-8 py-3 text-lg",
    lg: "px-10 py-4 text-xl",
  };

  // Color variants
  const variantStyles = {
    primary: [
      "bg-gradient-to-r from-amber-500 to-amber-600",
      "text-slate-900",
      "shadow-glow-amber",
      "hover:from-amber-600 hover:to-amber-700 hover:scale-105 hover:shadow-xl",
      "focus:ring-amber-300",
      "animate-glow-pulse",
    ],
    secondary: [
      "bg-gradient-to-r from-cyan-500 to-cyan-600",
      "text-white",
      "shadow-glow-cyan",
      "hover:from-cyan-600 hover:to-cyan-700 hover:scale-105 hover:shadow-xl",
      "focus:ring-cyan-300",
      "animate-glow-pulse",
    ],
  };

  // Disabled state
  const disabledStyles = [
    "opacity-50",
    "cursor-not-allowed",
    "hover:scale-100",
    "active:scale-100",
    "animate-none",
  ];

  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isDisabled && disabledStyles,
        className
      )}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {/* Left Icon */}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

      {/* Button Text */}
      <span>{loading ? "En cours..." : children}</span>

      {/* Right Icon */}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}

/**
 * PulsingIconButton Component
 *
 * Icon-only button with glow effect.
 * Perfect for small actions (e.g., close, back).
 */
export function PulsingIconButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Omit<PulsingButtonProps, "leftIcon" | "rightIcon" | "loading">) {
  const sizeStyles = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const variantStyles = {
    primary: [
      "bg-gradient-to-r from-amber-500 to-amber-600",
      "text-slate-900",
      "shadow-glow-amber",
      "hover:from-amber-600 hover:to-amber-700 hover:scale-110",
      "focus:ring-amber-300",
    ],
    secondary: [
      "bg-gradient-to-r from-cyan-500 to-cyan-600",
      "text-white",
      "shadow-glow-cyan",
      "hover:from-cyan-600 hover:to-cyan-700 hover:scale-110",
      "focus:ring-cyan-300",
    ],
  };

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full",
        "transition-all duration-300",
        "focus:outline-none focus:ring-4",
        "active:scale-95",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
