import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

const root = createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
