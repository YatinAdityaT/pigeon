import React from "react";
import "./css/UserCard.css";
import user_image from "../../../assets/user_image.png";
// import DropdownMenu from "../others/DropdownMenu";
import { connect } from "react-redux";
import { logout } from "../../../redux/";

function UserCard({ logOutUser, username }) {
  // const dropDownMenuContents = { "Log Out": logOutUser };
  return (
    <div className="user_card">
      <img className="user_card__user_image" alt="" src={user_image}></img>
      <div className="user_card__user_name maintain_size">{username}</div>
      {/* <DropdownMenu options={dropDownMenuContents} /> */}
      {/* <div className="user_card__options"></div> */}
      <i onClick={logOutUser} class="fas fa-sign-out-alt"></i>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
