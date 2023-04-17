/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#05160e",
        secondary: "#aaa6c3",
        rotate:{
          '270':'270deg'
        },
        tertiary: "#10301f",
        "black-100": "#0d2517",
        "black-200": "#03250d",
        "white-100": "#f3f3f3",
        '.my-calendar .react-calendar__tile--disabled': {
          backgroundColor: '#cf2124',
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1e3525",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};