/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E50914",
        secondary: "#141414",
        accent: "#b81d24",
      },
      fontFamily: {
        netflix: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
