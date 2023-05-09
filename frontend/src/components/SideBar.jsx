import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const SideBar = ({action}) => {
  return (
    <div className='sidebar'>
         <Navbar/>
         <Search/>
         <Chats action={action}/>
    </div>
  )
}

export default SideBar