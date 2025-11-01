import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Premium Dark Mode Palette (Anthropic-inspired)
        dark: {
          bg: {
            primary: '#0A0A0A',
            secondary: '#111111',
            tertiary: '#1A1A1A',
            accent: '#252525',
          },
          text: {
            primary: '#ECECEC',
            secondary: '#A0A0A0',
            tertiary: '#6B6B6B',
          },
          border: {
            subtle: '#222222',
            medium: '#333333',
            strong: '#444444',
          },
        },
        // Light mode palette (enhanced)
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#00D4FF", // Premium AI accent
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a78bfa",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
      },
      fontFamily: {
        // Premium typography system - Next.js optimized fonts
        heading: ['var(--font-heading)', '"Cabinet Grotesk"', "sans-serif"],
        body: ['var(--font-inter)', "Inter", "sans-serif"],
        mono: ['var(--font-mono)', '"JetBrains Mono"', "monospace"],
        display: ['var(--font-heading)', "serif"], // For hero sections
      },
      fontSize: {
        'hero-xl': ['6rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "blueprint-draw": "blueprintDraw 1.5s ease-in-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "typewriter": "typewriter 0.02s steps(1) forwards",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "bounce-soft": "bounceSoft 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blueprintDraw: {
          "0%": { strokeDashoffset: "1000", opacity: "0" },
          "100%": { strokeDashoffset: "0", opacity: "0.15" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245, 158, 11, 0.6)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.4)",
        "glow-amber": "0 0 20px rgba(245, 158, 11, 0.4)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.4)",
        "glow-purple": "0 0 20px rgba(167, 139, 250, 0.4)",
        // Depth system shadows
        "depth-sm": "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
        "depth-md": "0 4px 8px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.12)",
        "depth-lg": "0 8px 16px rgba(0, 0, 0, 0.09), 0 4px 8px rgba(0, 0, 0, 0.14)",
        "depth-xl": "0 16px 32px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.16)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
