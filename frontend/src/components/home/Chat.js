import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

const addBtnStyle ={
  backgroundColor:"aqua",
  position: "absolute",
  left: "24%",
  top: "90%",
  transform: "translate(-50%, -50%)",
}

const homeDivStyle = {
  height:"100%",
  justifyContent:"center", 
  borderLeft:"1px solid black"
}

const Chat = ({messages, socket, receiver}) => {

  const redirect = useNavigate();
  const {uuid} = useParams(); 
  const relationships = JSON.parse(localStorage.getItem("relationships"))
  let relationship;

  relationships?.forEach(element => {
    if (element.uuid === uuid){
      relationship = element.chat
    } 
  });  
 
  
  const logoutUser = () =>{

    if(localStorage.getItem('access_token'))
    {
      localStorage.clear();
      redirect('/sign-in');
    }

  }
  
  return (
    <div className='chat'>
   
        {uuid ? 
        <>
        <div className="chat-info">
            <span id='span'>{relationship}</span>
            <div className="icons">
              <Button 
                  style={{backgroundColor:"#22b8cfea", color:"#010e1f"}}
                  variant="contained"
                  size="small"
                  onClick={logoutUser}
                  >
                    <LogoutIcon/> Logout
              </Button>
            </div>
        </div>
        <Messages messages = {messages}/>
        <MessageInput socket={socket} receiver={receiver}/>
        </>:
    
        <div 
            style={homeDivStyle} 
            className="chat-info">
          <h1>Converse with Friends & Families</h1>
          <Link to="/new-conversations">
            <Fab size="medium" style={addBtnStyle} aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      }
    </div>
  )
}

export default Chat