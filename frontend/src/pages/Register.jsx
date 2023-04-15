import React from 'react'
import '../assets/sass/logins.scss'
import avatar from "../assets/images/octo.jpg"

const Register = () => {
  return (
        <div className='container'>
        <div className='wrapper'>
        <span className='title'>Sign Up your Account</span>
        <form>
            <input type="text" placeholder='Perfect Username' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password'/>
            <input type="file" id='file'/>
            {/* <label htmlFor="file">
                <img src={avatar} alt="" height="30px" width="30px" style={{borderRadius:"50%"}}/>
                <span>Add profile </span>
            </label> */}
            <button>Sign Up</button>
        </form>
        <p><small>Have an account <span><a href="#log">Sign in</a></span></small></p>
        </div>
    </div>
  )
}

export default Register