/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontbody: "Rubik",
      },
      colors: {
        header: "#e6beae",
        comTxt: "#6C4639",
        hovcolor: "#d4a190",
        secondary100: "#cce3de",
        secondary200: "#a4c3b2",
        secondary300: "#eaf4f4",
      },

      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
