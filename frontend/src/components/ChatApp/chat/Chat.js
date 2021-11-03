import React from "react";
import "./css/Chat.css";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { connect } from "react-redux";
import logo from "../../../assets/logo.png";

function Chat({ activeGroup }) {
  return (
    <div className="chat">
      {activeGroup ? (
        <>
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </>
      ) : (
        <>
          <div className="chat_empty">
            <img className="logo_image_chat_body" alt="" src={logo} />
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeGroup: state.chatGroup.activeGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
