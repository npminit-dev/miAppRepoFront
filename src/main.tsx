import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
import GeneralProvider from './contextos/General'
import './index.css'
import { IconContext } from "react-icons";

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  
    <GeneralProvider>
      <IconContext.Provider value={{className: 'global-class-name'}}>
        <App></App>
      </IconContext.Provider>
    </GeneralProvider>
  
)