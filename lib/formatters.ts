/**
 * Formatters Library
 *
 * Utilities for formatting monetary values, hours, and other data.
 * Quebec-style formatting (space before $, comma for thousands).
 */

/**
 * Format amount in Canadian dollars (Quebec style)
 *
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "72,150 $ CAD")
 *
 * @example
 * formatCAD(72150) // "72 150 $ CAD"
 * formatCAD(5000.50) // "5 001 $ CAD"
 */
export function formatCAD(amount: number): string {
  // Round to nearest integer
  const rounded = Math.round(amount);

  // Format with space as thousands separator (Quebec style)
  const formatted = rounded.toLocaleString("fr-CA", {
    useGrouping: true,
  });

  return `${formatted} $ CAD`;
}

/**
 * Format hours with one decimal place
 *
 * @param hours - Hours to format
 * @returns Formatted string (e.g., "8.5h")
 *
 * @example
 * formatHours(8.5) // "8.5h"
 * formatHours(10) // "10.0h"
 */
export function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

/**
 * Format hours per week
 *
 * @param hours - Hours per week to format
 * @returns Formatted string (e.g., "8.5h/semaine")
 *
 * @example
 * formatHoursPerWeek(8.5) // "8.5h/semaine"
 */
export function formatHoursPerWeek(hours: number): string {
  return `${hours.toFixed(1)}h/semaine`;
}

/**
 * Format hours per year
 *
 * @param hours - Hours per year to format
 * @returns Formatted string (e.g., "442h/an")
 *
 * @example
 * formatHoursPerYear(442) // "442h/an"
 */
export function formatHoursPerYear(hours: number): string {
  return `${Math.round(hours)}h/an`;
}

/**
 * Calculate monetary value from hours
 *
 * @param hours - Number of hours
 * @param hourlyRate - Hourly rate in CAD
 * @returns Formatted monetary value
 *
 * @example
 * calculateMonetaryValue(442, 75) // "33 150 $ CAD"
 */
export function calculateMonetaryValue(hours: number, hourlyRate: number): string {
  const value = hours * hourlyRate;
  return formatCAD(value);
}

/**
 * Format large numbers with K/M suffix
 *
 * @param num - Number to format
 * @returns Formatted string (e.g., "1.5K", "2.3M")
 *
 * @example
 * formatLargeNumber(1500) // "1.5K"
 * formatLargeNumber(2300000) // "2.3M"
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format percentage
 *
 * @param value - Percentage value (0-100)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted string (e.g., "75%")
 *
 * @example
 * formatPercentage(75.5) // "76%"
 * formatPercentage(75.5, 1) // "75.5%"
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}
