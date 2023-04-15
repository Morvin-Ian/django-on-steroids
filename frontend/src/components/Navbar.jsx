import React from 'react'
import avatar from "../assets/images/octo.jpg"


const Navbar = () => {
  return (
    <div className='navbar'>
        <span className="logo">Brace Converse</span>
        <div className="user">
            <img src={avatar} alt=""/>

        </div>
    </div>
  )
}

export default Navbar