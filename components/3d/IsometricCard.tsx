"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IsometricCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  depth?: number;
  hoverLift?: boolean;
}

export function IsometricCard({
  children,
  className,
  color = "#00D4FF",
  depth = 20,
  hoverLift = true,
}: IsometricCardProps) {
  return (
    <motion.div
      className={cn("relative group", className)}
      style={{
        perspective: "1000px",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverLift ? { y: -10, scale: 1.02 } : {}}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {/* Isometric depth layers */}
      <div className="relative">
        {/* Shadow/depth layers */}
        {Array.from({ length: depth / 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-lg"
            style={{
              transform: `translateX(${i * 2}px) translateY(${i * 2}px)`,
              opacity: 0.05 - i * 0.01,
              backgroundColor: color,
              zIndex: -depth + i,
            }}
          />
        ))}

        {/* Main card */}
        <div
          className="relative bg-white dark:bg-dark-bg-secondary rounded-lg p-6 border border-slate-200 dark:border-dark-border-medium shadow-depth-lg overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Isometric top edge */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-20"
            style={{
              backgroundColor: color,
              transform: "rotateX(90deg) translateZ(-0.5px)",
            }}
          />

          {/* Isometric right edge */}
          <div
            className="absolute top-0 right-0 bottom-0 w-1 opacity-20"
            style={{
              backgroundColor: color,
              transform: "rotateY(90deg) translateZ(-0.5px)",
            }}
          />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}15, transparent)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Isometric grid layout
interface IsometricGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function IsometricGrid({
  children,
  columns = 3,
  className,
}: IsometricGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-8", gridClasses[columns], className)}>
      {children}
    </div>
  );
}

// Feature card with isometric style
interface IsometricFeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  index?: number;
}

export function IsometricFeatureCard({
  title,
  description,
  icon,
  color = "#00D4FF",
  index = 0,
}: IsometricFeatureCardProps) {
  return (
    <IsometricCard color={color}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          ease: "easeOut",
        }}
      >
        {/* Icon */}
        {icon && (
          <div
            className="mb-4 p-3 rounded-lg w-fit"
            style={{
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-dark-text-primary mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-dark-text-secondary">{description}</p>

        {/* Decorative corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </IsometricCard>
  );
}

// Metric card with isometric style
interface IsometricMetricCardProps {
  value: string | number;
  label: string;
  trend?: { value: number; isPositive: boolean };
  icon?: React.ReactNode;
  color?: string;
}

export function IsometricMetricCard({
  value,
  label,
  trend,
  icon,
  color = "#00D4FF",
}: IsometricMetricCardProps) {
  return (
    <IsometricCard color={color}>
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        {icon && (
          <div
            className="p-3 rounded-lg"
            style={{
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {icon}
          </div>
        )}

        {/* Trend */}
        {trend && (
          <motion.div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
              trend.isPositive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 15 }}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </motion.div>
        )}
      </div>

      {/* Value */}
      <motion.div
        className="text-3xl font-bold text-slate-900 dark:text-dark-text-primary mb-1"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="text-sm text-slate-600 dark:text-dark-text-secondary">{label}</div>
    </IsometricCard>
  );
}

// Step card for process flows
interface IsometricStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  color?: string;
  isActive?: boolean;
}

export function IsometricStepCard({
  stepNumber,
  title,
  description,
  color = "#00D4FF",
  isActive = false,
}: IsometricStepCardProps) {
  return (
    <IsometricCard color={color} depth={isActive ? 24 : 16}>
      <div className="flex gap-4">
        {/* Step number badge */}
        <motion.div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg"
          style={{
            backgroundColor: color,
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
          }}
        >
          {stepNumber}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 dark:text-dark-text-primary mb-1">
            {title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-dark-text-secondary">
            {description}
          </p>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </IsometricCard>
  );
}
