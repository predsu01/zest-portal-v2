/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zest: {
          500: '#FBBF24', // 🟡 Nice yellow (you can pick another shade later)
          600: '#F59E0B', // 🟠 Slightly deeper yellow for hover
        },
      },
    },
  },
  plugins: [],
}
