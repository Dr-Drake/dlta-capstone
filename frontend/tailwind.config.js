/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        buttonBlue: "#4640DE"
      },
      backgroundImage: {
        'auth-texture': "url('/public/Image.png')",
      }
    }
  },
  plugins: [],
};
