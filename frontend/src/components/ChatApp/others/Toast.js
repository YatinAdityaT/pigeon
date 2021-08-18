import React from "react";
import { connect } from "react-redux";
import { addToast, deleteToast } from "../../../redux/toast/actions";
import check from "./assets/check.svg";
import error from "./assets/error.svg";
import "./assets/Toast.css";

const Toast = ({ toasts, deleteToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) =>
        toast !== null || toast !== undefined ? (
          <div
            key={toast.id}
            className="toast"
            style={{
              backgroundColor:
                toast.toastType == "success" ? "#5cb85c" : "#d9534f",
            }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className="toast-sub-container">
              <div className="toast-image">
                <img
                  src={toast.toastType == "success" ? check : error}
                  alt=""
                />
              </div>
              <p className="toast-message">{toast.description}</p>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    toasts: state.toast.toasts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteToast: (id) => dispatch(deleteToast(id)),
    addToast: (description, toastType) =>
      dispatch(addToast(description, toastType)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Toast);
