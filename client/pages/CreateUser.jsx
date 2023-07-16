import React from 'react';
import Select from 'react-select'
import { useState } from 'react';

export function CreateUser() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('')
  const [profilepic, setProfile] = useState('')

  const createuser = async () => {
    try { 
      const res = await fetch('/api/user/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password, name: name, profilepic: profilepic }),
      });
      const data = await res.json();
      if (data === 'created') {
        console.log('created')
        window.location.href = '/'
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

  const options = [
    { value:'https://ca.slack-edge.com/T04UDTZ6YA3-U058YU726UE-660ddfad6bdc-512',
    label: <div><img src='https://ca.slack-edge.com/T04UDTZ6YA3-U058YU726UE-660ddfad6bdc-512' height = '100px' width = '100px'/></div>
  }
  ]

  const handleProfileChange = (selectedOption) =>{
    setProfile(selectedOption.value)
    console.log(profilepic)
  }

  return (
    <div id = 'createlogin'>
      <div id = 'logincreate'>
        <h1>Registration</h1>
        <h3>Sign up Below</h3>
        <label>Name</label>
        <input
          name="name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Your Name Here"
        ></input>
        <div>
        </div>
        <label>Select a profile picture</label>
        <Select options = {options} onChange={handleProfileChange}/>
        <br></br>
        <label>Username</label>
        <input
          name="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Your User Name Here "
        ></input>
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Your Password Here "
        ></input>
        <button onClick={createuser}>Create User</button>
      </div>
      <button id="" className="showbutton" onClick={showPassword}>
        {' '}
        Show password
      </button>
      <br></br>
      <a id="" href="./">
        Go Back to Login
      </a>
    </div>
  );
}

