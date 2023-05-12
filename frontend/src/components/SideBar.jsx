import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const SideBar = ({chats, setReceiver}) => {
  return (
    <div className='sidebar'>
         <Navbar/>
         <Search/>
         <Chats chats = {chats} setReceiver ={setReceiver}/>
    </div>
  )
}

export default SideBar