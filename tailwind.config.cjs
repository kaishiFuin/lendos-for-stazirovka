module.exports = {
  content: ['./frontend/index.html', './frontend/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4c6ef5',
          dark: '#364fc7',
          light: '#a5b4fc',
        },
        accent: '#f76707',
        success: '#2f9e44',
        warning: '#f59f00',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 40px rgba(76, 110, 245, 0.25)',
      },
    },
  },
  plugins: [],
};
