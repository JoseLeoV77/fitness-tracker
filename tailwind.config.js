/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-600',
    'bg-blue-600',
    'bg-green-600',
    'hover:bg-red-950',
    'hover:bg-blue-950',
    'hover:bg-green-950',
  ]
}