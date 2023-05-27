import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
import GeneralProvider from './contextos/General'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <GeneralProvider>
      <App></App>
    </GeneralProvider>
  </React.StrictMode>
)