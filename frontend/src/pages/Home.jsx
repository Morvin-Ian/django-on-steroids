import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


import { fetchMessages } from '../api/messages'
import {  fetchRelationships } from '../api/relationships'

import "../assets/sass/home.scss"
import SideBar from '../components/home/SideBar'
import Chat from '../components/home/Chat'
import FlashMessage from '../components/common/FlashMessage'

const Home = () => {
  
  const redirect = useNavigate();
  const {uuid} = useParams();

  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState([]);
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
      if(socket)
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
    }, 1000)
  

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
                message="Connecting ..." 
                alertType = "info"
            />
           }

           <SideBar 
              setReceiver={setReceiver} 
              setChats={setChats} 
              receiver={receiver}
              chats={chats} 
            />

            <Chat 
              setMessages={setMessages}
              messages={messages}
              socket={socket} 
              receiver={receiver}
            />
        </div>

    </div>
  )
}

export default Home