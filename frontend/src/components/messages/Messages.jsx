import Message from "./Message";
import { useEffect } from "react";
import { fetchMessages } from "../../api/messages";
import { fetchRelationships } from "../../api/relationships";

const Messages = ({ setMessages, socket, messages, setChats }) => {
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    socket.onmessage = async (e) => {
      const response = JSON.parse(e.data);
      if (response.message) {
        const data = await fetchMessages(access_token);
        setMessages(data);

        const relationships = await fetchRelationships(access_token);
        setChats(relationships);
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
