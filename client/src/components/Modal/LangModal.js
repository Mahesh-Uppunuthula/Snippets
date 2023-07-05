import React from "react";
import { useState } from "react";

// CSS
import "../Modal/Modal.css";

import infoIcon from "../../Assests/info-circle-icon.svg";
import warningIcon from "../../Assests/exclamation-circle.svg";

function LangModal(props) {
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
  const [isLangClicked, setLangClick] = useState(false);
  const [showLangError, setShowLangError] = useState(false);
  const [prevKey, setPrevKey] = useState("");

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
  return (
    <>
      <div
        className="bg-container"
        onClick={() => {
          props.onCloseModal();
        }}
      ></div>
      <div className="lang-modal-container">
        <div className="lang-details">
          <label className="item-label">
            language
            <span>
              {
                <div className="note">
                  <img src={infoIcon} />
                  <p>
                    choose any language from below for rich intellisense and
                    validation
                  </p>
                </div>
              }
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
      </div>
    </>
  );
}

export default LangModal;
