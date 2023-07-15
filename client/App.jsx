import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.scss';

import { Login } from './pages/Login';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
    // test
  );
}