module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: {
          DEFAULT: "var(--background-color)",
        },
        typography: {
          DEFAULT: "var(--typography-color)",
        },
      },
      fontFamily: {
        netflix: ["Netflix", "Helvetica", "Arial", "sans-serif"],
        netflix_medium: ["Netflix_Medium", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        "card-hover": "card-hover 300ms forwards",
        "card-unhover": "card-unhover 300ms forwards",
      },
      keyframes: {
        "card-hover": {
          "0%": { transform: "scale(1)", zIndex: 10 },
          "100%": { transform: "scale(1.5)", zIndex: 10 },
        },

        "card-unhover": {
          "0%": { transform: "scale(1.5)", zIndex: 10 },
          "100%": { transform: "scale(1)", zIndex: 0 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
