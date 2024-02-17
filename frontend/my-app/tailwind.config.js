/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        authBg:
          "url('https://transparenttextures.com/patterns/asfalt-light.png')",
        homeBg:
          "url('https://transparenttextures.com/patterns/cartographer.png')",
      },
      backgroundColor: {
        auth: "#00111f",
      },
    },
  },
  plugins: [],
};
