"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TimeOpportunity } from "@/lib/types";
import ComplexityBar, {
  getComplexityDescription,
  getComplexityColorClass,
} from "@/components/ComplexityBar";
import {
  formatCAD,
  formatHoursPerWeek,
  formatHoursPerYear,
  formatHours,
} from "@/lib/formatters";
import GlassmorphicCard from "@/components/design-system/GlassmorphicCard";

interface OpportunityCardProps {
  number: number; // 1, 2, or 3
  title: string;
  opportunity: TimeOpportunity;
  hourlyRate: number | null;
  icon: React.ReactNode; // Changed from string to ReactNode for flexibility
  className?: string;
}

/**
 * OpportunityCard Component (Blueprint Design)
 *
 * Displays a time-saving opportunity with:
 * - Hours recoverable (per week + per year)
 * - Monetary value (if hourlyRate provided)
 * - Complexity level (1-10 visual bar)
 * - Problem teaser
 * - Masked tools section (blur effect)
 * - Solo vs Expert implementation time comparison
 *
 * @param number - Opportunity number (1/2/3)
 * @param title - Opportunity title (e.g., "Présence Digitale")
 * @param opportunity - Time opportunity data from API
 * @param hourlyRate - User's hourly rate (optional)
 * @param icon - Icon element for opportunity
 * @param className - Additional CSS classes
 */
export default function OpportunityCard({
  number,
  title,
  opportunity,
  hourlyRate,
  icon,
  className = "",
}: OpportunityCardProps) {
  // Calculate monetary value if hourly rate is provided
  const monetaryValue = hourlyRate ? opportunity.hours_per_year * hourlyRate : 0;
  const displayMonetaryValue = hourlyRate !== null;

  // Calculate implementation time estimates
  const soloHours = Math.max(1, opportunity.complexity_level * 10 - 20);
  const expertHours = Math.max(1, opportunity.complexity_level * 1 - 2);

  return (
    <GlassmorphicCard
      variant="default"
      hoverable={true}
      className={cn("p-6 space-y-4", className)}
    >
      {/* Header: Number Badge + Title */}
      <div className="flex items-start gap-4">
        {/* Number Badge */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-heading font-bold text-xl shadow-glow-cyan">
          {number}
        </div>

        {/* Icon + Title */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-500 text-2xl">{icon}</span>
            <h3 className="font-heading font-bold text-xl text-slate-900">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Hours Recoverable */}
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-4 border border-emerald-200/50">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-heading font-bold text-emerald-600">
            {formatHoursPerWeek(opportunity.hours_per_week)}
          </span>
          <span className="text-slate-600 text-sm">
            • {formatHoursPerYear(opportunity.hours_per_year)}
          </span>
        </div>

        {/* Monetary Value (conditional) */}
        {displayMonetaryValue && (
          <div className="mt-2 pt-2 border-t border-emerald-200/50">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-amber-600">
                {formatCAD(monetaryValue)}
              </span>
              <span className="text-slate-500 text-xs">de valeur/an</span>
            </div>
          </div>
        )}
      </div>

      {/* Problem Teaser */}
      <div className="space-y-2">
        <h4 className="font-heading font-semibold text-sm text-slate-700 uppercase tracking-wide">
          💡 Opportunité
        </h4>
        <p className="text-slate-700 text-base leading-relaxed">
          {opportunity.problem_teaser}
        </p>
      </div>

      {/* Complexity Bar */}
      <div className="space-y-2">
        <h4 className="font-heading font-semibold text-sm text-slate-700 uppercase tracking-wide">
          📊 Complexité
        </h4>
        <ComplexityBar level={opportunity.complexity_level} />
        <p
          className={cn(
            "text-sm font-medium",
            getComplexityColorClass(opportunity.complexity_level)
          )}
        >
          {getComplexityDescription(opportunity.complexity_level)}
        </p>
      </div>

      {/* Masked Tools Section */}
      <div className="space-y-2">
        <h4 className="font-heading font-semibold text-sm text-slate-700 uppercase tracking-wide">
          🔧 Solutions recommandées
        </h4>
        <div className="relative bg-slate-100 rounded-lg p-3 overflow-hidden">
          {/* Blurred Content */}
          <div className="blur-sm select-none pointer-events-none">
            <p className="text-slate-600 text-sm">{opportunity.tools_hint}</p>
          </div>

          {/* Overlay with Lock */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-800/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1">🔒</div>
              <p className="text-white text-xs font-medium">
                Déverrouillé dans le rapport complet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Time Comparison */}
      <div className="space-y-3 pt-2 border-t border-white/30">
        <h4 className="font-heading font-semibold text-sm text-slate-700 uppercase tracking-wide">
          ⏱️ Temps d'implémentation estimé
        </h4>

        {/* Solo Implementation */}
        <div className="flex items-center justify-between bg-red-50 rounded-lg p-3 border border-red-200/50">
          <div>
            <p className="text-xs text-slate-600 font-medium">Seul (DIY)</p>
            <p className="text-lg font-heading font-bold text-red-600">
              {formatHours(soloHours)}
            </p>
          </div>
          <div className="text-red-500 text-2xl">😰</div>
        </div>

        {/* Expert Implementation */}
        <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-3 border border-emerald-200/50">
          <div>
            <p className="text-xs text-slate-600 font-medium">
              Avec expert IA
            </p>
            <p className="text-lg font-heading font-bold text-emerald-600">
              {formatHours(expertHours)}
            </p>
          </div>
          <div className="text-emerald-500 text-2xl">✅</div>
        </div>

        {/* Time Savings Badge */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-xs text-slate-500">Économie:</span>
          <span className="font-heading font-bold text-amber-600">
            {formatHours(soloHours - expertHours)} gagnées
          </span>
        </div>
      </div>
    </GlassmorphicCard>
  );
}

/**
 * OpportunityCardSkeleton Component
 *
 * Loading skeleton for OpportunityCard during data fetch.
 */
export function OpportunityCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <GlassmorphicCard
      variant="default"
      hoverable={false}
      className={cn("p-6 space-y-4 animate-pulse", className)}
    >
      {/* Header Skeleton */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Hours Skeleton */}
      <div className="bg-slate-100 rounded-lg p-4 h-20"></div>

      {/* Problem Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      </div>

      {/* Complexity Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
      </div>

      {/* Tools Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-16 bg-slate-200 rounded"></div>
      </div>

      {/* Implementation Skeleton */}
      <div className="space-y-3 pt-2 border-t border-white/30">
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-16 bg-slate-200 rounded"></div>
        <div className="h-16 bg-slate-200 rounded"></div>
      </div>
    </GlassmorphicCard>
  );
}
