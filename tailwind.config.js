/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          100: "var(--color-light-100)",
          200: "var(--color-light-200)",
          300: "var(--color-light-300)",
          400: "var(--color-light-400)",
        },
        dark: {
          100: "var(--color-dark-100)",
          200: "var(--color-dark-200)",
          300: "var(--color-dark-300)",
          400: "var(--color-dark-400)",
          500: "var(--color-dark-500)",
        },
        background: {
          100: "var(--color-background-nav)",
          800: "var(--color-background-800)",
          900: "var(--color-background)",
          // 200: "#e6e6e6",
          // 300: "#cccccc",
          // 400: "#b3b3b3",
          // 500: "#999999",
          // 600: "#808080",
          // 700: "#666666",
          // 800: "#4d4d4d",
          // 900: "#333333",
        },
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
        },
        secondary: {
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
        },
        success: {
          100: "var(--color-success-100)",
          200: "var(--color-success-200)",
          300: "var(--color-success-300)",
          400: "var(--color-success-400)",
          500: "var(--color-success-500)",
        },
        warning: {
          100: "var(--color-warning-100)",
          200: "var(--color-warning-200)",
          300: "var(--color-warning-300)",
          400: "var(--color-warning-400)",
          500: "var(--color-warning-500)",
        },
        grayShade: {
          // 100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
        },
      },
    },
  },
};
