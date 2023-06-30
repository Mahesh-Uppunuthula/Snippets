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
    const enterdText = event.target.value.trim();
    const isValidLength = enterdText.length !== 0;
    const isNum = isNaN(enterdText);

    const isEnteredValidName = isValidLength && isNum;

    // console.log("isEntered valid name", isEnteredValidName);

    setValidName(isEnteredValidName);
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
        <div className="top-pane">
          <div className="heading">{props.type} details</div>
          <div className="btn-container">
            {/* <button
              className="cancel-btn btn"
              onClick={() => {
                props.onCloseModal();
              }}
            >
              cancel
            </button> */}
            <button
              style={{ backgroundColor: !isValidName && "#80808050" }}
              className="btn cta"
              onClick={() => {
                isValidName && props.onSave();
              }}
            >
              Done
            </button>
          </div>
        </div>
        <div className="input">
          <div className="text-field">
            <input
              className="title"
              type="text"
              autoCorrect="false"
              autoFocus="true"
              placeholder={`New ${props.type} title goes here..`}
              onChange={(event) => {
                handleOnChange(event);
              }}
            />
            {!isValidName && (
              <div className="msg">
                <img src={warningIcon} />
                <p>{`invalid ${props.type} name`}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lang-details">
          <label className="heading">language</label>
          <div className="lang-container">
            <div className={`LANG `} >HTML</div>
            <div className="LANG CSS">CSS</div>
            <div className="LANG TYPESCRIPT">TYPESCRIPT</div>
            <div className="LANG JAVASCRIPT">JAVASCRIPT</div>
            <div className="LANG JSON">JSON</div>
            <div className="LANG LESS">LESS</div>
            <div className="LANG SCSS">SCSS</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
