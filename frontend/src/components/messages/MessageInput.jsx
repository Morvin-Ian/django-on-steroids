import { useContext, useEffect, useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import { chatContext } from "../../context/ChatContext";

const MessageInput = ({ socket }) => {
  const senderId = localStorage.getItem("uuid");
  const textRef = useRef(null);
  const formRef = useRef(null);

  const {state} = useContext(chatContext)

  const handleTyping = (e) => {
    e.preventDefault();

    const data = {
      typing: true,
      sender: senderId,
      receiver: state.user.chat_uuid,
      room: state.user.uuid,
      status: "online",
      message: null,
    };

    socket.send(JSON.stringify(data));

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      typing: null,
      sender: senderId,
      receiver: state.user.chat_uuid,
      room: state.user.uuid,
      message: textRef.current.value,
    };

    socket.send(JSON.stringify(data));
    textRef.current.value = "";

  }



  return (
    <form ref={formRef} className="input" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Type Something ..."
        id="text"
        ref={textRef}
        onKeyUp={handleTyping}
      />

      <div className="send">
        <input
          style={{ display: "none" }}
          type="file"
          id="media"
          accept="image/*, video/*"
        />
        <label htmlFor="media">
          <ImageIcon />
        </label>

        <input
          style={{ display: "none" }}
          type="file"
          accept="application/msword,
                application/vnd.ms-excel, application/vnd.ms-powerpoint,
                text/plain, application/pdf"
          id="doc"
        />
        <label htmlFor="doc">
          <AttachFileIcon />
        </label>

        <button onClick={handleSubmit}>Send</button>
      </div>
    </form>
  );
};

export default MessageInput;
