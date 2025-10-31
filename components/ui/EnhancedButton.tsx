"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  success?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

export function EnhancedButton({
  variant = "primary",
  size = "md",
  loading = false,
  success = false,
  magnetic = true,
  className,
  children,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic pull effect (subtle)
    setMagnetOffset({
      x: x * 0.15,
      y: y * 0.15,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMagnetOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Ripple effect
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    }

    props.onClick?.(e);
  };

  const baseClasses = cn(
    "relative overflow-hidden font-medium rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      // Variants
      "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg hover:shadow-xl focus:ring-cyan-500":
        variant === "primary",
      "bg-slate-100 dark:bg-dark-bg-secondary text-slate-900 dark:text-dark-text-primary hover:bg-slate-200 dark:hover:bg-dark-bg-tertiary focus:ring-slate-500":
        variant === "secondary",
      "border-2 border-slate-300 dark:border-dark-border-medium text-slate-700 dark:text-dark-text-primary hover:bg-slate-50 dark:hover:bg-dark-bg-tertiary focus:ring-slate-500":
        variant === "outline",
      "text-slate-700 dark:text-dark-text-primary hover:bg-slate-100 dark:hover:bg-dark-bg-tertiary focus:ring-slate-500":
        variant === "ghost",

      // Sizes
      "px-3 py-1.5 text-sm": size === "sm",
      "px-4 py-2 text-base": size === "md",
      "px-6 py-3 text-lg": size === "lg",
    }
  );

  return (
    <motion.button
      ref={buttonRef}
      className={cn(baseClasses, className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled || loading}
      animate={{
        x: magnetOffset.x,
        y: magnetOffset.y,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <motion.svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}

        {success && (
          <motion.svg
            className="w-5 h-5 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        )}

        {!loading && !success && children}
      </span>

      {/* Glow effect on hover */}
      {isHovering && variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-0"
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
