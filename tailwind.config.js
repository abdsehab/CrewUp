/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "on-secondary": "#26332b",
        "on-surface-variant": "#c1cab3",
        "on-tertiary": "#24342a",
        primary: "#ffffff",
        "primary-fixed": "#aff66b",
        "primary-fixed-dim": "#94d951",
        "primary-container": "#aff66b",
        "on-primary-container": "#3e7100",
        surface: "#101413",
        "surface-container": "#1c201f",
        "surface-container-high": "#272b2a",
        "surface-container-lowest": "#0b0f0e",
        "outline-variant": "#424938",
        background: "#101413",
        "on-background": "#e0e3e1",
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
}