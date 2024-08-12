import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/style.scss';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Init from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Init>
      <App />
    </Init>
  </React.StrictMode>,
);

reportWebVitals();
