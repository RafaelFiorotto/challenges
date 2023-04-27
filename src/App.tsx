import React, { useEffect } from 'react'

import { LoadingProvider } from '@siakit/loading'
import { useToast } from '@siakit/toast'

import AppRoutes from './routes'
import api from './services/api'
import GlobalStyle from './styles/global'

function App() {
  const { addToast } = useToast()
  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response.status === 404) {
          addToast({
            type: 'error',
            title: 'Atenção!',
            description: 'Ocorreu um erro ao tentar encontrar o repositório!',
          })
        }
      },
    )
  }, [])
  return (
    <LoadingProvider>
      <GlobalStyle />
      <AppRoutes />
    </LoadingProvider>
  )
}

export default App
