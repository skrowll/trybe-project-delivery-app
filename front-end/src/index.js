import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import DeliveryProvider from './context/DeliveryProvider';

ReactDOM.render(
  <React.StrictMode>
    <DeliveryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeliveryProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
