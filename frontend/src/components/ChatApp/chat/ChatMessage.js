import React from "react";
import "./css/ChatMessage.css";

function ChatMessage({ chatType, text }) {
  return (
    <div className={`chat_message ${chatType}`}>
      <div className={`message_box ${chatType}`}>{text}</div>
    </div>
  );
}

export default ChatMessage;
