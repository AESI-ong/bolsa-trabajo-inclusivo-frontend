/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // por si tienes `/pages` legacy
  ],
  theme: {
    extend: {
      colors: {
        "rojo-aesi": "#cd2027", // Rojo AESI
        "amarillo-aesi": "#f6d70e", // Amarillo AESI
        "azul-aesi": "#2c6db6", // Azul AESI
        "verde-aesi": "#55b948", // Verde AESI
      },
    },
  },
  plugins: [],
};
