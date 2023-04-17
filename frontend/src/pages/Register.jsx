import React, { useState } from 'react';
import '../assets/sass/logins.scss';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');


  const url = "http://127.0.0.1:8000/api/register/";

  const registerUser = (credentials) =>{
    fetch(url, {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',

        },
       body: JSON.stringify(credentials), // body data type must match "Content-Type" header

    });

  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const credentials = {username, email, password};
    registerUser(credentials);

    setUsername("");
    setEmail("");
    setPassword("");
    setProfile("");

  };

  return (
        <div className='container'>
        <div className='wrapper'>
        <span className='title'>Sign Up your Account</span>
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
            <input type="file" id='file' accept='image/*'/>
            <button>Sign Up</button>
        </form>
        <p><small>Have an account <span><a href="#log">Sign in</a></span></small></p>
        </div>
    </div>
  )
}

export default Register;