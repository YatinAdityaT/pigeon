import React from "react";
import "./css/UserCard.css";
import user_image from "../../../assets/user_image.png";
import DropdownMenu from "../DropdownMenu";

function UserCard() {
  const dropDownMenuContents = { "Log Out": () => {} };
  return (
    <div className="user_card">
      <img className="user_card__user_image" alt="" src={user_image}></img>
      <div className="user_card__user_name maintain_size">Placeholder user</div>
      <DropdownMenu options={dropDownMenuContents} />
      <div className="user_card__options"></div>
    </div>
  );
}
export default UserCard;
