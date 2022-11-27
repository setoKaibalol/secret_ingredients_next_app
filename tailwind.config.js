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
      animation: {
        "open-mobile-menu": "open-mobile-menu 0.3s ease-in-out forwards",
        "close-mobile-menu": "close-mobile-menu 0.3s ease-in-out forwards",
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
      },
    },
  },
  plugins: [],
}
