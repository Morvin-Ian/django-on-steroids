import React from 'react'
import image from "../../assets/images/James.jpeg"
import kid from "../../assets/images/kid.jpg"
import { useParams } from 'react-router-dom';


const Message = ({message}) => {
  const {uuid} = useParams();
  const user = localStorage.getItem('uuid');
  const isReceiver = message.message_receiver_uuid === user
  const isPatner = message.dialog === uuid

  return (
    <div id='chat-body'  className={`${isReceiver ? 'message' : 'message owner'}`}>
      {isPatner &&
       <>
        <div className="messageInfo">
            <img src={image} alt=""  />
            <span>just now</span>
        </div>

        <div className="messageDetail">
            <p>{message.text_message}</p>
            {/* <img src={kid}  /> */}

        </div>
       </>
        }
    </div>
  )
}

export default Message