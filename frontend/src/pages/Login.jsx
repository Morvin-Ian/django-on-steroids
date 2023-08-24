import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authenticate} from '../api/auth'


const errorMsg = {
    textAlign:"center",
    fontSize:"small",
    color:"red",
    MarginTop:"10px"

}


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const redirect = useNavigate()


  const loginUser = async (credentials) =>
  {
    const data = await authenticate(credentials)   
    if (data) {
      setError(data)
      setPassword('');
    }else{
      redirect('/')
    }

  }


  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const credentials = {email, password};
    loginUser(credentials);

    setError('');

  };

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