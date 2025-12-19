import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/'  // ← Vérifie que c'est bien '/' et pas '/thibaudpages/'
})