/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: ["./public/**/*.{html, js}", "./src/**/*.{html,js}"],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        "home-mobile": "url('./assets/home/background-home-mobile.jpg')",
        "home-tablet": "url('./assets/home/background-home-tablet.jpg')",
        "home-desktop": "url('./assets/home/background-home-desktop.jpg')",
      },
      fontFamily: {
        title: "Bellefair",
        body: "Barlow",
      },
    },
  },
};
