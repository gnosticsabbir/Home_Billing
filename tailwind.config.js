/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    dropShadow: {
      'shadow': '5px 5px 10px rgba(238, 0, 24, 1)'
    },
    backgroundImage: {
      'homeImg': "url('./assets/homeImg.avif')",
    },


    fontFamily: {
      'nunito': ['Nunito'],
      'opensans': ['Open Sans'],
      'poppins': ['Poppins']
    },
    extend: {
    },
  },
  plugins: [],
}