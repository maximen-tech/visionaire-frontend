// lib/calculators.ts
// Utility functions for pricing calculator (FE-020)

/**
 * Calculate implementation time based on complexity level (1-10)
 * Expert implementation: 2-10 hours depending on complexity
 */
export function calculateImplementationTime(complexity: number): number {
  // Complexity 1 = 2h, Complexity 10 = 10h
  return 2 + (complexity / 10) * 8;
}

/**
 * Calculate weekly savings based on hourly rate and hours saved per week
 */
export function calculateWeeklySavings(hourlyRate: number, hoursPerWeek: number): number {
  return hourlyRate * hoursPerWeek;
}

/**
 * Calculate monthly savings (4.33 weeks average per month)
 */
export function calculateMonthlySavings(weeklySavings: number): number {
  return weeklySavings * 4.33;
}

/**
 * Calculate annual savings (52 weeks per year)
 */
export function calculateAnnualSavings(weeklySavings: number): number {
  return weeklySavings * 52;
}

/**
 * Calculate implementation cost (implementation hours × hourly rate)
 */
export function calculateImplementationCost(
  implementationHours: number,
  hourlyRate: number
): number {
  return implementationHours * hourlyRate;
}

/**
 * Calculate ROI percentage
 * ROI = ((Annual Savings - Implementation Cost) / Implementation Cost) × 100
 */
export function calculateROI(annualSavings: number, implementationCost: number): number {
  if (implementationCost === 0) return 0;
  return ((annualSavings - implementationCost) / implementationCost) * 100;
}

/**
 * Calculate break-even timeline in weeks
 * Break-even = Implementation Cost / Weekly Savings
 */
export function calculateBreakEven(implementationCost: number, weeklySavings: number): number {
  if (weeklySavings === 0) return 0;
  return Math.ceil(implementationCost / weeklySavings);
}

/**
 * Calculate net annual savings (after implementation cost)
 */
export function calculateNetSavings(annualSavings: number, implementationCost: number): number {
  return Math.max(0, annualSavings - implementationCost);
}

/**
 * Get ROI rating based on percentage
 */
export function getROIRating(roi: number): {
  rating: 'excellent' | 'great' | 'good' | 'fair' | 'poor';
  color: 'green' | 'cyan' | 'yellow' | 'orange' | 'red';
  message: string;
} {
  if (roi >= 500) {
    return {
      rating: 'excellent',
      color: 'green',
      message: 'ROI exceptionnel! Investissement hautement rentable.',
    };
  } else if (roi >= 300) {
    return {
      rating: 'great',
      color: 'cyan',
      message: 'Excellent ROI! Très bon investissement.',
    };
  } else if (roi >= 150) {
    return {
      rating: 'good',
      color: 'yellow',
      message: 'Bon ROI. Investissement rentable.',
    };
  } else if (roi >= 50) {
    return {
      rating: 'fair',
      color: 'orange',
      message: 'ROI acceptable. Considérez les bénéfices long terme.',
    };
  } else {
    return {
      rating: 'poor',
      color: 'red',
      message: 'ROI faible. Évaluez d\'autres options.',
    };
  }
}

/**
 * Format break-even timeline in human-readable format
 */
export function formatBreakEven(weeks: number): string {
  if (weeks === 0) return 'Immédiat';
  if (weeks === 1) return '1 semaine';
  if (weeks < 4) return `${weeks} semaines`;

  const months = Math.floor(weeks / 4.33);
  const remainingWeeks = weeks % 4;

  if (months === 0) return `${weeks} semaines`;
  if (months === 1 && remainingWeeks === 0) return '1 mois';
  if (remainingWeeks === 0) return `${months} mois`;

  return `${months} mois ${remainingWeeks > 0 ? `et ${remainingWeeks} semaine${remainingWeeks > 1 ? 's' : ''}` : ''}`;
}

/**
 * Calculate all ROI metrics at once
 */
export interface ROIMetrics {
  weeklySavings: number;
  monthlySavings: number;
  annualSavings: number;
  implementationHours: number;
  implementationCost: number;
  roi: number;
  roiRating: ReturnType<typeof getROIRating>;
  breakEvenWeeks: number;
  breakEvenFormatted: string;
  netSavings: number;
}

export function calculateAllMetrics(
  hourlyRate: number,
  hoursPerWeek: number,
  complexity: number
): ROIMetrics {
  const implementationHours = calculateImplementationTime(complexity);
  const implementationCost = calculateImplementationCost(implementationHours, hourlyRate);
  const weeklySavings = calculateWeeklySavings(hourlyRate, hoursPerWeek);
  const monthlySavings = calculateMonthlySavings(weeklySavings);
  const annualSavings = calculateAnnualSavings(weeklySavings);
  const roi = calculateROI(annualSavings, implementationCost);
  const roiRating = getROIRating(roi);
  const breakEvenWeeks = calculateBreakEven(implementationCost, weeklySavings);
  const breakEvenFormatted = formatBreakEven(breakEvenWeeks);
  const netSavings = calculateNetSavings(annualSavings, implementationCost);

  return {
    weeklySavings,
    monthlySavings,
    annualSavings,
    implementationHours,
    implementationCost,
    roi,
    roiRating,
    breakEvenWeeks,
    breakEvenFormatted,
    netSavings,
  };
}
