import Messages from "../messages/Messages";
import MessageInput from "../messages/MessageInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { chatContext } from "../../context/ChatContext";

const addBtnStyle = {
  backgroundColor: "aqua",
  position: "absolute",
  left: "24%",
  top: "90%",
  transform: "translate(-50%, -50%)",
};

const homeDivStyle = {
  height: "100%",
  justifyContent: "center",
  borderLeft: "1px solid black",
};

const Chat = ({ setMessages, messages, socket, setReceiver, receiver }) => {
  const redirect = useNavigate();

  const {state} = useContext(chatContext)

  const logoutUser = (e) => {
    e.preventDefault();
    if (localStorage.getItem("access_token")) {
      localStorage.clear();
      redirect("/sign-in");
    }
  };

  return (
    <div className="chat">
      {state.roomId ? (
        <>
          <div className="chat-info">
            <span id="span">{state.user.chat}</span>
            <div className="icons">
              <Button
                style={{
                  backgroundColor: "#22b8cfea",
                  color: "#010e1f",
                  marginLeft: "850px",
                }}
                onClick={(e)=>logoutUser(e)}
              >
                <LogoutIcon /> Logout
              </Button>
            </div>

            <Link to="/new-conversations">
              <Fab size="medium" style={addBtnStyle} aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          </div>

          <Messages
            setMessages={setMessages}
            messages={messages}
            socket={socket}       

          />
          <MessageInput
            socket={socket}
          />
        </>
      ) : (
        <div style={homeDivStyle} className="chat-info">
          <h1>Converse with Friends & Families</h1>
          <Link to="/new-conversations">
            <Fab size="medium" style={addBtnStyle} aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Chat;
