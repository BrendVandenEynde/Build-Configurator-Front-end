import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],  // Ensure the Vue plugin is included here
  base: '', // Customize the base path for deployment
  server: {
    open: true,
    port: 3000, // Specify a custom port for the dev server
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});