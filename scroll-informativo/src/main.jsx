import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. IMPORTAMOS O GATILHO DO PWA
import { registerSW } from 'virtual:pwa-register'

// 2. ATIVAMOS A INSTALAÇÃO AUTOMÁTICA
registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)