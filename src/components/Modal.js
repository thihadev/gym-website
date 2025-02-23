import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content ">
        <button className="close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
