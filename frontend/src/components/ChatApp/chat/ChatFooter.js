import React from "react";
import "./css/ChatFooter.css";
import { connect } from "react-redux";

function ChatFooter({ sockets, activeGroup, userEmail }) {
  const chat_id = Object.keys(activeGroup)[0];
  const socket = sockets[chat_id];
  console.assert(socket != undefined, {
    errorMsg: "it is undefined!",
    socket: socket,
  });

  const submitMessage = (event) => {
    event.preventDefault();
    const text_box = document.getElementsByClassName("text_box")[0];
    const text = text_box.value;
    const json = {
      text: text,
      owner_email: userEmail,
    };
    socket.send(JSON.stringify(json));
    text_box.value = ""; // clear the text box
  };

  return (
    <form onSubmit={submitMessage} className="chat_footer">
      <div className="input_box">
        <input
          className="text_box"
          placeholder="Type a message"
          autoFocus
          type="text"
        ></input>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    activeGroup: state.chatGroup.activeGroup,
    sockets: state.chatGroup.sockets,
    userEmail: state.login.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);
