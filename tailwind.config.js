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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
