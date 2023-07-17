import React from 'react';
import Select from 'react-select'
import { useState } from 'react';
import './login.scss'

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
    { value:'https://media.licdn.com/dms/image/C4E03AQH4P4DxCHzF3g/profile-displayphoto-shrink_200_200/0/1652449349611?e=1695254400&v=beta&t=KiTMboL5sqFIkEy-359ot4rgIrsNQdOiXQZweQvWgYA',
    label: <div><img src='https://media.licdn.com/dms/image/C4E03AQH4P4DxCHzF3g/profile-displayphoto-shrink_200_200/0/1652449349611?e=1695254400&v=beta&t=KiTMboL5sqFIkEy-359ot4rgIrsNQdOiXQZweQvWgYA' height = '100px' width = '100px'/></div>
  },
  { value:'https://media.discordapp.net/attachments/1117884044961648691/1129889905443606588/Screenshot_2023-07-15_at_5.36.36_PM.png?width=337&height=199',
  label: <div><img src='https://media.discordapp.net/attachments/1117884044961648691/1129889905443606588/Screenshot_2023-07-15_at_5.36.36_PM.png?width=337&height=199' height = '100px' width = '100px'/></div>
}
  ]

  const handleProfileChange = (selectedOption) =>{
    setProfile(selectedOption.value)
    console.log(profilepic)
  }

  return (
    <div id = 'createlogin'>
      <div id = 'logincreate'>
        <h1>Create an Account!</h1>
        <hr />
        <div className='input-container'>
          <label><h3>Name</h3></label>
          <input
          className = 'allinputfields'
            name="name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Your Name Here"
          ></input>
          
        </div>
        <div>
        </div>
        <div className='input-container'>
          <label><h3>Select a profile picture</h3></label>
          <Select className = 'allinputfields' options = {options}  onChange={handleProfileChange}/>
        </div>

        <div className='input-container'>
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
        </div>
        <div className='input-container'>
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
        </div>
      <button id="allbuttons"  onClick={showPassword}>
        {' '}
        Show password
      </button>
      <hr />
        <button id ='allbuttons' onClick={createuser}>Create User</button>
      </div>
      <br></br>
      <a id="gobackbutton" href="./"><h3>
        Go Back to Login
      </h3>
      </a>
    </div>
  );
}

