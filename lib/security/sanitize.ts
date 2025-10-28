/**
 * Input Sanitization Utilities
 *
 * Provides XSS protection and input validation for user-submitted data.
 * Uses DOMPurify for HTML sanitization and custom validators for other inputs.
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param dirty - Untrusted HTML string
 * @param allowedTags - Optional array of allowed HTML tags
 * @returns Sanitized HTML string safe for rendering
 *
 * @example
 * const userInput = '<script>alert("xss")</script><p>Safe content</p>';
 * const clean = sanitizeHtml(userInput); // Returns: '<p>Safe content</p>'
 */
export function sanitizeHtml(
  dirty: string,
  allowedTags?: string[]
): string {
  if (!dirty) return '';

  const config = {
    ALLOWED_TAGS: allowedTags || ['p', 'br', 'strong', 'em', 'u', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  };

  return DOMPurify.sanitize(dirty, config);
}

/**
 * Sanitize plain text by removing all HTML tags
 *
 * @param text - Untrusted string that may contain HTML
 * @returns Plain text with all HTML removed
 *
 * @example
 * const input = '<script>alert("xss")</script>Hello';
 * const clean = sanitizeText(input); // Returns: 'Hello'
 */
export function sanitizeText(text: string): string {
  if (!text) return '';

  // Remove all HTML tags
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

/**
 * Validate and sanitize URL to prevent XSS and open redirect attacks
 *
 * @param url - URL string to validate
 * @param allowedProtocols - Allowed URL protocols (default: http, https)
 * @returns Sanitized URL or null if invalid
 *
 * @example
 * sanitizeUrl('javascript:alert(1)'); // Returns: null
 * sanitizeUrl('https://example.com'); // Returns: 'https://example.com'
 */
export function sanitizeUrl(
  url: string,
  allowedProtocols: string[] = ['http:', 'https:']
): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    // Check if protocol is allowed
    if (!allowedProtocols.includes(parsed.protocol)) {
      return null;
    }

    // Return sanitized URL
    return parsed.toString();
  } catch {
    // Invalid URL
    return null;
  }
}

/**
 * Validate and sanitize email address
 *
 * @param email - Email string to validate
 * @returns Sanitized email or null if invalid
 *
 * @example
 * sanitizeEmail('user@example.com'); // Returns: 'user@example.com'
 * sanitizeEmail('<script>alert(1)</script>@example.com'); // Returns: null
 */
export function sanitizeEmail(email: string): string | null {
  if (!email) return null;

  // Basic email regex validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Sanitize first
  const sanitized = sanitizeText(email).trim().toLowerCase();

  // Validate format
  if (!emailRegex.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize phone number (Quebec/Canada format)
 *
 * @param phone - Phone number string
 * @returns Sanitized phone number or null if invalid
 *
 * @example
 * sanitizePhone('514-555-1234'); // Returns: '5145551234'
 * sanitizePhone('(514) 555-1234'); // Returns: '5145551234'
 */
export function sanitizePhone(phone: string): string | null {
  if (!phone) return null;

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Validate length (10 digits for Canada/US)
  if (digits.length !== 10) {
    return null;
  }

  return digits;
}

/**
 * Sanitize company name or person name
 *
 * @param name - Name string
 * @param maxLength - Maximum allowed length (default: 100)
 * @returns Sanitized name or null if invalid
 *
 * @example
 * sanitizeName('Acme Corp.'); // Returns: 'Acme Corp.'
 * sanitizeName('<script>Evil Corp</script>'); // Returns: 'Evil Corp'
 */
export function sanitizeName(name: string, maxLength: number = 100): string | null {
  if (!name) return null;

  // Remove HTML and trim
  const sanitized = sanitizeText(name).trim();

  // Validate length
  if (sanitized.length === 0 || sanitized.length > maxLength) {
    return null;
  }

  // Only allow letters, numbers, spaces, hyphens, apostrophes, periods
  const nameRegex = /^[a-zA-Z0-9\s\-'.àâçéèêëîïôûùüÿñæœ]+$/i;

  if (!nameRegex.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize form data object
 *
 * @param formData - Object with form field values
 * @returns Sanitized form data object
 *
 * @example
 * const data = { name: '<b>John</b>', email: 'JOHN@EXAMPLE.COM' };
 * const clean = sanitizeFormData(data);
 * // Returns: { name: 'John', email: 'john@example.com' }
 */
export function sanitizeFormData<T extends Record<string, string>>(
  formData: T
): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      // Apply text sanitization to all string values
      const cleaned = sanitizeText(value);
      sanitized[key as keyof T] = cleaned as T[keyof T];
    }
  }

  return sanitized;
}

/**
 * Validate and sanitize website URL for analysis
 *
 * @param url - Website URL to analyze
 * @returns Sanitized URL or error message
 *
 * @example
 * validateWebsiteUrl('https://example.com'); // Returns: { valid: true, url: 'https://example.com' }
 * validateWebsiteUrl('javascript:alert(1)'); // Returns: { valid: false, error: 'Invalid URL protocol' }
 */
export function validateWebsiteUrl(url: string): {
  valid: boolean;
  url?: string;
  error?: string
} {
  if (!url) {
    return { valid: false, error: 'URL is required' };
  }

  try {
    const parsed = new URL(url);

    // Only allow HTTP and HTTPS
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'Invalid URL protocol. Only HTTP and HTTPS are allowed.' };
    }

    // Validate hostname (must have at least one dot)
    if (!parsed.hostname.includes('.')) {
      return { valid: false, error: 'Invalid domain name.' };
    }

    // Block localhost and internal IPs for security
    const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
    if (blockedHosts.includes(parsed.hostname)) {
      return { valid: false, error: 'Local URLs are not allowed.' };
    }

    // Block private IP ranges
    const privateIpRegex = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/;
    if (privateIpRegex.test(parsed.hostname)) {
      return { valid: false, error: 'Private IP addresses are not allowed.' };
    }

    return { valid: true, url: parsed.toString() };
  } catch {
    return { valid: false, error: 'Invalid URL format.' };
  }
}

/**
 * Rate limiting helper (client-side only)
 * Prevents rapid form submissions
 *
 * @param key - Unique identifier for the action (e.g., 'form-submit')
 * @param maxAttempts - Maximum attempts allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with allowed status and remaining attempts
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remainingAttempts: number } {
  if (typeof window === 'undefined') {
    // Server-side: always allow (backend should handle rate limiting)
    return { allowed: true, remainingAttempts: maxAttempts };
  }

  const storageKey = `ratelimit_${key}`;
  const now = Date.now();

  // Get stored attempts
  const stored = localStorage.getItem(storageKey);
  const attempts: number[] = stored ? JSON.parse(stored) : [];

  // Filter attempts within time window
  const recentAttempts = attempts.filter(time => now - time < windowMs);

  // Check if limit exceeded
  if (recentAttempts.length >= maxAttempts) {
    return { allowed: false, remainingAttempts: 0 };
  }

  // Record new attempt
  recentAttempts.push(now);
  localStorage.setItem(storageKey, JSON.stringify(recentAttempts));

  return {
    allowed: true,
    remainingAttempts: maxAttempts - recentAttempts.length,
  };
}
