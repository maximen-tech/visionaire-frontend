import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Blueprint Time-First Palette
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
          400: "#22d3ee",
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
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        hero: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        section: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "blueprint-draw": "blueprintDraw 1.5s ease-in-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "typewriter": "typewriter 0.02s steps(1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
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
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-amber": "0 0 20px rgba(245, 158, 11, 0.3)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
