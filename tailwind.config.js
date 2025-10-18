/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calc-bg': 'rgba(32, 32, 32, 0.95)',
        'calc-header': 'rgba(0, 0, 0, 0.2)',
        'calc-display': 'rgba(0, 0, 0, 0.2)',
        'calc-button': 'rgba(60, 60, 60, 0.8)',
        'calc-button-hover': 'rgba(80, 80, 80, 0.9)',
        'calc-function': 'rgba(50, 50, 50, 0.8)',
        'calc-operator': 'rgba(70, 70, 70, 0.8)',
        'calc-equals': '#0078d4',
        'calc-equals-hover': '#1084d8',
      },
      backdropBlur: {
        '20': '20px',
      },
    },
  },
  plugins: [],
}
