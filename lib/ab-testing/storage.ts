// lib/ab-testing/storage.ts
// Cookie and localStorage utilities for A/B testing (SSR-safe)

import type { ABCookieData } from './types';

const AB_COOKIE_NAME = 'visionai_ab_tests';
const AB_COOKIE_DAYS = 7; // Persist for 7 days
const AB_LOCALSTORAGE_KEY = 'visionai_ab_tests';

/**
 * Check if we're running in browser (not SSR)
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get all A/B test assignments from cookies
 */
export function getAssignmentsFromCookie(): ABCookieData {
  if (!isBrowser()) return {};

  try {
    const cookies = document.cookie.split(';');
    const abCookie = cookies.find((c) => c.trim().startsWith(`${AB_COOKIE_NAME}=`));

    if (!abCookie) return {};

    const value = abCookie.split('=')[1];
    const decoded = decodeURIComponent(value);
    return JSON.parse(decoded) as ABCookieData;
  } catch (error) {
    console.error('Failed to parse A/B test cookie:', error);
    return {};
  }
}

/**
 * Save all A/B test assignments to cookies
 */
export function saveAssignmentsToCookie(assignments: ABCookieData): void {
  if (!isBrowser()) return;

  try {
    const json = JSON.stringify(assignments);
    const encoded = encodeURIComponent(json);
    const expires = new Date();
    expires.setDate(expires.getDate() + AB_COOKIE_DAYS);

    document.cookie = `${AB_COOKIE_NAME}=${encoded}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  } catch (error) {
    console.error('Failed to save A/B test cookie:', error);
  }
}

/**
 * Get a specific test assignment from cookie
 */
export function getAssignment(testId: string): string | null {
  const assignments = getAssignmentsFromCookie();
  const assignment = assignments[testId];

  if (!assignment) return null;

  // Check if assignment is expired (older than 7 days)
  const now = Date.now();
  const assignedAt = assignment.assignedAt;
  const daysOld = (now - assignedAt) / (1000 * 60 * 60 * 24);

  if (daysOld > AB_COOKIE_DAYS) {
    // Assignment expired, remove it
    removeAssignment(testId);
    return null;
  }

  return assignment.variantId;
}

/**
 * Save a specific test assignment to cookie
 */
export function saveAssignment(testId: string, variantId: string): void {
  const assignments = getAssignmentsFromCookie();
  assignments[testId] = {
    variantId,
    assignedAt: Date.now(),
  };
  saveAssignmentsToCookie(assignments);
}

/**
 * Remove a specific test assignment from cookie
 */
export function removeAssignment(testId: string): void {
  const assignments = getAssignmentsFromCookie();
  delete assignments[testId];
  saveAssignmentsToCookie(assignments);
}

/**
 * Clear all A/B test assignments
 */
export function clearAllAssignments(): void {
  if (!isBrowser()) return;
  document.cookie = `${AB_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  localStorage.removeItem(AB_LOCALSTORAGE_KEY);
}

/**
 * Get assignments from localStorage (fallback if cookies disabled)
 */
export function getAssignmentsFromLocalStorage(): ABCookieData {
  if (!isBrowser()) return {};

  try {
    const stored = localStorage.getItem(AB_LOCALSTORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as ABCookieData;
  } catch (error) {
    console.error('Failed to parse A/B test localStorage:', error);
    return {};
  }
}

/**
 * Save assignments to localStorage (fallback)
 */
export function saveAssignmentsToLocalStorage(assignments: ABCookieData): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(AB_LOCALSTORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error('Failed to save A/B test localStorage:', error);
  }
}

/**
 * Get assignment with localStorage fallback
 */
export function getAssignmentWithFallback(testId: string): string | null {
  // Try cookie first
  const cookieAssignment = getAssignment(testId);
  if (cookieAssignment) return cookieAssignment;

  // Fallback to localStorage
  const localAssignments = getAssignmentsFromLocalStorage();
  const assignment = localAssignments[testId];

  if (!assignment) return null;

  // Check expiry
  const now = Date.now();
  const daysOld = (now - assignment.assignedAt) / (1000 * 60 * 60 * 24);

  if (daysOld > AB_COOKIE_DAYS) {
    return null;
  }

  return assignment.variantId;
}

/**
 * Save assignment with localStorage fallback
 */
export function saveAssignmentWithFallback(testId: string, variantId: string): void {
  // Save to both cookie and localStorage
  saveAssignment(testId, variantId);

  const localAssignments = getAssignmentsFromLocalStorage();
  localAssignments[testId] = {
    variantId,
    assignedAt: Date.now(),
  };
  saveAssignmentsToLocalStorage(localAssignments);
}
