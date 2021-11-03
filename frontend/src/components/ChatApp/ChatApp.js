import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_chat_groups, get_messages } from "../../redux";
import Chat from "./chat/Chat";
import Sidebar from "./sidebar/Sidebar";
import ReconnectingWebSocket from "reconnecting-websocket";

function ChatApp({ getGroups, getMessages }) {
  useEffect(() => {
    /*
      Runs on mount of this component. 
      Creates a websocket instance and connects
      to the /chat/ endpoint.

      Receives two types of messages: 
        group_list = list of groups that the user is in
        messages = list of messages in the selected chat
    
    */
    const hostname = window.location.hostname;
    const port = window.location.port;
    const protocol = window.location.protocol == "http:" ? "ws://" : "wss://";
    const socket = new ReconnectingWebSocket(
      protocol + hostname + ":" + port + "/chat/"
    );

    socket.addEventListener("error", (event) => {
      console.log("ERROR!!");
      console.log(event);
    });

    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection established to /chat/ endpoint");
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      switch (message["type"]) {
        case "groups":
          return getGroups(JSON.parse(message["group_list"]));

        case "messages":
          return getMessages(message["message_list"]);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Websocket connection to /chat/ disconnected!");
      socket.close();
    });
  }, []);

  return (
    <>
      <Sidebar />
      <Chat />
    </>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (chat_group_object) => {
      dispatch(get_chat_groups(chat_group_object));
    },
    getMessages: (messages) => {
      dispatch(get_messages(messages));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
