import  { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';


const MessageInput = ({socket, receiver}) => {
 
  const senderId = localStorage.getItem('uuid')
  const textRef = useRef(null)
  const formRef = useRef(null)
  const {uuid}  = useParams()
  const redirect = useNavigate()

  const relationships = JSON.parse(localStorage.getItem("relationships"))
  
  
  relationships?.forEach(element => {
    if (element.uuid === uuid){
      receiver = element.chat_uuid
    } 
  });


  const EventCaptute = () => {
    formRef.current.addEventListener('submit', (e)=>{
      const data = 
      {
        "typing":null,
        "sender":senderId,
        "receiver":receiver,
        'message':textRef.current.value
      }
      if(textRef.current.value === ''){
         alert("Can't Send an Empty Message")
      }
      else{
        socket.send(JSON.stringify(data))
        textRef.current.value = "";
      }
    })

    textRef.current.addEventListener('keydown', ()=>{

      const data = 
      {
        "typing":"typing ...",
        "sender":senderId,
        "receiver":receiver,
        'message':null
      }

      socket.send(JSON.stringify(data))

       socket.onmessage = async(e)=>{
        const response = JSON.parse(e.data)
        console.log(response)
      }
      
    })  
  }
 

  useEffect(() => {
      EventCaptute()
  }, [])
  

  return (
    <form ref={formRef} className='input' onSubmit={(e)=>e.preventDefault()}>
      <input type="text" placeholder='Type Something ...' id='text' ref={textRef} />
       
       <div className="send">
          <input 
                style={{display:"none"}}  
                type="file" 
                id='media' 
                accept='image/*, video/*'
          />
          <label htmlFor="media"><ImageIcon/></label>
           
          <input 
                style={{display:"none"}} 
                type="file" 
                accept="application/msword,
                application/vnd.ms-excel, application/vnd.ms-powerpoint,
                text/plain, application/pdf"
                id='doc'
          />
          <label htmlFor="doc"><AttachFileIcon/></label>

          <button>
            Send
          </button>

       </div>
       
    </form>
  )
}

export default MessageInput