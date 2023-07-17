import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.scss';
import UserContext from './components/UserContext';
import { Home } from './pages/Home'
import { Login } from './pages/Login';
import { CreateUser } from './pages/CreateUser';
import { useState, useEffect } from 'react';


export function App() {

  //& Using UserContext to have 'username' and 'setUserName' as global variables throughout are app (ITS OP!)
  const [username, setUserName] = useState('currymonstanacho')

  return (
    <UserContext.Provider value={{username, setUserName}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ='/createuser' element = {<CreateUser/>}/>
        <Route path='/home' element={<Home />} />
      </Routes>
    </UserContext.Provider>

  );
}
