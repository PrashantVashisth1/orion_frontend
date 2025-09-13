import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000 // Change this line to set a new port
  },
  plugins: [react(),tailwindcss(),],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
})
