import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchMessages, fetchRelationships } from '../api/apiFetch'

const Home = () => {
  
  const redirect = useNavigate();
  const {uuid} = useParams();

  const [messages, setMessages] = useState('');
  const [receiver, setReceiver] = useState('');
  const [chats, setChats] = useState('')

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
        console.log(response)
      }
    }, 1000)
  

  }, []);
  


  return (
    <div className="home">
        <div className="cont">
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