import "./Chat.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import EmojiSelector from "./EmojiSelector";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { IconButton, Tooltip } from "@material-ui/core";

function Chat() {
  useEffect(() => {
    new WebSocket("ws://" + window.location.host + "/chat/");
  }, []);

  const [text, setText] = useState("");

  const clearChat = () => {
    console.log("Clear chat");
  };
  const deleteChat = () => {
    console.log("Delete chat");
  };

  const searchChat = () => {
    console.log("Search chat");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    var message = e.target.value;
    // new WebSocket("ws://127.168.1.1")
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const menuitems = [
    ["Clear chat", clearChat],
    ["Delete chat", deleteChat],
    ["Search", searchChat],
  ];

  return (
    <div className="chat">
      <Header className="chat__header" menuitems={menuitems} />
      {/* pass the other user's username */}
      <div className="chat__body"></div>
      <div className="chat__footer">
        <IconButton>
          <EmojiSelector />
        </IconButton>
        <form className="chat__footer__form" onSubmit={sendMessage}>
          <input
            type="text"
            className="chat__footer__text"
            placeholder="Type your message here"
            value={text}
            onChange={handleChange}
          />

          <Tooltip title="Send message">
            <IconButton>
              <SendIcon />
            </IconButton>
          </Tooltip>
        </form>
        <Tooltip title="Audio call">
          <IconButton>
            <MicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video call">
          <IconButton>
            <VideoCallIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Chat;
