import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const addBtnStyle ={
  backgroundColor:"aqua",
  position: "absolute",
  left: "10%",
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
            <span id='span'>Oluoch Ian</span>
            <div className="icons">
                <button onClick={logoutUser}>Logout</button>

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
            <Fab style={addBtnStyle} aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      }
    </div>
  )
}

export default Chat