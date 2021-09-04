module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#E50914",
        secondary: "#525759",
        background: {
          DEFAULT: "#141414",
        },
        typography: {
          DEFAULT: "#E5E5D8",
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
