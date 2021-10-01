import React, { useEffect } from "react";
import "./css/ChatBody.css";
import ChatMessage from "./ChatMessage";
import { connect } from "react-redux";
import { get_messages, add_message, add_socket } from "../../../redux";

function ChatBody({
  addSocket,
  addMessage,
  userEmail,
  message_list,
  activeGroup,
}) {
  const group_id = Object.keys(activeGroup)[0];

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/chat/" + group_id + "/");

    socket.addEventListener("open", (event) => {
      console.log("Websocket connection established to /chat/" + group_id);
      addSocket(group_id, socket);
    });

    socket.addEventListener("message", (event) => {
      // add the message to the state
      try {
        const message = JSON.parse(event.data);
        if (message["type"] == "single_message") {
          addMessage(message["data"], Object.keys(activeGroup));
        }
      } catch (e) {}
    });

    socket.addEventListener("close", (event) => {
      console.log(
        "Websocket connection to /chat/" + group_id + " disconnected!"
      );
      socket.close();
    });

    // clean up
    return () => {
      socket.close();
    };
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
    addSocket: (chat_id, socket) => {
      dispatch(add_socket(chat_id, socket));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
