/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#101413",
        surface: "#1c201f",
        "surface-alt": "#24342A",
        border: "#324539",
        "border-alt": "#424938",
        "text-main": "#e0e3e1",
        "text-muted": "#c1cab3",
        accent: "#aff66b",
      },
      spacing: {
        gutter: "24px",
        "margin-desktop": "40px",
        "margin-mobile": "16px",
      },
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};