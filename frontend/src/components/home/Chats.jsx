import { useContext } from "react"
import defaultProfile from "../../assets/images/default.webp"
import { chatContext } from "../../context/ChatContext"


const Chats = ({chats}) => {

  const {dispatch} = useContext(chatContext)

  const handleSelectedChat = (user) => {
    dispatch({type:"CHANGE_USER", payload:user})
  }

  return (
    <div className='chat'>
        { chats.length  ?
          chats?.sort((a,b)=>new Date(b.date)-new Date(a.date)).map((chat=>
              <div style={{textDecoration:"none"}} key={chat.uuid} onClick={()=>handleSelectedChat(chat)} className="user-chat">
                <img src={chat.profile ? `http://127.0.0.1:8000${chat.profile}`: defaultProfile} alt="" />
                <div className="chat_info">
                    <span>{chat.chat}</span> <br />
                    <small style={{color:"gray"}}>{chat.last_message}</small>
                    {/* {action !== '' ?
                    
                    <p id="span2">{action}</p>:
                    <p id="span2">last_message</p>
                    
                    } */}
                    
                </div>
              </div>
          ))
          :
           <div className="user-chat">
                <div className="chats-info">
                    <p style={{color:"white"}}> Make Some Friends </p>
                </div>
          </div>
        }
    </div>
  )
}

export default Chats