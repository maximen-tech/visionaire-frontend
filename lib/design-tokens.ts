/**
 * Design Tokens - Blueprint Time-First Design System
 *
 * Centralized design tokens for spacing, shadows, transitions, and z-index.
 * Use these tokens throughout the app for consistency.
 */

export const spacing = {
  xs: "0.5rem", // 8px
  sm: "1rem", // 16px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "3rem", // 48px
  "2xl": "4rem", // 64px
  "3xl": "6rem", // 96px
} as const;

export const borderRadius = {
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "1rem", // 16px
  xl: "1.5rem", // 24px
  full: "9999px",
} as const;

export const shadows = {
  // Subtle shadows
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",

  // Glow effects (for Blueprint design)
  "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)",
  "glow-amber": "0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(245, 158, 11, 0.1)",
  "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)",

  // Focus states
  "focus-cyan": "0 0 0 3px rgba(6, 182, 212, 0.3)",
  "focus-amber": "0 0 0 3px rgba(245, 158, 11, 0.3)",
} as const;

export const transitions = {
  // Duration
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  // Easing functions
  easing: {
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)", // ease-in-out
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  },

  // Presets
  presets: {
    default: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const;

export const zIndex = {
  background: -1,
  base: 0,
  content: 1,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  notification: 700,
} as const;

/**
 * Breakpoints (match Tailwind defaults)
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Animation durations (for Framer Motion)
 */
export const animations = {
  typewriter: {
    speed: 20, // ms per character
    punctuationPause: 200, // ms pause after . ! ?
    paragraphPause: 500, // ms pause between paragraphs
  },
  blueprintDraw: {
    duration: 1.5, // seconds
  },
  glowPulse: {
    duration: 2, // seconds
  },
  fadeIn: {
    duration: 0.6, // seconds
  },
  stagger: {
    children: 0.1, // seconds between staggered elements
  },
} as const;

/**
 * Blueprint Grid Settings
 */
export const blueprintGrid = {
  density: {
    low: 80, // px between lines
    medium: 40,
    high: 20,
  },
  strokeWidth: 1, // px
  opacity: {
    idle: 0.08,
    active: 0.15,
  },
  color: {
    primary: "rgb(6, 182, 212)", // cyan-500
    secondary: "rgb(148, 163, 184)", // slate-400
  },
} as const;

/**
 * Glassmorphism Settings
 */
export const glassmorphism = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropBlur: "12px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: borderRadius.xl,
  hover: {
    background: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-2px)",
  },
} as const;

/**
 * Typography Scale
 */
export const typography = {
  fontFamily: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    hero: "3.5rem", // 56px
    section: "2.25rem", // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.02em",
  },
} as const;

/**
 * Helper function to get CSS variable syntax
 */
export const getCSSVar = (token: string): string => {
  return `var(--${token})`;
};

/**
 * Export all tokens as a single object
 */
export const designTokens = {
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  animations,
  blueprintGrid,
  glassmorphism,
  typography,
} as const;

export default designTokens;
