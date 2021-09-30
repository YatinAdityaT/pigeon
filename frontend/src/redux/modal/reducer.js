import * as actions from "./actionTypes";
import { modalState } from "./state";

const toggle_add_group_modal_ = (state, action) => {
  return {
    ...state,
    addGroup: !state.addGroup,
  };
};

const toggle_add_participant_modal_ = (state, action) => {
  return {
    ...state,
    addParticipant: !state.addParticipant,
  };
};

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case actions.TOGGLE_ADD_GROUP_MODAL:
      return toggle_add_group_modal_(state, action);

    case actions.TOGGLE_ADD_PARTICIPANT_MODAL:
      return toggle_add_participant_modal_(state, action);

    default:
      return state;
  }
};

export default modalReducer;
