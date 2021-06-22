import React from "react";
import "./Chat.css";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

function Chat() {
  return (
    <div className="chat">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default Chat;
