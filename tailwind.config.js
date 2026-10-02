/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0E2C20',
          800: '#173D2D',
          700: '#24523D',
        },
        avocado: {
          600: '#6E8F3D',
          400: '#9AB55D',
        },
        cream: '#F7F4EA',
        sand: '#EFEBDD',
        earth: '#A56F46',
        charcoal: '#20251F',
        muted: '#687168',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}