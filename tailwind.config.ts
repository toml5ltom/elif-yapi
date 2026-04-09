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
        black: "#0A0A0A",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8D48B",
          dark: "#A08530",
        },
        surface: {
          card: "#111111",
          secondary: "#1A1A1A",
          footer: "#080808",
        },
        border: {
          DEFAULT: "#1F1F1F",
          gold: "rgba(201, 168, 76, 0.25)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          muted: "#6A6A6A",
          gold: "#C9A84C",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        arabic: ["Noto Sans Arabic", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)",
        "gold-gradient-h": "linear-gradient(90deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)",
        "dark-gradient": "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.95) 100%)",
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "count-up": "count-up 2s ease-out forwards",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "gold-sweep": "gold-sweep 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(25px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gold-sweep": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
