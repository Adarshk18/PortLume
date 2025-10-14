/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- THIS IS CRITICAL
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}