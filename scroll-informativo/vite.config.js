import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'InfoScroll - Factos e Quizzes',
        short_name: 'InfoScroll',
        description: 'Aprende coisas novas com um scroll infinito.',
        theme_color: '#1e293b',
        background_color: '#0f172a',
        display: 'standalone', // Faz com que pareça uma app nativa, sem a barra de pesquisa
        icons: [
          {
            src: 'public/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'public/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})