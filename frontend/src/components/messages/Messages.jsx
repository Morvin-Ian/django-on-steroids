import Message from "./Message";
import { useContext, useEffect } from "react";
import { fetchMessages, updateMessageRead } from "../../api/messages";
import { fetchRelationships } from "../../api/relationships";
import { chatContext } from "../../context/ChatContext";

const Messages = ({ setMessages, socket, messages, setChats }) => {
  const access_token = localStorage.getItem("access_token");
  const {state} = useContext(chatContext)


  const updateChatsAndMessages = async () => {
    const relationships = await fetchRelationships(access_token);
    setChats(relationships);

    if (state.roomId) {
      updateMessageRead(access_token, state.roomId);
      const data = await fetchMessages(access_token);
      setMessages(data);
    }
  };

  useEffect(() => {
    updateChatsAndMessages();
  }, [state]);

  useEffect(() => {
    socket.onmessage = async (e) => {
      const response = JSON.parse(e.data);
      if (response.message) {
        updateChatsAndMessages();
      }
    };
  }, []);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
