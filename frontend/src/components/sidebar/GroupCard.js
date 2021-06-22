import React from "react";
import "./GroupCard.css";
import group_image from "../../assets/group_image.png";

function GroupCard() {
  return (
    <div className="group_card">
      <img className="group_card__group_image" alt="" src={group_image}></img>
      <div className="group_card__container">
        <div className="group_card__upper_container">
          <div className="group_card__group_name">Dance group</div>
          <div className="group_card__time_stamp">12:30 pm</div>
        </div>
        <div className="group_card__lower_container">
          <div className="group_card__last_message_author">David</div>
          <div className="colon">:</div>
          <div className="group_card__last_message">Hi how are you?</div>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
