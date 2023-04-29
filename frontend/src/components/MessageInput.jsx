import React, { useEffect, useRef, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import { useParams } from 'react-router-dom';

const MessageInput = () => {
  const {uuid} = useParams();
  const senderId = localStorage.getItem('uuid')
  const socket = new WebSocket('ws://127.0.0.1:8000' + '/ws/chat/' + uuid +'/');

  const textRef = useRef(null)
  const formRef = useRef(null)
  
  const typing  = document.getElementById('span2')

  const socketConnection = (e)=>
  {
   if(uuid)
   {
  
     socket.onopen = async function(e)
     {
        formRef.current.addEventListener('submit', (e)=>{
          const data = 
          {
            "typing":null,
            "sender":senderId,
            "receiver":uuid,
            'message':textRef.current.value
          }

          textRef.current.value = "";
          if (data.message != "")
          {
            socket.send(JSON.stringify(data))
          }

          else
          {
            alert("Can't send an Empty Message")

          }

        })

        textRef.current.addEventListener('keydown', ()=>{
          const data = 
          {
            "typing":"typing ...",
            "sender":senderId,
            "receiver":uuid,
            'message':null
          }

          socket.send(JSON.stringify(data))
          
        })
     }

     socket.onmessage = async function(e)
     {            
         const data = JSON.parse(e.data);
         const action = data["typing"];
         const message = data["message"];
          if (action != null)
            typing.innerHTML = action


     }

     socket.onerror = async function(e)
     {
         console.log("Error" ,e)
     }

     socket.onclose = async function(e)
     {
         console.log("Close",e)
     }
 }
}

 useEffect(() => {
 socketConnection();  
 
 }, []);
 

  return (
    <form ref={formRef} className='input' onSubmit={(e)=>e.preventDefault()}>
      <input type="text" placeholder='Type Something ...' id='text' ref={textRef} />
       
       <div className="send">
           <input style={{display:"none"}}  type="file" id='media' accept='image/*, video/*' />
           <label htmlFor="media"><ImageIcon/></label>
           
           <input style={{display:"none"}} type="file" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
           text/plain, application/pdf" id='doc'/>
           <label htmlFor="doc"><AttachFileIcon/></label>

           <button>Send</button>

       </div>
       
    </form>
  )
}

export default MessageInput