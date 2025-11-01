/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['frontend/index.html', 'frontend/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          DEFAULT: '#6B4EFF',
          dark: '#4C2ED9',
          light: '#B4A3FF',
        },
        accent: '#F9A826',
        success: '#2DD4BF',
        warning: '#FBBF24',
        danger: '#F87171',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinWheel: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        spinWheel: 'spinWheel 4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
