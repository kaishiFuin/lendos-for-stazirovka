module.exports = {
  content: [
    './frontend/index.html',
    './frontend/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6',
        accent: '#F97316',
        success: '#22C55E',
        info: '#0EA5E9',
        neutral: '#111827'
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
