import { useContext, useEffect, useRef } from "react";
import avatar from "../../assets/images/default.webp";
import { chatContext } from "../../context/ChatContext";
import { DoneAll } from "@mui/icons-material";

const Message = ({ message }) => {
  const user = localStorage.getItem("uuid");
  const { state } = useContext(chatContext);
  const isOwner = message.message_sender_uuid === user;
  const isPatner = message.dialog === state.user.uuid;
  let profile = localStorage.getItem("profile");
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      id="chat-body"
      ref={ref}
      className={`${isOwner ? "message owner" : "message"}`}
    >
      {isPatner && (
          <div className="messageDetail">
            <p>{message.text_message} {isOwner  && <DoneAll/>} </p>
            {message.file &&
              <img src={`http://127.0.0.1:8000${message.file}`}  />
            }
          </div>
      )}
    </div>
  );
};

export default Message;
