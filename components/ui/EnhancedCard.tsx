"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltEnabled?: boolean;
  glowEnabled?: boolean;
  variant?: "default" | "bordered" | "elevated" | "glass";
  interactive?: boolean;
}

export function EnhancedCard({
  children,
  className,
  tiltEnabled = true,
  glowEnabled = true,
  variant = "default",
  interactive = true,
}: EnhancedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configs for smooth animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  // Glow position
  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !interactive) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const variantClasses = {
    default: "bg-white dark:bg-dark-bg-secondary border border-slate-200 dark:border-dark-border-medium",
    bordered: "bg-white dark:bg-dark-bg-secondary border-2 border-slate-300 dark:border-dark-border-strong",
    elevated: "bg-white dark:bg-dark-bg-secondary shadow-depth-md hover:shadow-depth-lg",
    glass: "bg-white/60 dark:bg-dark-bg-secondary/60 backdrop-blur-sm border border-white/20 dark:border-dark-border-subtle",
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-xl p-6 overflow-hidden transition-all duration-300",
        variantClasses[variant],
        interactive && "cursor-pointer",
        className
      )}
      style={{
        rotateX: tiltEnabled && interactive ? rotateX : 0,
        rotateY: tiltEnabled && interactive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { scale: 1.02 } : {}}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
        scale: { duration: 0.2 },
      }}
    >
      {/* Glow effect */}
      {glowEnabled && isHovering && interactive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${glowX}px ${glowY}px, rgba(0, 212, 255, 0.15), transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Shimmer effect on hover */}
      {isHovering && interactive && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-200%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Content with subtle 3D transform */}
      <div
        style={{
          transform: tiltEnabled && interactive ? "translateZ(20px)" : undefined,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>

      {/* Border glow */}
      {isHovering && interactive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
}

// Card variants for specific use cases
export function FeatureCard({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <EnhancedCard className={className} variant="elevated">
      {icon && (
        <div className="mb-4 p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 w-fit">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-dark-text-secondary">{description}</p>
    </EnhancedCard>
  );
}

export function MetricCard({
  value,
  label,
  trend,
  icon,
  className,
}: {
  value: string | number;
  label: string;
  trend?: { value: number; isPositive: boolean };
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <EnhancedCard className={className} variant="default">
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20">
            {icon}
          </div>
        )}
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
              trend.isPositive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-dark-text-primary mb-1">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-dark-text-secondary">{label}</div>
    </EnhancedCard>
  );
}
