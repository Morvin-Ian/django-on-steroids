import mid from "../assets/images/hope.jpg"
import {Link, useParams} from "react-router-dom"
import React, { useEffect, useState } from 'react'


const Chats = ({action}) => {

  const relationshipsUrl = "http://127.0.0.1:8000/api/messages/chats/";
  const access_token = localStorage.getItem('access_token');
  const [chats, setChats] = useState('')
  const {uuid} = useParams()


  const fetchRelationships = async() => {
    try {
     
      // Send a fetch request with the bearer token
      const response = await fetch(relationshipsUrl, {
        headers: { 'Authorization': `Bearer ${access_token}` },
      });
  
      // Get the response data
      const data = await response.json();
      setChats(data)

      } 
    catch (error) 
    {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRelationships()  
  }, [])
  
  return (
    <div className='chats'>
      
        { chats.length > 0 ?
          Array.from(chats).map((chat=>
              <Link style={{textDecoration:"none"}} key={chat.uuid} to={`/chat/${chat.uuid}`} className="user-chat">
                <img src={mid} alt="" />
                <div className="chat-info">
                    <span>{chat.chat}</span>
                    {action != '' && uuid == chat.uuid ?
                    
                    <p id="span2">{action}</p>:
                    <p id="span2">Good Morning Bro</p>
                    
                    }
                    
                </div>
              </Link>
          ))
          :
           <div className="user-chat">
                <div className="chat-info">
                    <p> No available chats</p>
                </div>
          </div>
        }
    </div>
  )
}

export default Chats