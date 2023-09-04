import defaultProfile from "../../assets/images/default.webp"
import {Link} from "react-router-dom"


const Chats = ({chats}) => {

  return (
    <div className='chat'>
        { chats.length  ?
          chats.map((chat=>
              <Link style={{textDecoration:"none"}} key={chat.uuid} to={`/chat/${chat.uuid}`} className="user-chat">
                <img src={chat.profile ? `http://127.0.0.1:8000${chat.profile}`: defaultProfile} alt="" />
                <div className="chat_info">
                    <span>{chat.chat}</span> <br />
                    <small>last seen: 1300 hrs</small>
                    {/* {action !== '' ?
                    
                    <p id="span2">{action}</p>:
                    <p id="span2">last_message</p>
                    
                    } */}
                    
                </div>
              </Link>
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