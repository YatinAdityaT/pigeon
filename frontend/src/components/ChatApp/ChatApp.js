import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_chat_groups } from "../../redux";
import Chat from "./chat/Chat";
import Sidebar from "./sidebar/Sidebar";

function ChatApp({ getGroups }) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/chat/");

    socket.addEventListener("open", (event) => {
      console.log("Connected!");
    });

    socket.addEventListener("message", (event) => {
      getGroups(JSON.parse(event.data));
    });
    socket.addEventListener("close", (event) => {
      console.log("Disconnected!");
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
