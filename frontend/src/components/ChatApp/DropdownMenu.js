import React, { useState, useRef } from "react";

function DropdownMenu(props) {
  const { options } = props;
  const dropdownMenu = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = (event) => {
    event.preventDefault();
    setMenuOpen(true);
    document.addEventListener("click", closeMenu);
  };

  const closeMenu = (event) => {
    if (!dropdownMenu.current.contains(event.target)) {
      setMenuOpen(false);
      document.removeEventListener("click", closeMenu);
    }
  };

  return (
    <div>
      <i className="fas fa-ellipsis-v" onClick={showMenu} ref={dropdownMenu}>
        {menuOpen
          ? Object.keys(options).map((option_name, index) => (
              <button onClick={options[index]}>{option_name}</button>
            ))
          : ""}
      </i>
    </div>
  );
}

export default DropdownMenu;
