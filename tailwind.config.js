/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        "light-gray" : "#f6f6f6",
        "light-gray1" : "#F2F2F2",
        "light-gray2" : "#E4DFDF",
        "light-gray3" : "#D7D7D7",
        "light-black" : "#131313",
        "light-black1" : "#626262",
        "light-black2" : "#716D6D",
        "light-pink" : "#FDBF07",
      }
    },
  },
  plugins: [],
}