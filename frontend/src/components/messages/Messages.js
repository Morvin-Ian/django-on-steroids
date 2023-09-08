import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import { useEffect, useState } from "react";

const Messages = ({setMessages, socket,  messages }) => {

  const sender_uuid = localStorage.getItem('uuid');
  const { uuid } = useParams();
  const [roomId, setRoomId] = useState(uuid);
  const redirect = useNavigate()

  const relationships = JSON.parse(localStorage.getItem("relationships"));
  let receiver;



  useEffect(() => {

    if (relationships?.detail === "Invalid token" || relationships?.detail === "Expired token") {
      redirect("/sign-in");
    } else {
      relationships?.forEach((element) => {
        if (element.uuid === uuid) {
          receiver = element.chat_uuid; 

        
          socket.onmessage = async (e) => {
            const response = JSON.parse(e.data);
            console.log(receiver, element.chat)

      
            if (response.message !== null) {
              const newMessage = {
                id:Math.floor(Math.random() * 1000),
                message_sender_uuid: sender_uuid,
                message_receiver_uuid: receiver,
                text_message: response.message
              };
      
              setMessages([...messages, newMessage])
              console.log(messages)     
            }
          };
        }
      });
    }
  }, [uuid])
  



  // const handleOnMessage = async () => {

  // }



  // useEffect(() => {
  //   socket.onmessage = async (e) => {
  //     const response = JSON.parse(e.data);

  //     if (response.message !== null) {
  //       const newMessage = {
  //         id:Math.floor(Math.random() * 1000),
  //         message_sender_uuid: sender_uuid,
  //         message_receiver_uuid: receiver,
  //         text_message: response.message
  //       };

  //       setMessages([...messages, newMessage])
  //       console.log(newMessage)     
  //     }
  //   };

  // }, []);


  return (
    <div className="messages">
      {messages.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
        />
      ))}
    </div>
  );
};

export default Messages;
