/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 enables class-based dark mode control
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#004d26',
        accent: '#00ff99',
      },
      boxShadow: {
        glow: '0 0 10px rgba(0, 255, 153, 0.5)',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke, box-shadow',
      },
    },
  },
  plugins: [],
};
