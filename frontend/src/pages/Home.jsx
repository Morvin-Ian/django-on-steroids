import  {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { fetchMessages } from '../api/messages'
import {  fetchRelationships } from '../api/relationships'

import "../assets/sass/home.scss"
import SideBar from '../components/home/SideBar'
import Chat from '../components/home/Chat'
import FlashMessage from '../components/common/FlashMessage'

const Home = () => {
  
  const redirect = useNavigate();

  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [chats, setChats] = useState('')
  const [onlineStatus, setOnlineStatus] = useState(false)
  const access_token = localStorage.getItem('access_token');
  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/home`);


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

    socket.onopen = async function(e){
      setOnlineStatus(true)
    }


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
              chats={chats}
            />

            <Chat 
              setMessages={setMessages}
              setChats={setChats}
              messages={messages}
              socket={socket} 
              setReceiver={setReceiver} 
              receiver={receiver}
            />
        </div>

    </div>
  )
}

export default Home