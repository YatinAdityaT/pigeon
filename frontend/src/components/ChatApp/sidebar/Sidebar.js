import React from "react";
import "./css/Sidebar.css";
import GroupCard from "./GroupCard";
import UserCard from "./UserCard";
import NewGroup from "./NewGroup";
import { connect } from "react-redux";

function Sidebar() {
  return (
    <div className="sidebar">
      <UserCard />
      <NewGroup />
      <div className="sidebar__group_cards"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
