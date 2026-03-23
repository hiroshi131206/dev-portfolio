import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/dev-portfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('react-dom') || id.includes('react-router')) return 'react'
        },
      },
    },
  },
})
