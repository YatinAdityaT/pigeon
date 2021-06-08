import React from "react";
import Header from "./Header";
import "./Sidebar.css";
import "./Header.css";

function Sidebar() {
  const logout = () => {
    console.log("Logout");
  };
  const rename = () => {
    console.log("Rename");
  };
  const changeImage = () => {
    console.log("Change Image");
  };

  const menuitems = [
    ["Logout", logout],
    ["Rename", rename],
    ["Change Image", changeImage],
  ];

  return (
    <div className="sidebar">
      <Header menuitems={menuitems} />
      <div className="sidebar__body">
        <div className="body__search">
          <input type="text" placeholder="Search chat" />
        </div>
        <div className="body__chats"></div>
      </div>
    </div>
  );
}

export default Sidebar;
