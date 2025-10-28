/**
 * Framer Motion Animation Variants
 *
 * Reusable animation presets for consistent motion design.
 * Import these variants for common animations throughout the app.
 */

import { Variants } from "framer-motion";

/**
 * Fade In + Slide Up
 *
 * Element starts below and fades in while moving up.
 * Perfect for hero sections, headings, and content blocks.
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1], // cubic-bezier smooth
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Fade In (no movement)
 *
 * Simple opacity fade-in for subtle entrances.
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Scale In
 *
 * Element starts small and scales to normal size.
 * Perfect for buttons, cards, and interactive elements.
 */
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Stagger Container
 *
 * Parent container that staggers animation of children.
 * Each child delays slightly after the previous one.
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1, // 100ms delay between children
      delayChildren: 0.2, // Start after 200ms
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // Reverse order on exit
    },
  },
};

/**
 * Stagger Item
 *
 * Child element to be used inside staggerContainer.
 * Combines with fadeInUp for smooth staggered entrance.
 */
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Scale On Hover
 *
 * Interactive hover effect - slight scale up.
 * Use with whileHover prop directly.
 */
export const scaleOnHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

/**
 * Scale On Tap
 *
 * Tactile feedback - slight scale down on click.
 * Use with whileTap prop directly.
 */
export const scaleOnTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
    ease: "easeOut",
  },
};

/**
 * Glow Pulse Animation
 *
 * Pulsing glow effect for emphasis.
 * Perfect for CTA buttons and important elements.
 */
export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(6, 182, 212, 0.3)",
      "0 0 40px rgba(6, 182, 212, 0.6)",
      "0 0 20px rgba(6, 182, 212, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Slide In from Left
 *
 * Element enters from left side of screen.
 */
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Slide In from Right
 *
 * Element enters from right side of screen.
 */
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Rotate In
 *
 * Element rotates while fading in.
 * Perfect for icons and decorative elements.
 */
export const rotateIn: Variants = {
  initial: {
    opacity: 0,
    rotate: -10,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    rotate: 10,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Blueprint Drawing Animation
 *
 * Simulates blueprint lines being drawn.
 * Use with SVG paths and strokeDashoffset.
 */
export const blueprintDraw = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 0.15,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.5,
      },
    },
  },
};

/**
 * Page Transition
 *
 * Full-page fade transition for route changes.
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Custom Delay Helper
 *
 * Adds a custom delay to any variant.
 *
 * @param delay - Delay in seconds
 * @returns Modified variant with delay
 */
export const withDelay = (variant: Variants, delay: number): Variants => {
  return {
    ...variant,
    animate: {
      ...variant.animate,
      transition: {
        ...(variant.animate as any)?.transition,
        delay,
      },
    },
  };
};

/**
 * Export all variants as a single object
 */
export const animations = {
  fadeInUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  scaleOnHover,
  scaleOnTap,
  glowPulse,
  slideInLeft,
  slideInRight,
  rotateIn,
  blueprintDraw,
  pageTransition,
  withDelay,
} as const;

export default animations;
