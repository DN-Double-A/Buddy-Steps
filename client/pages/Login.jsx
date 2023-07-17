import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import { UserContext } from '../contexts/Contexts';

export function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { setGlobalUsername } = useContext(UserContext);

  const navigate = useNavigate();

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
        navigate('/home');
        //TODO: set username here
        console.log('username: ', username);
        setGlobalUsername(username);
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
    <div id="createlogin">
      <div id="logincreate">
        <h1>Welcome to Buddy Step</h1>
        <hr />
        <h2>Sign in Below</h2>
        <div className="input-container">
          <label>
            <h3 className="name-h3">Username</h3>
          </label>
          <input
            className="allinputfields"
            name="username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Your User Name Here "
          ></input>
        </div>
        <div className="input-container">
          <label>
            <h3>Password</h3>
          </label>
          <input
            id="password"
            className="allinputfields"
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Your Password Here "
          ></input>
        </div>
        <button id="allbuttons" onClick={showPassword}>
          {' '}
          Show password
        </button>
        <hr />
        <button id="allbuttons" onClick={login}>
          Login
        </button>
      </div>
      <div id="userdirect">
        <h3>New to Buddy Step?</h3>
        <a id="gobackbutton" href="./createuser">
          <h3>Sign Up Here</h3>
        </a>
      </div>
    </div>
  );
}
