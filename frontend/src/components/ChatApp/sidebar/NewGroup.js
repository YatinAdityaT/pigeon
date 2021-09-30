import React from "react";
import "./css/NewGroup.css";
import { connect } from "react-redux";
import { toggle_add_group_modal } from "../../../redux";

function NewGroup({ toggleModal }) {
  return (
    <div onClick={toggleModal} className="new_group">
      <i className="fas fa-users"></i>
      <div className="new_group__text">Add a new group</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(toggle_add_group_modal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
