/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        'hero' : "url('https://i.ibb.co.com/35C70SBm/lost-and-found-software.webp')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}