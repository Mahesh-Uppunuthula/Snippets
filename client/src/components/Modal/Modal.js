import "../Modal/Modal.css";

import React, { useEffect, useState } from "react";
import warningIcon from "../../Assests/exclamation-circle.svg";
import infoIcon from "../../Assests/info-circle-icon.svg";

function Modal(props) {
  const [isValidName, setValidName] = useState(false);

  const [selectedLang, setSelectedLang] = useState({
    HTML: false,
    CSS: false,
    TYPESCRIPT: false,
    JAVASCRIPT: false,
    JSON: false,
    LESS: false,
    SCSS: false,
    OTHER: false,
  });

  const [prevKey, setPrevKey] = useState("");

  const [isLangClicked, setLangClick] = useState(false);
  // const selectedLangInitialValue = {
  //   HTML: false,
  //   CSS: false,
  //   TYPESCRIPT: false,
  //   JAVASCRIPT: false,
  //   JSON: false,
  //   LESS: false,
  //   SCSS: false,
  // };

  useEffect(() => {
    return () => {
      // cleanup
      // setSelectedLang(selectedLangInitialValue);
      // console.log("lang useeffect", selectedLang);
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

  function highlightSelectedLang(KEY) {
    setLangClick(true);
    console.log("key", KEY);
    console.log("prev key", prevKey);

    console.log("prev obj", selectedLang);

    const updatedSelectedLang = { ...selectedLang, [prevKey]: false };
    console.log("middle obj", selectedLang);

    setSelectedLang({ ...updatedSelectedLang, [KEY]: true });
    console.log("next obj", selectedLang);
    setPrevKey(KEY);
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
          <div className="title-field">
            <label className="item-label">title</label>
            <input
              className="title"
              type="text"
              autoCorrect="off"
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

          <div className="desc-field">
            <label className="item-label">description</label>
            <textarea
              className="desc"
              type="text"
              autoCorrect="off"
              placeholder={`(optional) tell us more about "${props.type}" `}
              // onChange={() => {props.entityDesc()}}
            ></textarea>
          </div>
        </div>

        <div className="lang-details">
          <div className="lang-container">
            <div
              className={`LANG html ${selectedLang.HTML && "HTML"}`}
              onClick={() => highlightSelectedLang("HTML")}
            >
              HTML
            </div>
            <div
              className={`LANG css ${selectedLang.CSS && "CSS"}`}
              onClick={() => highlightSelectedLang("CSS")}
            >
              CSS
            </div>
            <div
              className={`LANG typescript ${
                selectedLang.TYPESCRIPT && "TYPESCRIPT"
              }`}
              onClick={() => highlightSelectedLang("TYPESCRIPT")}
            >
              TYPESCRIPT
            </div>
            <div
              className={`LANG javascript ${
                selectedLang.JAVASCRIPT && "JAVASCRIPT"
              }`}
              onClick={() => highlightSelectedLang("JAVASCRIPT")}
            >
              JAVASCRIPT
            </div>
            <div
              className={`LANG json ${selectedLang.JSON && "JSON"}`}
              onClick={() => highlightSelectedLang("JSON")}
            >
              JSON
            </div>
            <div
              className={`LANG less ${selectedLang.LESS && "LESS"}`}
              onClick={() => highlightSelectedLang("LESS")}
            >
              LESS
            </div>
            <div
              className={`LANG scss ${selectedLang.SCSS && "SCSS"}`}
              onClick={() => highlightSelectedLang("SCSS")}
            >
              SCSS
            </div>
            <div
              className={`LANG other-lang ${selectedLang.OTHER && "OTHER"}`}
              onClick={() => highlightSelectedLang("OTHER")}
            >
              Other
            </div>
          </div>
          {isLangClicked && (
            <div className="note">
              <img src={infoIcon} />
              <p>only above mentioned languages have rich IntelliSense and validation</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
