/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainA : "#F6F1DE",
        mainDark : "#3E3F5B",
        card : "#8AB2A6",
        mainB : "#ACD3A8",
      },
      backgroundImage: {
        'hero' : "url('https://i.ibb.co.com/35C70SBm/lost-and-found-software.webp')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}