import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import fetch_ from "../../../fetch_";
import {
  toggle_add_group_modal,
  toggle_add_participant_modal,
} from "../../../redux";
import "./Modal.css";

const customStyle = {
  // custom style for the modal
  content: {
    top: "20%",
    left: "30%",
    right: "30%",
    bottom: "20%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
};

const addParticipants = (groupId, list) => {
  /* Takes a list of participants and creates an invitation
  for each one of them */
  const endpoint = "/api/invitation/create/" + groupId;

  for (let i = 0; i < list.length; i++) {
    fetch_(endpoint, {
      method: "POST",
      body: JSON.stringify({ participant_email: list[i] }),
    }).then((res) => console.log(res));
  }
};

const addGroup = (userEmail) => {
  var input_ = document.getElementById("input_add_chat_group");
  const chatName = input_.value;
  fetch_("/api/chats/create", {
    method: "POST",
    body: JSON.stringify({
      group_name: chatName,
      chat_owner: userEmail, // the creator will become the owner
    }),
  }).then((res) => console.log(res));
};

function Modal_({
  showModalAddGroup,
  showModalAddParticipant,
  userEmail,
  activeGroup,
  toggleModalAddGroup,
  toggleModalAddParticipant,
}) {
  const showModal = showModalAddParticipant || showModalAddGroup;
  if (showModal) {
    var [list, addList] = useState([]);
    var flag = null;

    if (showModalAddGroup) {
      flag = "group";
    } else if (showModalAddParticipant) {
      flag = "participant";
    }

    if (showModalAddParticipant) {
      var groupId = Object.keys(activeGroup)[0];
    }

    var onClickPlus = () => {
      var input_ = document.getElementById("input_add_participant");
      addList([...list, input_.value]); // append the email id
      input_.value = ""; // clear the input box
    };

    var onClickOk = () => {
      flag == "participant"
        ? addParticipants(groupId, list)
        : addGroup(userEmail);
      closeModal();
    };

    var closeModal = () => {
      flag == "participant"
        ? toggleModalAddParticipant()
        : toggleModalAddGroup();
    };
  }
  return (
    <Modal
      // isOpen will decided if the modal will be shown or not
      isOpen={showModal}
      style={customStyle}
      onRequestClose={closeModal}
      appElement={document.getElementById("app")}
    >
      {/* If participant modal, then show it else show 
        the group modal instead*/}
      {flag == "participant" ? (
        <>
          <h1>Add participants</h1>
          <input id="input_add_participant" type="email"></input>
          <button onClick={onClickPlus} className="button add_button">
            +
          </button>
          <ul>
            {list.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>Add chat group</h2>
          <input id="input_add_chat_group"></input>
        </>
      )}
      <button onClick={onClickOk} className="button ok_button">
        Ok
      </button>
      <button onClick={closeModal} className="button cancel_button">
        Cancel
      </button>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.login.userEmail,
    activeGroup: state.chatGroup.activeGroup,
    showModalAddParticipant: state.modal.addParticipant,
    showModalAddGroup: state.modal.addGroup,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalAddGroup: () => {
      dispatch(toggle_add_group_modal());
    },
    toggleModalAddParticipant: () => {
      dispatch(toggle_add_participant_modal());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal_);
