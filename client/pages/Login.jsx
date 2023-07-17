import React from 'react';
import { useState } from 'react';
import './login.scss'

export function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const login = async () => {
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (data === 'false') {
        // 'error' will be sent back in the backend
        alert('Username or Password does not exist');
      }
      if (data === 'true') {
        console.log('hey im in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showPassword = () => {
    let password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  };
  return (
    <div id = 'createlogin'>
      <div id = 'logincreate'>
        <h1>Welcome to Step Buddy</h1>
        <hr />
        <h2>Sign in Below</h2>
        <label><h3>Username</h3></label>
        <input
        className = 'allinputfields'
          name="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Your User Name Here "
        ></input>
        <label><h3>Password</h3></label>
        <input
          id="password"
          className = 'allinputfields'
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Your Password Here "
        ></input>
      <button id="allbuttons" className='btn2' onClick={showPassword}>
        {' '}
        Show password
      </button>
      <hr />
        <button id='allbuttons' className='btn1' onClick={login}>Login</button>
      </div>
      <a id="gobackbutton" href="./createuser"><h3>Sign Up Here</h3>
        
      </a>
    </div>
  );
}
