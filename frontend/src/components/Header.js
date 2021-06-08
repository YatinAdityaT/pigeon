import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";

function Header(props) {
  const [seed, setSeed] = useState();
  const [anchorEl, setanchorEl] = useState(null);

  const handleClick = (event) => {
    setanchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setanchorEl(null);
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="header">
      <IconButton>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      </IconButton>
      <div className="header__username">Filler text</div>
      <Tooltip title="More options">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        onClose={handleClose}
        id="header__menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {props.menuitems.map((element, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              element[1]();
              handleClose();
            }}
          >
            {element[0]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Header;
