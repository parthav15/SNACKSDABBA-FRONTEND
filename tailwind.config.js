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
        poppins: ["Poppins", "sans-serif"], // Add Poppins here
      },
    },
  },
  plugins: [],
};
