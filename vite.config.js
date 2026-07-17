import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from './plugins/vite-plugin-markdown.js';

const THREE_VENDOR_PACKAGES = ['three', '@react-three/fiber', '@react-three/drei'];

function isThreeVendorChunk(id) {
  return THREE_VENDOR_PACKAGES.some((packageName) => (
    id.includes(`/node_modules/${packageName}/`)
    || id.includes(`\\node_modules\\${packageName}\\`)
  ));
}

export default defineConfig({
  plugins: [react(), markdown()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (isThreeVendorChunk(id)) {
            return 'three-vendor';
          }

          return undefined;
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
