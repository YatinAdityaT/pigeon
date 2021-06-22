import React from "react";
import "./ChatBody.css";
import ChatMessage from "./ChatMessage";

function ChatBody() {
  return (
    <div className="chat_body">
      <ChatMessage chatType="incoming" />
      <ChatMessage chatType="outgoing" />
      <ChatMessage chatType="outgoing" />
      <ChatMessage chatType="incoming" />
      <ChatMessage chatType="outgoing" />
    </div>
  );
}

export default ChatBody;
