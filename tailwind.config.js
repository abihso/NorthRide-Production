/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Explicit sizes keep native typography aligned with the 16px body/input
      // baseline instead of NativeWind's 14px rem. Keep layout spacing separate.
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "48px" }],
        "6xl": ["60px", { lineHeight: "60px" }],
        "7xl": ["72px", { lineHeight: "72px" }],
        "8xl": ["96px", { lineHeight: "96px" }],
        "9xl": ["128px", { lineHeight: "128px" }],
      },
      colors: {
        "light-gray": "#f6f6f6",
        "light-gray1": "#F2F2F2",
        "light-gray2": "#E4DFDF",
        "light-gray3": "#D7D7D7",
        "light-gray4": "#968F8F",
        "light-gray5": "#E0E0E0",
        "light-black": "#131313",
        "light-black1": "#626262",
        "light-black2": "#716D6D",
        "light-pink": "#FDBF07",
      },
    },
  },
  plugins: [],
};
