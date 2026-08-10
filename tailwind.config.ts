import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  safelist: [
    "bg-brand",
    "bg-blue-600",
    "bg-orange-600",
    "bg-violet-600",
    "bg-emerald-600",
    "bg-cyan-600",
    "bg-pink-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-orange-500",
    "bg-blue-500",
    "bg-teal-600",
    "bg-amber-600"
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ─── REACreative Brand Tokens ─── */
        brand: {
          DEFAULT: "#E11D2E",
          hover:   "#C41526",
        },
        support: "#121115",
        dayum: {
          DEFAULT: "#232323",
          hover:   "#2C2C2C",
        },
        "bg-alt": "#F5F5F5",

        /* ─── shadcn/ui tokens (required) ─── */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
        DEFAULT: "var(--radius-md)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Modular scale 1.333 (perfect fourth) for headings */
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)",   { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)",     { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.2rem, 2.5vw, 1.7rem)", { lineHeight: "1.3" }],
      },
      spacing: {
        "section-y": "var(--space-section-y)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        sm:    "var(--shadow-sm)",
        md:    "var(--shadow-md)",
        brand: "var(--shadow-brand)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
