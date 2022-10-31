import React from 'react';
import ReactDOM from 'react-dom/client';
import "normalize.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss'

import App from './App';
import { Provider } from 'react-redux';
import Store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

