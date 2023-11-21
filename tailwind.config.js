/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          montserrat: ["Montserrat"],
          open: ["Open Sans"],
          martel: ["Martel"]
      },
    },
  },
  plugins: [],
}

