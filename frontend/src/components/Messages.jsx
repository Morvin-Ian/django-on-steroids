import React from 'react'
import Message from './Message'

const Messages = ({messages}) => {
  return (
    <div className='messages'>
        {console.log(messages)}
        <Message/>


    </div>
  )
}

export default Messages