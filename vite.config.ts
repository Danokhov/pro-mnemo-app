import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    // Используем переменные окружения из Netlify
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || process.env.NETLIFY_API_KEY || ""),
    'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.API_KEY || process.env.NETLIFY_API_KEY || ""),
    // OpenAI TTS: подставляем в бандл при сборке (Netlify: VITE_OPENAI_API_KEY или OPENAI_API_KEY)
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || ''),
    'import.meta.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY || '')
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild'
  }
});
