import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '', // Ensure the base path is empty for relative paths
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'dist', // Ensure the build output directory matches what the server serves
    sourcemap: true,
    rollupOptions: {
      input: './index.html', // Entry point for Rollup
    },
  },
});