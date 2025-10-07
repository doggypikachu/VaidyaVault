
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heritage: "#4C3A2D",
        parchment: "#CBB994",
        herbal: "#007A63",
        gold: "#E0C083",
        midnight: "#0F2C3D"
      }
    },
  },
  plugins: [],
};
