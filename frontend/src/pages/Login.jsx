import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const redirect = useNavigate()

  const url = "http://127.0.0.1:8000/api/auth/login/";

  const loginUser = async (credentials) =>
  {
    const response = await fetch(url, {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },

       body: JSON.stringify(credentials), // body data type must match "Content-Type" header
    });

    const data = await response.json();

    if (!response.ok) 
    {
      setError(data)
      setPassword('');

    }

    else
    {
        localStorage.clear()
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('uuid', data.uuid);
        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.username);

        redirect('/');
      
    }
  }


  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const credentials = {email, password};
    loginUser(credentials);

    setError('');
  };

  const errorMsg = 
  {
      textAlign:"center",
      fontSize:"small",
      color:"red",
      MarginTop:"10px"

  }

  return (
        <div className='container'>
        <div className='wrapper'>
        <span className='title'>Sign In your Account</span>
        <p style={errorMsg}>{error}</p>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="email"
                   placeholder='Email'
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
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
        <p><small>Don't Have an account <span><Link to='/sign-up'>Sign Up</Link></span></small></p>
        </div>
    </div>
  )
}

export default Login;