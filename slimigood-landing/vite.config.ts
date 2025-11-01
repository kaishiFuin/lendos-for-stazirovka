import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          quiz: ['./src/components/QuizFlow.tsx'],
          faq: ['./src/components/FAQ.tsx']
        }
      }
    }
  },
  test: {
    environment: 'jsdom'
  }
});
