import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastProvider } from '@siakit/toast'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)
