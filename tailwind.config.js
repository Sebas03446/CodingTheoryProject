/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#283C3B",
        secondary: "#664533",
        tertiary: "#30918D",
        quaternary: "#00e6dd",
        quinary: "#E65000",
        senary: "#A65529",
      },
      fontFamily: {
        sans: ["AvertaDemo", "sans-serif"],
      },
      maxHeight: {
        "1/4": "25%",
        "1/6": "16.666667%",
      },
    },
    screens: {
      "sm-max": { max: "640px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
}

