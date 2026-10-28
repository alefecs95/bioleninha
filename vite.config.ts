import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // QR codes e Coolify usam https://leninha.abadelivery.com/digital
  base: '/digital/',
  plugins: [react(), tailwindcss()],
})
