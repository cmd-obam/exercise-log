import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages: https://cmd-obam.github.io/exercise-log/
export default defineConfig({
  plugins: [react()],
  base: '/exercise-log/',
})
