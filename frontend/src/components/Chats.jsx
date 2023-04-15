import React from 'react'
import mid from "../assets/images/hope.jpg"
import james from "../assets/images/James.jpeg"
import kid from "../assets/images/kid.jpg"


const Chats = () => {
  return (
    <div className='chats'>
        <div className="user-chat">
            <img src={mid} alt="" />
            <div className="chat-info">
                <span>Oluoch</span>
                <p>Good Morning Bro</p>
            </div>
        </div>

        <div className="user-chat">
            <img src={kid} alt="" />
            <div className="chat-info">
                <span>Cyprian</span>
                <p>Good Morning Bro</p>
            </div>
        </div>

        <div className="user-chat">
            <img src={james} alt="" />
            <div className="chat-info">
                <span>Nderitu</span>
                <p>Good Morning Bro</p>
            </div>
        </div>
        
    </div>
  )
}

export default Chats