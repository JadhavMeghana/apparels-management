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
    // Vercel automatically sets VERCEL=1, or we use BUILD_FOR_VERCEL env var
    outDir: (process.env.BUILD_FOR_VERCEL === 'true' || process.env.VERCEL === '1' || process.env.VERCEL) ? 'dist' : '../src/main/resources/static',
    emptyOutDir: true,
  },
})
