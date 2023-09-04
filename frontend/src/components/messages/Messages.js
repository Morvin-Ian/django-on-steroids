import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import { useEffect, useState } from "react";

const Messages = ({setMessages, socket,  messages }) => {

  const sender_uuid = localStorage.getItem('uuid');
  const { uuid } = useParams();
  const redirect = useNavigate()

  const relationships = JSON.parse(localStorage.getItem("relationships"));
  let receiver_uuid;

  if (relationships?.detail === "Invalid token" || relationships?.detail === "Expired token") {
    redirect("/sign-in");
  } else {
    relationships?.forEach((element) => {
      if (element.uuid === uuid) {
        receiver_uuid = element.chat_uuid;
      }
    });
  }



  useEffect(() => {

    socket.onmessage = async (e) => {
      const response = JSON.parse(e.data);

      if (response.message !== null) {
        const newMessage = {
          id:Math.floor(Math.random() * 1000),
          message_sender_uuid: sender_uuid,
          message_receiver_uuid: receiver_uuid,
          text_message: response.message
        };

        setMessages([...messages, newMessage])
        console.log([messages])
     
      }
    };
  }, [messages]);


  return (
    <div className="messages">
      {messages.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
          onmessage={onmessage} 
        />
      ))}
    </div>
  );
};

export default Messages;
