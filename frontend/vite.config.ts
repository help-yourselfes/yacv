import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '..\\backend\\public',
    emptyOutDir: true
  }
  ,  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/images': {
        target: 'http://localhost:3000', // адрес вашего бэкенда
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, '/images'),
      }
    }
  }
})
