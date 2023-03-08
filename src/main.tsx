import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './store/config'
import App from './App'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
