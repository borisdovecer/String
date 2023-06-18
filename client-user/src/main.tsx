import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {DAppProvider} from "@usedapp/core";
import {config} from "@app/config/chainConfig.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
  </React.StrictMode>,
)
