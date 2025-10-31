import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  variant?: "default" | "highlighted";
  className?: string;
  hoverable?: boolean;
}

/**
 * GlassmorphicCard Component
 *
 * Modern card with glassmorphism effect (backdrop blur + semi-transparent background).
 * Perfect for Blueprint design aesthetic.
 *
 * @param children - Card content
 * @param variant - 'default' (white border) or 'highlighted' (cyan border)
 * @param className - Additional Tailwind classes
 * @param hoverable - Enable hover lift effect
 */
export default function GlassmorphicCard({
  children,
  variant = "default",
  className = "",
  hoverable = true,
}: GlassmorphicCardProps) {
  const baseStyles = "rounded-xl p-6 backdrop-blur-lg";

  const backgroundStyles =
    variant === "highlighted"
      ? "bg-white/10 border-2 border-cyan-500/30"
      : "bg-white/10 border border-white/20";

  const hoverStyles = hoverable
    ? "transition-all duration-300 hover:bg-white/15 hover:-translate-y-1 hover:shadow-lg"
    : "";

  return (
    <div className={cn(baseStyles, backgroundStyles, hoverStyles, className)}>
      {children}
    </div>
  );
}

/**
 * GlassmorphicInput Component
 *
 * Input field with glassmorphism styling.
 * Used for homepage URL input and valorisation input.
 */
export function GlassmorphicInput({
  className = "",
  focusGlow = "cyan",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  focusGlow?: "cyan" | "amber" | "emerald";
}) {
  const glowColors = {
    cyan: "focus:border-cyan-500 focus:shadow-glow-cyan",
    amber: "focus:border-amber-500 focus:shadow-glow-amber",
    emerald: "focus:border-emerald-500 focus:shadow-glow-emerald",
  };

  return (
    <input
      {...props}
      className={cn(
        // Base styles
        "w-full rounded-xl px-6 py-4 text-lg font-body",
        "bg-white/10 backdrop-blur-lg border-2 border-slate-300",
        "placeholder:text-slate-400 text-slate-900",
        "outline-none",
        // Transition
        "transition-all duration-300",
        // Focus state
        glowColors[focusGlow],
        className
      )}
    />
  );
}

/**
 * GlassmorphicTextarea Component
 *
 * Textarea with glassmorphism styling.
 */
export function GlassmorphicTextarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        // Base styles
        "w-full rounded-xl px-6 py-4 text-lg font-body",
        "bg-white/10 backdrop-blur-lg border-2 border-slate-300",
        "placeholder:text-slate-400 text-slate-900",
        "outline-none resize-y min-h-[120px]",
        // Transition
        "transition-all duration-300",
        // Focus state
        "focus:border-cyan-500 focus:shadow-glow-cyan",
        className
      )}
    />
  );
}
