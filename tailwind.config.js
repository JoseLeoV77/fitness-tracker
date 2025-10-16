/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        darkblue: '#030014',
        primaryblue: '#030040',
        placeholder: "#6b7280",
        deepblue: "#4C95E6",
        background: '#2b2b2b',
        surface: '#1E1E1E',
        onyx: "#353935",
        primary: '#3A82F7',
        primaryVariant: '#285cb5',
        accent: '#03DAC6',
        error: '#CF6679',
        textPrimary: '#FFFFFF',
        textSecondary: '#B3B3B3',
        border: '#2c2c2c',
      },
      screens: {
        'sm-max': { 'max': '770px' }
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-red-600',
    'bg-blue-600',
    'bg-green-600',
    'hover:bg-red-950',
    'hover:bg-blue-950',
    'hover:bg-green-950',
  ],
}