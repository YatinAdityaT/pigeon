import React, { useEffect } from "react";
import "./css/ChatBody.css";
import ChatMessage from "./ChatMessage";
import { connect } from "react-redux";
import { get_messages } from "../../../redux/groups/actions";

function ChatBody({ userEmail, messages, getMessages, activeGroup }) {
  useEffect(() => {
    getMessages(activeGroup[0].chat_room.id);
  }, [activeGroup]);

  return (
    <div className="chat_body">
      {messages.map((message) => {
        console.log(messages, userEmail, message.owner);
        return (
          <ChatMessage
            text={message.text}
            chatType={userEmail == message.owner ? "outgoing" : "incoming"}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.chatGroup.messages,
    activeGroup: state.chatGroup.activeGroup,
    userEmail: state.login.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (groupId) => {
      dispatch(get_messages(groupId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);
