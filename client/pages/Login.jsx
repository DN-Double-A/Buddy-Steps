import React from 'react';
import { useState } from 'react'

export function Login() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const login = async () => {
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { username, password }
            })
            const data = await res.json()
            if (data = 'error') { // 'error' will be sent back in the backend
                alert('Username or Password does not exist')
            } else {
                // LINK TO HOMEPAGE with USER DATA
            }
        } catch (error) {
            console.log(error)
        }
    }

    const showPassword = () => {
        let password = document.getElementById('password')
        if (password.type === 'password') {
            password.type = 'text'
        } else {
            password.type = 'password'
        }
    }
    return (
        <div>
            <div>
                <h1>Welcome to Step Buddy</h1>
                <h3>Sign in Below</h3>
                <label>Username</label>
                <input
                    name='username'
                    type='text'
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    placeholder='Your User Name Here '></input>
                <label>Password</label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder='Your Password Here '></input>
                <button>Login</button>
            </div>
            <button id='' className='showbutton' onClick={showPassword}> Show password</button>
            <br></br>
            <a id='' href='./signup'>Sign Up Here</a>
        </div>

    )
}
