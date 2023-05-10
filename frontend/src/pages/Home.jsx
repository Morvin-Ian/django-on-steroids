import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  
  const redirect = useNavigate();

  const {uuid} = useParams();
  const access_token = localStorage.getItem('access_token');
  const [messages, setMessages] = useState('');
  const [action, setAction] = useState('');
  let socket = null

  const socketSetter = () => {
    if(uuid){
        socket = new WebSocket('ws://127.0.0.1:8000' + '/ws/chat/' + uuid +'/');
  
    }
  
    else{
        socket = new WebSocket('ws://127.0.0.1:8000' + '/ws/');
  
    }
    
    return socket

  }
  
 


  const socketConnection = (e)=>
  
  {

     socket = socketSetter()
  
   if(access_token)
   {

     socket.onmessage = async function(e)
     {           
        
        console.log(JSON.parse(e.data))

     }
    
 }
}


  const messagesUrl = "http://127.0.0.1:8000/api/messages/list-create/";

    const fetchMessages = async() => {
    try {
     
      // Send a fetch request with the bearer token
      const response = await fetch(messagesUrl, {
        headers: { 'Authorization': `Bearer ${access_token}` },
      });
  
      // Get the response data
      const data = await response.json();
      setMessages(data)

      } 
    catch (error) 
    {
      console.error(error);
    }
  }

        
     

  useEffect(() => 
  {
    if(!localStorage.getItem('access_token'))
    {    
      redirect('/sign-in');
    }
    socketConnection()
    fetchMessages()   


  }, []);
  




  return (
    <div className="home">
        <div className="cont">
            <SideBar action={action}  />
            <Chat messages={messages} socket={socketSetter()} />
        </div>

    </div>
  )
}

export default Home