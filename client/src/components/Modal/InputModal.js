import React, { useEffect, useState, useRef } from "react";

// CSS
import "../Modal/Modal.css";

// ICONS
import warningIcon from "../../Assests/exclamation-circle.svg";

function InputModal(props) {
  const titleRef = useRef();
  const descRef = useRef();

  const [isValidTitle, setValidTitle] = useState({
    status: null,
    msg: "",
  });


  useEffect(() => {
    console.log(isValidTitle);
  }, [isValidTitle]);


  function validateData() {
    console.log("validate");
    let title = titleRef.current.value;
    console.log("title", title);

    const isValidLength = title.length !== 0;
    const isNotANum = isNaN(title);

    const err = !isValidLength
      ? "title cannot be empty"
      : !isNotANum
      ? "title cannot be just a number"
      : "";

    setValidTitle({
      status: isValidLength && isNotANum,
      msg: err,
    });

    const desc = descRef.current.value;

    if (props.type === "folder") {
      if (isValidLength && isNotANum) {
        console.log("create new folder ");
        props.onCreateNewFolder({ title: title, desc: desc });
      }
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
          <div className="heading">{props.type} details</div>
          <div className="btn-container">
            <button className={"btn cta"} onClick={validateData}>
              Done
            </button>
          </div>
        </div>
        <div className="input">
          <div className="title-field">
            <label className="item-label">title</label>
            <input
              ref={titleRef}
              className="title"
              type="text"
              autoCorrect="off"
              autoFocus="true"
              required="true"
              placeholder={`New ${props.type} title goes here..`}
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
              type="text"
              autoCorrect="off"
              placeholder={`(optional) tell us more about "${props.type}" `}
              // onChange={() => {props.entityDesc()}}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputModal;
