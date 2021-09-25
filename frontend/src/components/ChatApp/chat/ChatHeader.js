import React from "react";
import "./css/ChatHeader.css";
import { connect } from "react-redux";
import group_image from "../../../assets/group_image.png";

function ChatHeader({ activeGroup }) {
  return (
    <>
      <div className="header_card">
        <img className="header_image" alt="" src={group_image}></img>
        <div className="header_name maintain_size">
          {activeGroup[0].chat_room.group_name}
        </div>

        <div className="options">
          <i className="fas fa-phone-alt"></i>
          <i className="fas fa-video"></i>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
