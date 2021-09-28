import React from "react";
import "./css/Sidebar.css";
import GroupCard from "./GroupCard";
import UserCard from "./UserCard";
import NewGroup from "./NewGroup";
import { connect } from "react-redux";

function Sidebar({ group_list }) {
  return (
    <div className="sidebar">
      <UserCard />
      <NewGroup />
      {group_list?.map((element) => {
        const key = Object.keys(element)[0];
        const group_name = element[key]["chat_room_name"];
        return <GroupCard group_id={key} group_name={group_name} />;
      })}
      <div className="sidebar__group_cards"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    group_list: state.chatGroup.group_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
