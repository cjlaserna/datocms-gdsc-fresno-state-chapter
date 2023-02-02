/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    // for src directory
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class",
  theme: {
    minHeight: {
      300: "300px",
      500: "500px",
      450: "450px",
      600: "600px",
    },
    fontFamily: {
      sans: ["Google Sans", "Helvetica Neue", "Helvetica", "Arial"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "gray-dark": "#273444",
        "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [require("preline/plugin")],
}
