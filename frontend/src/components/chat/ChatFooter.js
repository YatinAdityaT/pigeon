import React from "react";
import "./ChatFooter.css";

function ChatFooter() {
  return (
    <div className="chat_footer">
      <div className="input_box">
        <input
          className="text_box"
          placeholder="Type a message"
          autoFocus
        ></input>
      </div>
    </div>
  );
}

export default ChatFooter;
