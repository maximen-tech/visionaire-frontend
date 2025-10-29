/**
 * Performance Detection Utility
 *
 * Detects device performance capabilities to optimize UI rendering.
 * Used for adaptive timing in typewriter effects and animations.
 *
 * Detection Strategy:
 * - Uses Device Memory API (Chrome/Edge)
 * - Uses Hardware Concurrency API (all modern browsers)
 * - Fallback to 'medium' if APIs unavailable
 *
 * Performance Tiers:
 * - HIGH: 4+ GB RAM, 4+ cores (desktop, high-end mobile)
 * - MEDIUM: 2+ GB RAM, 2+ cores (mid-range mobile, older desktop)
 * - LOW: <2 GB RAM or <2 cores (budget mobile, very old devices)
 */

export type DevicePerformance = 'high' | 'medium' | 'low';

/**
 * Extended Navigator interface with Device Memory API
 */
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number; // GB of RAM (Chrome/Edge only)
  connection?: {
    effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
  };
}

/**
 * Detect device performance tier
 *
 * @returns 'high' | 'medium' | 'low'
 *
 * @example
 * const tier = detectDevicePerformance();
 * // tier: 'high' (MacBook Pro, iPhone 14)
 * // tier: 'medium' (iPhone 11, mid-range Android)
 * // tier: 'low' (budget Android, old devices)
 */
export function detectDevicePerformance(): DevicePerformance {
  // Server-side rendering: default to medium
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'medium';
  }

  const nav = navigator as ExtendedNavigator;

  // Get device memory (GB) - Chrome/Edge only
  const memory = nav.deviceMemory;

  // Get CPU cores - all modern browsers
  const cores = nav.hardwareConcurrency;

  // If APIs unavailable, fallback to medium
  if (memory === undefined && cores === undefined) {
    console.log('[Performance] Device APIs unavailable, defaulting to medium');
    return 'medium';
  }

  // HIGH: 4+ GB RAM AND 4+ cores
  // Examples: Desktop, MacBook, iPhone 12+, high-end Android
  if (memory !== undefined && cores !== undefined) {
    if (memory >= 4 && cores >= 4) {
      console.log('[Performance] HIGH tier detected:', { memory: `${memory}GB`, cores });
      return 'high';
    }
  }

  // MEDIUM: 2+ GB RAM AND 2+ cores
  // Examples: iPhone 8-11, mid-range Android, older desktop
  if (memory !== undefined && cores !== undefined) {
    if (memory >= 2 && cores >= 2) {
      console.log('[Performance] MEDIUM tier detected:', { memory: `${memory}GB`, cores });
      return 'medium';
    }
  }

  // Fallback logic when only one API available
  if (memory !== undefined && cores === undefined) {
    if (memory >= 4) return 'high';
    if (memory >= 2) return 'medium';
    return 'low';
  }

  if (cores !== undefined && memory === undefined) {
    if (cores >= 4) return 'high';
    if (cores >= 2) return 'medium';
    return 'low';
  }

  // LOW: <2 GB RAM OR <2 cores
  // Examples: Budget Android, very old devices
  console.log('[Performance] LOW tier detected:', { memory: memory ? `${memory}GB` : 'unknown', cores: cores || 'unknown' });
  return 'low';
}

/**
 * Get adaptive typewriter speed based on device performance
 *
 * @param performance - Device performance tier
 * @returns Milliseconds per character
 *
 * @example
 * const performance = detectDevicePerformance();
 * const speed = getTypewriterSpeed(performance);
 * // speed: 20 (high-end devices)
 * // speed: 35 (mid-range devices)
 * // speed: 50 (low-end devices)
 */
export function getTypewriterSpeed(performance: DevicePerformance): number {
  const TYPING_SPEED = {
    high: 20,    // Fast devices: 20ms/char (50 chars/sec)
    medium: 35,  // Mid-range: 35ms/char (~28 chars/sec)
    low: 50,     // Low-end: 50ms/char (20 chars/sec)
  };

  return TYPING_SPEED[performance];
}

/**
 * Get device info for analytics
 *
 * @returns Object with device memory, cores, and performance tier
 *
 * @example
 * const info = getDeviceInfo();
 * // { memory: 8, cores: 8, performance: 'high' }
 */
export function getDeviceInfo() {
  const nav = navigator as ExtendedNavigator;
  const performance = detectDevicePerformance();

  return {
    memory: nav.deviceMemory || null,
    cores: nav.hardwareConcurrency || null,
    performance,
    connection: nav.connection?.effectiveType || null,
  };
}

/**
 * Check if device is likely mobile
 *
 * @returns true if mobile, false otherwise
 *
 * Note: This is a heuristic based on screen size and user agent.
 * Not 100% accurate but good enough for performance optimization.
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check screen width (mobile typically <768px)
  const isMobileWidth = window.innerWidth < 768;

  // Check user agent for mobile keywords
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return isMobileWidth || isMobileUA;
}

/**
 * Get recommended frame budget for animations
 *
 * @param performance - Device performance tier
 * @returns Frame budget in milliseconds (16ms = 60fps, 33ms = 30fps)
 *
 * @example
 * const budget = getFrameBudget('low');
 * // budget: 33 (30fps for low-end devices)
 */
export function getFrameBudget(performance: DevicePerformance): number {
  const FRAME_BUDGET = {
    high: 16,    // 60fps
    medium: 16,  // 60fps
    low: 33,     // 30fps (reduce frame drops on low-end)
  };

  return FRAME_BUDGET[performance];
}
