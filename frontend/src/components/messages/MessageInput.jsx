import { useContext, useEffect, useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import { chatContext } from "../../context/ChatContext";

const MessageInput = ({ socket }) => {
  const senderId = localStorage.getItem("uuid");
  const textRef = useRef(null);
  const formRef = useRef(null);
  const { state } = useContext(chatContext);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

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
  };

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
    setPreview(null);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(reader.result)
    }
  };

  return (
    <form ref={formRef} className="input" onSubmit={(e) => handleSubmit(e)}>
      {preview && (
        <img
          className="preview"
          style={{
            position: "absolute",
            top: "25%",
            objectFit: "cover",
            border: "5px solid #22b8cfea",
            borderRadius: "10px",
          }}
          src={preview}
          width="950px"
          height="400px"
        />
      )}

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
          accept="image/*"
          onChange={(e) => handleImageFile(e)}
        />
        <label htmlFor="media">
          <ImageIcon />
        </label>

        <button onClick={handleSubmit}>Send</button>
      </div>
    </form>
  );
};

export default MessageInput;
