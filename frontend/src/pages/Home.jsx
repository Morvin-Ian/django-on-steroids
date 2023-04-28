import React, { useEffect } from 'react'
import "../assets/sass/home.scss"
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {

  const redirect = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const [messages, setMessages] = useState('');
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
    if(localStorage.getItem('access_token') === null)
    {    
      redirect('/sign-in');
    }

    fetchMessages()

  }, []);


  return (
    <div className="home">
        <div className="cont">
            <SideBar/>
            <Chat messages={messages}/>
        </div>

    </div>
  )
}

export default Home