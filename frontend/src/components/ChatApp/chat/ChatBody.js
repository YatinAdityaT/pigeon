import React, { useEffect } from "react";
import "./css/ChatBody.css";
import ChatMessage from "./ChatMessage";
import { connect } from "react-redux";
import { get_messages, add_message } from "../../../redux";

function ChatBody({ addMessage, userEmail, message_list, activeGroup }) {
  const group_id = Object.keys(activeGroup)[0];

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/chat/" + group_id + "/");

    socket.addEventListener("open", (event) => {
      console.log("Connected to chat!");
    });

    socket.addEventListener("message", (event) => {
      // add the message to the state
      try {
        const message = JSON.parse(event.data);
        if (message["type"] == "single_message") {
          console.log("ADD MESSAGE!");
          addMessage(message["data"], Object.keys(activeGroup));
        }
      } catch (e) {
        console.log(e, e.trace);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Disconnected to the chat!");
      socket.close();
    });

    console.log("message_list", message_list);
  }, [activeGroup]);

  return (
    <div className="chat_body">
      {Object.keys(message_list).length == 0
        ? ""
        : message_list[group_id]?.map((x) => (
            <ChatMessage
              chatType={x.owner_email == userEmail ? "outgoing" : "incoming"}
              text={x.text}
            />
          ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    message_list: state.chatGroup.message_list,
    activeGroup: state.chatGroup.activeGroup,
    userEmail: state.login.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (messages) => {
      dispatch(get_messages(messages));
    },
    addMessage: (message, chat_id) => {
      dispatch(add_message(message, chat_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
