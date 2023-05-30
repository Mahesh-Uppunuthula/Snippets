import "../Modal/Modal.css";

import React, { useEffect, useState } from "react";
import warningIcon from "../../Assests/exclamation-circle.svg";

function Modal(props) {
  const [isValidName, setValidName] = useState(false);

  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  function handleOnChange(event) {
    const isEnteredNameValid = event.target.value.trim().length !== 0;
    console.log("isEnteredNameValid", isEnteredNameValid);
    setValidName(isEnteredNameValid);
    props.onTextChange(event.target.value);
  }

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
        {!isValidName && (
          <div className="msg">
            <img src={warningIcon} />
            <p>{props.errMsg}</p>
          </div>
        )}
        <div className="input">
          <div className="text-field">
            <input
              type="text"
              autoCorrect="false"
              autoFocus="true"
              // value={props.fileName}
              onChange={(event) => {
                handleOnChange(event);
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
