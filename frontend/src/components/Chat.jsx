import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useNavigate } from 'react-router-dom'

const Chat = () => {

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
        <Messages/>
        <MessageInput/>
    </div>
  )
}

export default Chat