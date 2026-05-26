/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent:         "#84cc16",
        "accent-light": "#bef264",
        "accent-dim":   "rgba(132,204,22,0.12)",
        "bg-base":      "#0a0f1e",
        "bg-card":      "#111827",
        "bg-card-alt":  "#1f2937",
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      fontFamily: {
        fitness: ["Teko", "Pyidaungsu", "sans-serif"],
      },
      boxShadow: {
        glow: "0 8px 32px -8px rgba(132,204,22,0.35)",
        "glow-lg": "0 16px 48px -12px rgba(132,204,22,0.4)",
        card: "0 4px 24px -8px rgba(0,0,0,0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        wave: "wave 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(132,204,22,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(132,204,22,0.4)" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(10deg)" },
          "75%": { transform: "rotate(-10deg)" },
        },
      },
    },
  },
  plugins: [],
};
