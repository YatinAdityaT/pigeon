import React, { useEffect } from "react";
import "./css/Sidebar.css";
import GroupCard from "./GroupCard";
import UserCard from "./UserCard";
import NewGroup from "./NewGroup";
import { connect } from "react-redux";
import { get_chat_groups } from "../../../redux";

function Sidebar({ groups }) {
  return (
    <div className="sidebar">
      <UserCard />
      <NewGroup />
      {groups.map((element) => {
        return (
          <GroupCard group_id={element[1][0]} group_name={element[1][1]} />
        );
      })}
      <div className="sidebar__group_cards"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    groups: state.chatGroup.chatGroups,
  };
};

const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
