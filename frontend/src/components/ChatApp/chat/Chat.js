import React from "react";
import "./css/Chat.css";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { connect } from "react-redux";

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
        ""
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
