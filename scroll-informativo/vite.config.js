import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        id: '/',
        name: 'InfoScroll - Factos e Quizzes',
        short_name: 'InfoScroll',
        description: 'Aprende coisas novas com um scroll infinito.',
        theme_color: '#1e293b',
        background_color: '#0f172a',
        display: 'standalone', // Faz com que pareça uma app nativa, sem a barra de pesquisa
        // 2. Tranca a app na vertical
        orientation: 'portrait', 
        
        // 3. Categorias para melhorar a experiência de instalação
        categories: ['education', 'entertainment', 'game'], 
        
        // 4. Diz ao browser para dar prioridade à PWA e não procurar apps nativas 
        prefer_related_applications: false, 
        related_applications: [],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/Scroll.png',
            sizes: '485x934', 
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/Temas.png',
            sizes: '485x934', 
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/GaleriaTrofeus.png',
            sizes: '485x934', 
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/Jardim.png',
            sizes: '485x934', 
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/Loja.png',
            sizes: '485x934', 
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      }
    })
  ]
})