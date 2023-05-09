import React from 'react'
import Message from './Message'

const Messages = ({messages}) => {
  return (
    <div className='messages'>

        {Array.from(messages).map((message)=>
          <Message key={message.message_receiver_uuid} message={message}/>
        )}
        

    </div>
  )
}

export default Messages