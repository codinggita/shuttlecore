import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import store from './store/store'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundary>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </ErrorBoundary>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
)
