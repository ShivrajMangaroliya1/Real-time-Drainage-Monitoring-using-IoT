import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  console.log(props)
  return ReactDOM.createPortal(
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#332e2e7e",
        position: "fixed",
        top: "0%",
        left: "0%",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
      onClick={() => props.afterSuccess()}
    >
      <div
        className="card"
        style={{ width: "50rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">{props.currentUser.username}</h5>
          <p className="card-text">none</p>
        </div>
        <div className="card-footer" style={{ textAlign: "end" }}>
          <button className="btn btn-danger" onClick={() => props.deleteMain()}>
            signout
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#signout")
  );
};

export default Modal;
