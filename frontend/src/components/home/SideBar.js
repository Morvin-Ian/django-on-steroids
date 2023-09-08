import React from "react";
import Navbar from "../common/Navbar";
import Search from "./Search";
import Chats from "./Chats";

const SideBar = ({ chats, setReceiver, receiver }) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats chats={chats} setReceiver={setReceiver} receiver={receiver} />
    </div>
  );
};

export default SideBar;
