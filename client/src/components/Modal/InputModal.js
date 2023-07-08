import React, { useEffect, useState, useRef } from "react";

// CSS
import "../Modal/Modal.css";

// ICONS
import warningIcon from "../../Assests/exclamation-circle.svg";

function InputModal(props) {
  const descRef = useRef();

  const [isValidTitle, setValidTitle] = useState({
    status: null,
    msg: "",
  });
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(isValidTitle);
  }, [isValidTitle]);

  function validateTitle(titleVal) {
    // console.log("trimmed title",titleVal, titleVal.length);

    const isValidLength = titleVal.length !== 0;
    const isNotANum = isNaN(titleVal);

    const err = !isValidLength
      ? "title cannot be empty"
      : !isNotANum
      ? "title cannot be just a number"
      : "";

    setValidTitle({
      status: isValidLength && isNotANum,
      msg: err,
    });
  }

  function getEntityData() {
    if (isValidTitle.status) {
      const desc = descRef.current.value.trim();
      console.log("create new folder ");
      props.onCreateNewFolder({ title: title, desc: desc });
      props.onCloseModal();
    }
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
          <div className="heading">{props.entityName} details</div>
          <div className="btn-container">
            <button
              className={`btn ${isValidTitle.status ? "cta" : "disable"}`}
              onClick={getEntityData}
            >
              Done
            </button>
          </div>
        </div>
        <div className="input">
          <div className="title-field">
            <label className="item-label">title</label>
            <input
              className="title"
              entityName="text"
              autoCorrect="off"
              autoFocus="true"
              required="true"
              value={title}
              placeholder={`New ${props.entityName} title goes here..`}
              onChange={(e) => {
                setTitle(e.target.value);
                /*
                 *passing value to validateTitle() directly to make the validations faster
                 *to not wait until title state changes
                 */
                validateTitle(e.target.value.trim());
              }}
            />
            {isValidTitle.status !== null && !isValidTitle.status && (
              <div className="msg">
                <img src={warningIcon} />
                <p>{isValidTitle.msg}</p>
              </div>
            )}
          </div>

          <div className="desc-field">
            <label className="item-label">description</label>
            <textarea
              ref={descRef}
              className="desc"
              entityName="text"
              autoCorrect="off"
              placeholder={`(optional) tell us more ${
                isNaN(title.trim()) ? `about ${title.trim()}...` : "..."
              } `}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputModal;
