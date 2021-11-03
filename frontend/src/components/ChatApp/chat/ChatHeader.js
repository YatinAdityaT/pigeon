import React from "react";
import "./css/ChatHeader.css";
import { connect } from "react-redux";
import group_image from "../../../assets/group_image.png";
import { toggle_add_participant_modal } from "../../../redux";

function ChatHeader({ activeGroup, toggleModal }) {
  const key = Object.keys(activeGroup)[0];
  return (
    <>
      <div className="header_card">
        <img className="header_image" alt="" src={group_image}></img>
        <div className="header_name maintain_size">
          {activeGroup[key]["chat_room_name"]}
        </div>

        <div className="options">
          <i onClick={toggleModal} class="fas fa-user-plus tooltip">
            <div className="tooltip_text_inside">Add participants</div>
          </i>
          {/* <i className="fas fa-phone-alt"></i> */}
          {/* <i className="fas fa-video"></i> */}
          {/* <i className="fas fa-ellipsis-v"></i> */}
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
    toggleModal: () => dispatch(toggle_add_participant_modal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
