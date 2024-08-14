import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/style.scss';
import './index.css';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  const vdom = await init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
