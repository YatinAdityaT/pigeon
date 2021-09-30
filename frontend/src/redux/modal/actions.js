import * as actions from "./actionTypes";

export const toggle_add_group_modal = () => (dispatch) => {
  dispatch({
    type: actions.TOGGLE_ADD_GROUP_MODAL,
  });
};

export const toggle_add_participant_modal = () => (dispatch) => {
  dispatch({
    type: actions.TOGGLE_ADD_PARTICIPANT_MODAL,
  });
};
