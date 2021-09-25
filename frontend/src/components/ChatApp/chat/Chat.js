import React, { useEffect } from "react";
import "./css/Chat.css";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { connect } from "react-redux";

function Chat({ activeGroup }) {
  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:8000/chat/");
    // socket.onmessage = (event) => {
    //   console.log(event);
    // };
    // socket.send("test");
  }, []);
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
  return {
    // getGroups: () => {
    // dispatch(get_chat_groups());
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
