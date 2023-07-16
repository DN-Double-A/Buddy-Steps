import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.scss';

import { Login } from './pages/Login';
// import {Home} from './pages/Home'

// import { Login } from './pages/Login';
import {Home} from './pages/Home'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      {/* <Route path = '/home' element = {<Home/>}/> */}
    </Routes>
    // test
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path = '/home' element = {<Home/>}/>
    </Routes>
  );
}
