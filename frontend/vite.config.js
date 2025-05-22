import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // <-- Esto activa el nuevo JSX transform
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})