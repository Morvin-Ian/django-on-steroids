import React from "react";
import Navbar from "../common/Navbar";
import Search from "./Search";
import Chats from "./Chats";

const SideBar = ({ chats}) => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats chats={chats}/>
    </div>
  );
};

export default SideBar;
