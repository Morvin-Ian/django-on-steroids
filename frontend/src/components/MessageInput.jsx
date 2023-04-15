import React from 'react'
import image from "../assets/images/hope.jpg"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';

const MessageInput = () => {
  return (
    <div className='input'>
        <input type="text" placeholder='Type Something ...' id='text' />
       
        <div className="send">
            <input style={{display:"none"}}  type="file" id='media' accept='image/*, video/*' />
            <label htmlFor="media"><ImageIcon/></label>
            
            <input style={{display:"none"}} type="file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf" id='doc'/>
            <label htmlFor="doc"><AttachFileIcon/></label>

            <button>Send</button>

        </div>
    </div>
  )
}

export default MessageInput