import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "5xl": ["60px", "70px"],
      "6xl": ["72px", "80px"],
      "8xl": ["96px", "106px"],
    },

    extend: {
      borderRadius: {
        lg: "10px",
      },
      screens: {
        xs: "400px",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        palanquin: ["Palanquin", "sans-serif"],
        righteous: ["Righteous", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        handjet: ["Handjet", "sans-serif"],
      },
      colors: {
        black: {
          DEFAULT: "#000",
          "1": "#040404",
          "2": "#080808",
          "3": "#0D0D0D",
        },
        grey: "#757575",
        yellow: "#FFC350",
        purple: {
          DEFAULT: "#4029C7",
          dark: "rgb(43, 29, 130)",
        },
        green: "#4BF871",
      },
    },
  },
  plugins: [],
};
export default config;
