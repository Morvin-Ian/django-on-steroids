import { useContext } from "react"
import defaultProfile from "../../assets/images/default.webp"
import { chatContext } from "../../context/ChatContext"


const notification = {
  backgroundColor:"#22b8cfea",
  padding:"0px 5px",
  borderRadius:"20%",
  fontSize:"smaller",
  position:"absolute",
  left:"24%",
  marginBottom:"30%"
}

const Chats = ({chats}) => {

  const {dispatch} = useContext(chatContext)
  const userId = localStorage.getItem("uuid")

  const handleSelectedChat = (user) => {
    dispatch({type:"CHANGE_USER", payload:user})
  }

  const truncateText = (text) => {
    console.log(chats)
      return text.length > 20 ? text.substring(0, 19) + "..." : text;
  }

  return (
    <div className='chat'>
        { chats.length  ?
          chats?.sort((a,b)=>new Date(b.date)-new Date(a.date)).map((chat=>
              <div style={{textDecoration:"none"}} key={chat.uuid} onClick={()=>handleSelectedChat(chat)} className="user-chat">
                <img src={chat.profile ? `http://127.0.0.1:8000${chat.profile}`: defaultProfile} alt="" />
                <div className="chat_info">
                    <span>{chat.chat}</span> <br />
                    <div style={{display:'flex'}}>
                      <small style={{color:"gray"}}>{chat.last_message ? truncateText(chat.last_message): ""}</small>
                      <small style={notification}>{chat.unread_count !== 0 && chat.unread_count }</small>                  
                    </div>

                    {/* {action !== '' ?
                    
                    <p id="span2">{action}</p>:
                    
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