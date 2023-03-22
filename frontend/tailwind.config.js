/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors:{
        buttonBlue: "#4640DE",
        borderGray: "#ACACAC"
      },
      backgroundImage: {
        'auth-texture': "url('/public/Image.png')",
      }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
