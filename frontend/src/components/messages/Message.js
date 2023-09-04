import React, { useEffect, useRef } from "react";
import avatar from "../../assets/images/default.webp";
import { useParams } from "react-router-dom";

const Message = ({ message }) => {
  const { uuid } = useParams();
  const user = localStorage.getItem("uuid");
  const isReceiver = message.message_receiver_uuid === user;
  const isPatner = message.dialog === uuid;
  let profile = localStorage.getItem("profile");
  let patnerProfile = null;
  const relationships = JSON.parse(localStorage.getItem("relationships"));

  relationships?.forEach((element) => {
    if (element.uuid === uuid) {
      patnerProfile = element.profile;
      if (patnerProfile == null) {
        patnerProfile = avatar;
      }
    }
  });


  return (
    <div
      id="chat-body"
      className={`${isReceiver ? "message" : "message owner"}`}
    >
      {isPatner && (
        <>
          <div className="messageInfo">
            {/* {patnerProfile === avatar ?
                <img src={isReceiver ?  patnerProfile: profile } alt="profile"  />:
                <img src={isReceiver ?  `http://127.0.0.1:8000${patnerProfile}`: profile } alt="profile"  />
            } */}
            <span>just now</span>
          </div>

          <div className="messageDetail">
            <p>{message.text_message}</p>
            {/* <img src={kid}  /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
