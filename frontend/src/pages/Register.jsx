import React, { useState } from 'react';
import '../assets/sass/logins.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirect = useNavigate();

  const url = "http://127.0.0.1:8000/api/auth/register/";

  const registerUser = async (credentials) =>{
    const response = await fetch(url, {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(credentials), // body data type must match "Content-Type" header

       });

      const data = await response.json()

      if (!response.ok) 
      {
        setError("Username or Email Already Exists")
        
      }

      else{
        redirect('/sign-in')
      }
  }
  const errorMsg = 
  {
      textAlign:"center",
      fontSize:"small",
      color:"red",
      MarginTop:"10px"

  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    const credentials = {username, email, password};
    registerUser(credentials);

    setError('');
    setPassword('');

  };

  return (
        <div className='container'>
        <div className='wrapper'>
        <span className='title'>Sign Up your Account</span>
        <p style={errorMsg}>{error}</p>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text"
                   placeholder='Perfect Username'
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)}
                   required
                  />
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
            <button>Sign Up</button>
        </form>
        <p><small>Have an account <span><Link to="/sign-in">Sign in</Link></span></small></p>
        </div>
    </div>
  )
}

export default Register;