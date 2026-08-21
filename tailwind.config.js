/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#B4F461', // The neon lime green
          hover: '#9DEB41',
        },
        dark: {
          bg: '#0F1311', // Very dark green/black background
          surface: '#1A1D1C', // Dark gray for cards
          border: '#2A2E2C', // Subtle borders
        },
        light: {
          DEFAULT: '#F3F4F6', // Off white text
          muted: '#9CA3AF', // Gray muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
