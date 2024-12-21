/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        secondary: "#008080",
        primary: "#0d9488",
      },
      fontFamily: {
        primary: ["Roboto", "sans"],
        secondary: ["Kanit", "sans"],
      },
    },
  },
  plugins: [],
};
