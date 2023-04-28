import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


const Chat = ({messages}) => {

  const redirect = useNavigate();
  
  const logoutUser = () =>{
    if(localStorage.getItem('access_token'))
    {
      localStorage.removeItem("access_token");
      redirect('/sign-in');
    }

  }


  
  return (
    <div className='chat'>
        <div className="chat-info">
            <span>Oluoch</span>
            <div className="icons">
                <button onClick={logoutUser}>Logout</button>

            </div>
        </div>
        <Messages messages = {messages}/>
        <MessageInput/>
    </div>
  )
}

export default Chat