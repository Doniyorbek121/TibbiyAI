/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf5",
          100: "#d6f9e6",
          200: "#b0f0d0",
          300: "#7ce2b3",
          400: "#42cb90",
          500: "#1cae74",
          600: "#108d5e",
          700: "#0e714e",
          800: "#0f5940",
          900: "#0d4a36",
        },
        sand: {
          50: "#fbf8f1",
          100: "#f5eede",
          200: "#ebdabb",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(16, 141, 94, 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
