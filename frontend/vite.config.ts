import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    // For Vercel deployment, build to 'dist'
    // For Spring Boot integration, build to '../src/main/resources/static'
    outDir: process.env.BUILD_FOR_VERCEL ? 'dist' : '../src/main/resources/static',
    emptyOutDir: true,
  },
})
