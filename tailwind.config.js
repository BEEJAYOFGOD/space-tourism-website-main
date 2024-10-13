/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: ["./public/**/*.{html, js}", "./src/**/*.{html,js}"],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        "home-mobile": "url('../assets/home/background-home-mobile.jpg')",
        "home-tablet": "url('../assets/home/background-home-tablet.jpg')",
        "home-desktop": "url('../assets/home/background-home-desktop.jpg')",
        "destination-mobile":
          "url('../assets/destination/background-destination-mobile.jpg')",
        "destination-tablet":
          "url('../assets/destination/background-destination-tablet.jpg')",
        "destination-desktop":
          "url('../assets/destination/background-destination-desktop.jpg')",
        "crew-mobile": "url('../assets/crew/background-crew-mobile.jpg')",
        "crew-tablet": "url('../assets/crew/background-crew-tablet.jpg')",
        "crew-desktop": "url('../assets/crew/background-crew-desktop.jpg')",
        // ... other sections
      },
    },
  },
};
