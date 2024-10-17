/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playFair: ["Playfair Display", "serif"],
        spirax: ["Elsie Swash Caps", "serif"],
      },
      animation: {
        "bounce-slow": "bounce 20s linear infinite",
      },
    },
  },
  plugins: [],
};
