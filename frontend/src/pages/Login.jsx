import React from 'react'

const Login = () => {
  return (
        <div className='container'>
        <div className='wrapper'>
        <span className='title'>Sign In your Account</span>
        <form>
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password'/>       
            <button>Sign In</button>
        </form>
        <p><small>Don't Have an account <span><a href="#log">Sign Up</a></span></small></p>
        </div>
    </div>
  )
}

export default Login;