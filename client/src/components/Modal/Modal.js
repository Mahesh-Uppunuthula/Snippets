import React, { useEffect, useState, useRef } from "react";

// CSS
import "../Modal/Modal.css";

// ICONS
import warningIcon from "../../Assests/exclamation-circle.svg";
import infoIcon from "../../Assests/info-circle-icon.svg";

function Modal(props) {
  const titleRef = useRef();
  const descRef = useRef();

  const [isValidTitle, setValidTitle] = useState({
    status: null,
    msg: "",
  });

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
  const [showLangError, setShowLangError] = useState(false);

  useEffect(() => {
    console.log(isValidTitle);
  }, [isValidTitle]);

  function highlightSelectedLang(KEY) {
    setLangClick(true);
    setShowLangError(false);
    // console.log("key", KEY);
    // console.log("prev key", prevKey);

    // console.log("prev obj", selectedLang);

    const updatedSelectedLang = { ...selectedLang, [prevKey]: false };
    // console.log("middle obj", selectedLang);

    setSelectedLang({ ...updatedSelectedLang, [KEY]: true });
    // console.log("next obj", selectedLang);
    setPrevKey(KEY);
  }

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
    } else if (props.type === "snippet") {
      if (isValidLength && isNotANum) {
        if (isLangClicked) {
          console.log("valid snippet details");
        }
        console.log("is lang clicked ", isLangClicked);
        setShowLangError(true);
        props.onCreateNewSnippetMetaData({title: title, desc: desc, language: selectedLang})
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

        {props.type === "snippet" && (
          <div className="lang-details">
            <label className="item-label">
              language
              <span>
                {!isLangClicked && (
                  <div className="note">
                    <img src={infoIcon} />
                    <p>
                      choose any language from below for rich intellisense and
                      validation
                    </p>
                  </div>
                )}
                {showLangError && (
                  <div className="msg">
                    <img src={warningIcon} />
                    <p>select language to proceed</p>
                  </div>
                )}
              </span>
            </label>
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
          </div>
        )}
      </div>
    </>
  );
}

export default Modal;
