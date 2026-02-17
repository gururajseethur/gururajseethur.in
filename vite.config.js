import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from './plugins/vite-plugin-markdown.js';

export default defineConfig({
  plugins: [react(), markdown()],
  server: {
    port: 3000,
    open: true,
  },
});
