import React from 'react'
import image from "../assets/images/James.jpeg"
import kid from "../assets/images/kid.jpg"


const Message = () => {
  return (
    <div className='message owner'>
        <div className="messageInfo">
            <img src={image} alt=""  />
            <span>just now</span>
        </div>

        <div className="messageDetail">
            <p>Fuckinng Hell Negro</p>
            <img src={kid}  />

        </div>

    </div>
  )
}

export default Message