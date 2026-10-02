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
        earth: {
          DEFAULT: '#382A1D', // Marrón oscuro cálido corporativo Pilcococha
          950: '#1D150E',
          900: '#251B13',
          800: '#382A1D',
          700: '#4D3A29',
          600: '#664E37',
          500: '#856649',
          warm: '#A56F46',
        },
        chocolate: '#382A1D',
        tierra: '#382A1D',
        charcoal: '#20251F',
        muted: '#687168',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}