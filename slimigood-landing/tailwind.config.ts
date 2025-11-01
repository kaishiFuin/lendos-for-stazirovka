import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#6c5ce7',
        accent: '#00b894',
        dark: '#1b1b1f'
      },
      boxShadow: {
        glow: '0 10px 30px rgba(108, 92, 231, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
