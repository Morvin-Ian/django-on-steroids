import React, { useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useNavigate, useParams } from 'react-router-dom'


const Chat = ({messages}) => {

  const redirect = useNavigate();
  const params = useParams();
  const [action, setAction] = useState('')
  
  
  const logoutUser = () =>{
    if(localStorage.getItem('access_token'))
    {
      localStorage.removeItem("access_token");
      redirect('/sign-in');
    }

  }
  
  return (
    <div className='chat'>
   
        {params.uuid ? 
        <>
        <div className="chat-info">
            <span id='span'>Oluoch Ian</span>
            <div className="icons">
                <button onClick={logoutUser}>Logout</button>

            </div>
        </div>
        <Messages messages = {messages}/>
        <MessageInput />
        </>:
    
    <div style={{height:"100%", justifyContent:"center", borderLeft:"1px solid black"}} className="chat-info">

      <h1>Converse with Friends & Families</h1>
     
    </div>
      }
    </div>
  )
}

export default Chat