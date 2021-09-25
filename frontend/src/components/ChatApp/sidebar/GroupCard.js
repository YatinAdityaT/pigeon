import React from "react";
import "./css/GroupCard.css";
import group_image from "../../../assets/group_image.png";
import { clicked_on_group } from "../../../redux";
import { connect } from "react-redux";

function GroupCard(props) {
  const onClick = () => {
    // props.chat_room.id is the current room's id
    // store this group in the state as the active group
    return props.groupClicked(props.chat_room.id);
  };

  return (
    <div className="group_card" onClick={onClick}>
      <img className="group_card__group_image" alt="" src={group_image}></img>
      <div className="group_card__container">
        <div className="group_card__upper_container">
          <div className="group_card__group_name">
            {props.chat_room.group_name}
          </div>
          {/* <div className="group_card__time_stamp">12:30 pm</div> */}
        </div>
        {/* <div className="group_card__lower_container">
          <div className="group_card__last_message_author">David</div>
          <div className="colon">:</div>
          <div className="group_card__last_message">Hi how are you?</div>
        </div> */}
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    groupClicked: (groupId) => {
      dispatch(clicked_on_group(groupId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);
