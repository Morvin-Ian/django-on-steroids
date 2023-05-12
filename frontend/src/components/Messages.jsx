import React from 'react'
import Message from './Message'

const Messages = ({messages}) => {
  return (
    <div className='messages'>

        {Array.from(messages).map((message)=>
          <Message key={Math.random()} message={message}/>
        )}
        

    </div>
  )
}

export default Messages