import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/home/SideBar'
import Chat from '../components/home/Chat'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchMessages, fetchRelationships } from '../api/apiFetch.ts'
import FlashMessage from '../components/common/FlashMessage'
import ModalPopup from '../components/common/ModalPopup'

const Home = () => {
  
  const redirect = useNavigate();
  const {uuid} = useParams();

  const [messages, setMessages] = useState('');
  const [receiver, setReceiver] = useState('');
  const [chats, setChats] = useState('')
  const [onlineStatus, setOnlineStatus] = useState(false)


  const access_token = localStorage.getItem('access_token');
  const senderId = localStorage.getItem('uuid');

  const port = "127.0.0.1:8000"
  const socket = uuid ? new WebSocket(`ws://${port}/ws/chat/${uuid}/`) : new WebSocket(`ws://${port}/ws/homepage`);


  const apiCall = async (apiFunc, setState) =>{
    const data = await apiFunc(access_token)
    setState(data)
  }
  
        
  useEffect(() => 
  {
    if(!localStorage.getItem('access_token'))
    {    
      redirect('/sign-in');
    }

    apiCall(fetchRelationships, setChats)
    apiCall(fetchMessages, setMessages)

    setTimeout(async ()=>{
      if( socket.url === `ws://${port}/ws/homepage`)
      {
        const data = {
          "typing":null,
          "user":senderId,
          "status":"online",
        }
      
        socket.send(JSON.stringify(data))
      }

      socket.onmessage = async(e)=>{
        const response = JSON.parse(e.data)
        
        if(response.status === "online"){
           setOnlineStatus(true)
          };
      }
    }, 500)
  

  }, []);
  


  return (
    <div className="home">
        <div className="cont">
          { onlineStatus ?
            <FlashMessage 
                message="Successfully Connected" 
                alertType = "success"
            />:

            <FlashMessage 
                message="Websocket Connection Error" 
                alertType = "error"
            />
           }

           <SideBar 
              setReceiver={setReceiver} 
              setChats={setChats} 
              chats={chats} 
            />

            <Chat 
              messages={messages}
              socket={socket} 
              receiver={receiver}
            />
        </div>

    </div>
  )
}

export default Home