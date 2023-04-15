import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

const Chat = () => {
  return (
    <div className='chat'>
        <div className="chat-info">
            <span>Oluoch</span>
            <div className="icons">
                <button>Logout</button>

            </div>
        </div>
        <Messages/>
        <MessageInput/>
    </div>
  )
}

export default Chat