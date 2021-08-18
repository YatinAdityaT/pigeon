import React from "react";
import "./css/UserCard.css";
import user_image from "../../../assets/user_image.png";
import DropdownMenu from "../others/DropdownMenu";
import { connect } from "react-redux";
import { logout } from "../../../redux/";

function UserCard({ logOutUser }) {
  const dropDownMenuContents = { "Log Out": logOutUser };
  return (
    <div className="user_card">
      <img className="user_card__user_image" alt="" src={user_image}></img>
      <div className="user_card__user_name maintain_size">Placeholder user</div>
      <DropdownMenu options={dropDownMenuContents} />
      <div className="user_card__options"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
