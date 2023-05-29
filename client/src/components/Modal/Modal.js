import "../Modal/Modal.css";

import React, { useEffect } from "react";

function Modal(props) {
  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  return (
    <>
      <div
        className="bg-container"
        onClick={() => {
          props.onCloseModal();
        }}
      ></div>
      <div className="modal-container">
        <div className="heading">{props.heading}</div>
        <div className="input">
          <div className="text-field">
            <input
              type="text"
              autoCorrect="false"
              autoFocus="true"
              // value={props.fileName}
              onChange={(event) => {
                props.onTextChange(event.target.value)
              }}
            />
          </div>
          <div className="btn-container">
            <button
              className="border-btn btn"
              onClick={() => {
                props.onCloseModal();
              }}
            >
              cancel
            </button>
            <button
              className="btn cta"
              onClick={() => {
                props.onSaveFolder();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
