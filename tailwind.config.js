/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "bookmark-purple": "#5267DF",
        "bookmark-red": "#FA5959",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
        "dark-blue": "#033249",
        "dark-blue-1": "#044361",
        "dark-blue-2": "#05547a",
        "dark-blue-3": "#066492",
        "dark-blue--1": "#022131",
        "dark-blue--2": "#011018",
        "bright-orange": "#FF8038",
        "sand-white": "#EFEDE8",
        "dark-brown": "#491a03",
        "dark-green": "#03493d",
        "slime-green": "#324903",
      },
      backgroundImage: {
        "crab-grey": "url('../public/media/backgrounds/crab_grey.jpg')",
        "garlic-grey": "url('../public/media/backgrounds/garlic_grey.jpg')",
        "spices-black": "url('../public/media/backgrounds/spices_black.jpg')",
        "vegetables-grey":
          "url('../public/media/backgrounds/vegetables_grey.jpg')",
      },
      animation: {
        "open-mobile-menu": "open-mobile-menu 0.3s ease-in-out forwards",
        "close-mobile-menu": "close-mobile-menu 0.3s ease-in-out forwards",
        "card-enter": "card-enter 1s ease-in-out forwards",
        sliderMobile: "20s sliderMobile infinite",
        sliderDesktop: "20s sliderDesktop infinite",
      },
      keyframes: {
        "open-mobile-menu": {
          "0%": { transform: "scalex(0)", opacity: 0 },
          "100%": { transform: "scalex(1)", opacity: 100 },
        },
        "close-mobile-menu": {
          "0%": { transform: "scalex(1)", opacity: 100 },
          "100%": { transform: "scalex(0)", opacity: 0 },
        },
        "card-enter": {
          "0%": { transform: "translatex(6)" },
          "100%": { transform: "translatex(0)" },
        },
        sliderMobile: {
          "0%": { left: 0 },
          "20%": { left: 0 },
          "25%": { left: "-100%" },
          "45%": { left: "-100%" },
          "50%": { left: "-200%" },
          "70%": { left: "-200%" },
          "75%": { left: "-300%" },
          "95%": { left: "-300%" },
          "100%": { left: "-400%" },
        },
        sliderTablet: {
          "0%": { left: 0 },
          "20%": { left: 0 },
          "25%": { left: "-50%" },
          "45%": { left: "-50%" },
          "50%": { left: "-100%" },
          "70%": { left: "-100%" },
          "75%": { left: "-150%" },
          "95%": { left: "-150%" },
          "100%": { left: "-200%" },
        },

        sliderDesktop: {
          "0%": { left: 0 },
          "20%": { left: 0 },
          "25%": { left: "-33%" },
          "45%": { left: "-33%" },
          "50%": { left: "-66%" },
          "70%": { left: "-66%" },
          "75%": { left: "-99%" },
          "95%": { left: "-99%" },
          "100%": { left: "-133%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
