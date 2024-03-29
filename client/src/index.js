import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer theme='dark' />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
