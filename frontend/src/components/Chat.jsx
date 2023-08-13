import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useNavigate, useParams } from 'react-router-dom'


const Chat = ({messages, socket, receiver}) => {

  const redirect = useNavigate();
  const {uuid} = useParams();
  
  
  const logoutUser = () =>{

    if(localStorage.getItem('access_token'))
    {
      localStorage.clear();
      redirect('/sign-in');
    }

  }
  
  return (
    <div className='chat'>
   
        {uuid ? 
        <>
        <div className="chat-info">
            <span id='span'>Oluoch Ian</span>
            <div className="icons">
                <button onClick={logoutUser}>Logout</button>

            </div>
        </div>
        <Messages messages = {messages}/>
        <MessageInput socket={socket} receiver={receiver}/>
        </>:
    
        <div 
            style={{height:"100%", justifyContent:"center", borderLeft:"1px solid black"}} 
            className="chat-info">
          <h1>Converse with Friends & Families</h1>
          <button onClick={logoutUser}>+</button>
        </div>
      }
    </div>
  )
}

export default Chat