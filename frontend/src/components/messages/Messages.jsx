import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { chatContext } from "../../context/ChatContext";

const Messages = ({ setMessages, socket, messages }) => {
  const sender_uuid = localStorage.getItem("uuid");
  const {state} = useContext(chatContext)
  

  useEffect(() => {
   socket.onmessage = async(e)=>{
      const response = JSON.parse(e.data)
      if(response.message){
        console.log(response)
      }
  }

  }, [state]);


  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
