import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchMessages, fetchRelationships } from '../assets/apiFetch'

const Home = () => {
  
  const redirect = useNavigate();

  const {uuid} = useParams();
  const access_token = localStorage.getItem('access_token');
  const [messages, setMessages] = useState('');
  const [receiver, setReceiver] = useState('');
  const [chats, setChats] = useState('')
  const socket = new WebSocket('ws://127.0.0.1:8000' + '/ws/chat/' + uuid +'/');

  const apiCall = async (apiFunc, setState) =>{
    const data = await apiFunc(access_token)
    setState(data)
  }

  const socketConnection = (e)=>
  
  {
    if(uuid)
    {
      if(access_token)
      {
        socket.onmessage = async function(e)
        {
                 
           const data = JSON.parse(e.data);
           
           apiCall(fetchMessages, setMessages)
        }
       
    }
    }
  
  }

        
  useEffect(() => 
  {
    if(!localStorage.getItem('access_token'))
    {    
      redirect('/sign-in');
    }

    socketConnection()
    apiCall(fetchRelationships, setChats)
    apiCall(fetchMessages, setMessages)
  

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