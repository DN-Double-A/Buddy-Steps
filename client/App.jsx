import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.scss';
import ThemeContext from './components/ThemeContext';
import { Home } from './pages/Home'
// import { Login } from './pages/Login';
import { useState, useEffect } from 'react';

export function App() {

  //& Using ThemeContext to have 'username' and 'setUserName' as global variables throughout are app (ITS OP!)
  const [username, setUserName] = useState('currymonstanacho')

  return (
    <ThemeContext.Provider value={{username, setUserName}}>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path='/home' element={<Home />} name={name} />
      </Routes>
    </ThemeContext.Provider>

  );
}
