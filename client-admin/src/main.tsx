import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DAppProvider } from "@usedapp/core";
import { config } from "@app/config/chainConfig.ts";
import './index.css'
import { Provider } from "react-redux";
import store from "@app/store/store.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <DAppProvider config={config}>
          <Provider store={store}>
              <App />
          </Provider>
      </DAppProvider>
  </React.StrictMode>,
)
