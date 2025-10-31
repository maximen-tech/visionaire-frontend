"use client";

import { useState, useId, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onAnimationStart' | 'onAnimationEnd'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outlined" | "glass";
  glowColor?: string;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      glowColor = "rgba(0, 212, 255, 0.4)",
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const id = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const variantClasses = {
      default: "bg-white dark:bg-dark-bg-secondary border border-slate-200 dark:border-dark-border-medium",
      filled: "bg-slate-50 dark:bg-dark-bg-tertiary border border-transparent",
      outlined: "bg-transparent border-2 border-slate-300 dark:border-dark-border-medium",
      glass: "bg-white/40 dark:bg-dark-bg-secondary/40 backdrop-blur-sm border border-white/30 dark:border-dark-border-subtle",
    };

    return (
      <div className={cn("relative w-full", className)}>
        {/* Input container */}
        <div className="relative">
          {/* Glow effect on focus */}
          <AnimatePresence>
            {isFocused && !error && (
              <motion.div
                className="absolute -inset-0.5 rounded-lg pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, ${glowColor}, transparent)`,
                  filter: "blur(8px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Error glow */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="absolute -inset-0.5 rounded-lg pointer-events-none bg-red-500/20 blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          {/* Input wrapper */}
          <div className="relative">
            {/* Left icon */}
            {leftIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-tertiary pointer-events-none">
                {leftIcon}
              </div>
            )}

            {/* Input field */}
            <input
              ref={ref}
              id={id}
              className={cn(
                "w-full px-4 py-3 rounded-lg transition-all duration-200 outline-none",
                "text-slate-900 dark:text-dark-text-primary placeholder-slate-400 dark:placeholder-dark-text-tertiary",
                "focus:ring-2 focus:ring-cyan-500/50 dark:focus:ring-cyan-400/50",
                variantClasses[variant],
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                error && "border-red-500 dark:border-red-400",
                label && "pt-6",
                props.disabled && "opacity-50 cursor-not-allowed"
              )}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              onChange={handleChange}
              {...props}
            />

            {/* Animated floating label */}
            {label && (
              <motion.label
                htmlFor={id}
                className={cn(
                  "absolute left-4 pointer-events-none transition-colors duration-200",
                  leftIcon && "left-10",
                  isFocused || hasValue
                    ? "text-xs top-1.5 text-cyan-600 dark:text-cyan-400"
                    : "text-base top-1/2 -translate-y-1/2 text-slate-500 dark:text-dark-text-secondary",
                  error && "text-red-500 dark:text-red-400"
                )}
                animate={{
                  fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
                  top: isFocused || hasValue ? "0.375rem" : "50%",
                  y: isFocused || hasValue ? 0 : "-50%",
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                {label}
              </motion.label>
            )}

            {/* Right icon */}
            {rightIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-tertiary pointer-events-none">
                {rightIcon}
              </div>
            )}

            {/* Focus indicator line */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFocused ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ originX: 0.5 }}
            />
          </div>
        </div>

        {/* Helper text or error message */}
        <AnimatePresence mode="wait">
          {(error || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "mt-1.5 text-sm",
                error
                  ? "text-red-500 dark:text-red-400"
                  : "text-slate-500 dark:text-dark-text-secondary"
              )}
            >
              {error || helperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

// Textarea variant
interface EnhancedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onAnimationStart' | 'onAnimationEnd'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "filled" | "outlined" | "glass";
  glowColor?: string;
  rows?: number;
}

export const EnhancedTextarea = forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "default",
      glowColor = "rgba(0, 212, 255, 0.4)",
      rows = 4,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const id = useId();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const variantClasses = {
      default: "bg-white dark:bg-dark-bg-secondary border border-slate-200 dark:border-dark-border-medium",
      filled: "bg-slate-50 dark:bg-dark-bg-tertiary border border-transparent",
      outlined: "bg-transparent border-2 border-slate-300 dark:border-dark-border-medium",
      glass: "bg-white/40 dark:bg-dark-bg-secondary/40 backdrop-blur-sm border border-white/30 dark:border-dark-border-subtle",
    };

    return (
      <div className={cn("relative w-full", className)}>
        {/* Textarea container */}
        <div className="relative">
          {/* Glow effect on focus */}
          <AnimatePresence>
            {isFocused && !error && (
              <motion.div
                className="absolute -inset-0.5 rounded-lg pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, ${glowColor}, transparent)`,
                  filter: "blur(8px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Textarea wrapper */}
          <div className="relative">
            <textarea
              ref={ref}
              id={id}
              rows={rows}
              className={cn(
                "w-full px-4 py-3 rounded-lg transition-all duration-200 outline-none resize-none",
                "text-slate-900 dark:text-dark-text-primary placeholder-slate-400 dark:placeholder-dark-text-tertiary",
                "focus:ring-2 focus:ring-cyan-500/50 dark:focus:ring-cyan-400/50",
                variantClasses[variant],
                error && "border-red-500 dark:border-red-400",
                label && "pt-6",
                props.disabled && "opacity-50 cursor-not-allowed"
              )}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              onChange={handleChange}
              {...props}
            />

            {/* Animated floating label */}
            {label && (
              <motion.label
                htmlFor={id}
                className={cn(
                  "absolute left-4 pointer-events-none transition-colors duration-200",
                  isFocused || hasValue
                    ? "text-xs top-1.5 text-cyan-600 dark:text-cyan-400"
                    : "text-base top-4 text-slate-500 dark:text-dark-text-secondary",
                  error && "text-red-500 dark:text-red-400"
                )}
                animate={{
                  fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
                  top: isFocused || hasValue ? "0.375rem" : "1rem",
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                {label}
              </motion.label>
            )}

            {/* Focus indicator line */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFocused ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ originX: 0.5 }}
            />
          </div>
        </div>

        {/* Helper text or error message */}
        <AnimatePresence mode="wait">
          {(error || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "mt-1.5 text-sm",
                error
                  ? "text-red-500 dark:text-red-400"
                  : "text-slate-500 dark:text-dark-text-secondary"
              )}
            >
              {error || helperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea";
