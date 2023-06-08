import { useRef } from "react"
import mid from "../assets/images/hope.jpg"
import {Link} from "react-router-dom"


const Chats = ({chats, setReceiver}) => {
  const ref = useRef(null)
  console.log()

  const setReceiverId = () =>{
    setReceiver(ref.current.value)
  }

  return (
    <div className='chats'>
        { chats.length > 0 ?
          Array.from(chats).map((chat=>
              <Link onClick={setReceiverId} style={{textDecoration:"none"}} key={chat.uuid} to={`/chat/${chat.uuid}`} className="user-chat">
                <img src={mid} alt="" />
                <div className="chat-info">
                    <span>{chat.chat}</span>
                    <input ref={ref} type="hidden" name="receiver" value={chat.chat_uuid} />
                    {/* {action !== '' ?
                    
                    <p id="span2">{action}</p>:
                    <p id="span2">last_message</p>
                    
                    } */}
                    
                </div>
              </Link>
          ))
          :
           <div className="user-chat">
                <div className="chat-info">
                    <p> No available chats</p>
                </div>
          </div>
        }
    </div>
  )
}

export default Chats