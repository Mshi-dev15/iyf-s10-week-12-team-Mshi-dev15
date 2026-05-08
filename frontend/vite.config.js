// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,  // ✅ Prevent auto-opening browser (from main)
    proxy: {      // ✅ Enable API proxy to backend (from branch)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})