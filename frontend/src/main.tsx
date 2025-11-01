import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

if (!window.dataLayer) {
  window.dataLayer = [];
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
