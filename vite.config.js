import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Change base if you will host under a subpath, e.g. '/hub/'
  base: '/'
})
