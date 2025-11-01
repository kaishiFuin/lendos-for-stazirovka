import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          DEFAULT: '#7C3AED',
          light: '#A855F7',
          dark: '#5B21B6'
        },
        accent: '#22D3EE'
      },
      boxShadow: {
        glow: '0 20px 45px rgba(124, 58, 237, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
