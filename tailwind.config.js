/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rainbow: ['"Over the Rainbow"', 'cursive'],  // Ajout de la police
      },
    },
  },
  plugins: [],
}


