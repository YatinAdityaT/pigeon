import React from "react";
import "./UserCard.css";
import user_image from "../../assets/user_image.png";

function UserCard() {
  return (
    <div className="user_card">
      <img className="user_card__user_image" alt="" src={user_image}></img>
      <div className="user_card__user_name maintain_size">Placeholder user</div>

      <div className="user_card__options">
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
  );
}
export default UserCard;
