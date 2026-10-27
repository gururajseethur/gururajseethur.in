import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from './plugins/vite-plugin-markdown.js';

export default defineConfig({
  plugins: [react(), markdown()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
  }
});
