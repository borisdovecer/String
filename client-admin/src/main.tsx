import './index.css'
import React from 'react';
import App from './App.tsx';
import { store } from "@app/store";
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { DAppProvider } from "@usedapp/core";
import { config } from "@app/config/chainConfig.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <DAppProvider config={config}>
          <Provider store={store}>
              <App />
          </Provider>
      </DAppProvider>
  </React.StrictMode>,
)
