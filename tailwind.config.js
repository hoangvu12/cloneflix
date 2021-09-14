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
        "z-hover": "z-hover 300ms forwards",
        "z-unhover": "z-unhover 300ms forwards",
        fadeIn: "fadeIn 300ms forwards",
        fadeOut: "fadeOut 300ms forwards",
        slideInLeft: "slideInLeft 300ms forwards",
        slideInRight: "slideInRight 300ms forwards",
      },
      keyframes: {
        "z-hover": {
          from: { zIndex: 10 },
          to: { zIndex: 10 },
        },

        "z-unhover": {
          from: { zIndex: 10 },
          to: { zIndex: 0 },
        },

        "card-hover": {
          from: { transform: "scale(1)", zIndex: 10 },
          to: { transform: "scale(1.8)", zIndex: 10 },
        },

        "card-unhover": {
          from: { transform: "scale(1.8)", zIndex: 10 },
          to: { transform: "scale(1)", zIndex: 0 },
        },

        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },

        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },

        slideInRight: {
          from: {
            transform: "translateX(0px)",
          },

          to: {
            transform: "translateX(-100%)",
          },
        },

        slideInLeft: {
          from: {
            transform: "translateX(-100%)",
          },

          to: {
            transform: "translateX(0px)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
