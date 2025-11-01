import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#7F56D9',
          dark: '#5B31B6'
        },
        accent: '#F97316',
        neutral: '#101828'
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
