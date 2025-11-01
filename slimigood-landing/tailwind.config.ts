import type { Config } from 'tailwindcss';

export default {
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1FB6FF',
        accent: '#FF5F5F',
        dark: '#0F172A',
        muted: '#94A3B8'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;
