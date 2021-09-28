import React from "react";
import "./css/ChatFooter.css";
import { connect } from "react-redux";

function ChatFooter() {
  return (
    <div className="chat_footer">
      <div className="input_box">
        <input
          className="text_box"
          placeholder="Type a message"
          autoFocus
        ></input>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatFooter);
