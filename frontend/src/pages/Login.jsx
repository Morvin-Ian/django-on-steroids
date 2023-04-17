import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirect = useNavigate()

  const url = "http://127.0.0.1:8000/auth/api/token/";

  const loginUser = async (credentials) =>{
    const response = await fetch(url, {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },

       body: JSON.stringify(credentials), // body data type must match "Content-Type" header
    });


    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    redirect('/');
  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    const credentials = {username, password};
    loginUser(credentials);

    setUsername("");
    setPassword("");

  };

  return (
        <div className='container'>
        <div className='wrapper'>
        <span className='title'>Sign In your Account</span>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text"
                   placeholder='Username'
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)}
                   required
                  />
 
            <input type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  
                  />    
            <button>Sign In</button>
        </form>
        <p><small>Don't Have an account <span><a href="#log">Sign Up</a></span></small></p>
        </div>
    </div>
  )
}

export default Login;