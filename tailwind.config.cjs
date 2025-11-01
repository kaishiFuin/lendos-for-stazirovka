/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['frontend/index.html', 'frontend/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE7',
        secondary: '#00B894',
        accent: '#FD79A8',
        dark: '#2D3436',
        light: '#F5F6FA'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Ubuntu',
          'Helvetica Neue',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
};
