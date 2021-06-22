import React from "react";
import "./ChatHeader.css";

import group_image from "../../assets/group_image.png";
function ChatHeader() {
  return (
    <>
      <div className="header_card">
        <img className="header_image" alt="" src={group_image}></img>
        <div className="header_name maintain_size">Placeholder group</div>

        <div className="options">
          <i className="fas fa-phone-alt"></i>
          <i className="fas fa-video"></i>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
