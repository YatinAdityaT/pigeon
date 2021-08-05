import React from "react";
import "./css/Sidebar.css";
import GroupCard from "./GroupCard";
import UserCard from "./UserCard";
import NewGroup from "./NewGroup";

function Sidebar() {
  return (
    <div className="sidebar">
      <UserCard />
      <NewGroup />
      <div className="sidebar__group_cards">
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </div>
  );
}

export default Sidebar;
