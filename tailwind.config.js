/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#008080",
        secondary: "#0d9488",
      },
      fontFamily: {
        primary: ["Roboto", "sans"],
        secondary: ["Kanit", "sans"],
      },
    },
  },
  plugins: [],
};
