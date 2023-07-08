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
    JAVA: false,
    C_SHARP: false,
    PYTHON: false,
    C_PLUS_PLUS: false,
    XML: false,
    PHP: false,
    RUBY: false,
    R: false,
    OBJECTIVE_C: false,
    POWERSHELL: false,
  });
  const [isLangClicked, setLangClick] = useState({
    status: false,
    language: "",
  });
  const [prevKey, setPrevKey] = useState("");

  const [startWithBoilerPlateCode, setStartWithBoilerPlateCode] = useState(true);

  function highlightSelectedLang(KEY) {
    setLangClick({ status: true, language: KEY });

    console.log("key", KEY);
    console.log("prev key", prevKey);

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
        <div className="top-pane">
          <div className="modal-heading">
            {props.type} Select language to proceed{" "}
          </div>
          <div className="btn-container">
            <button
              className={`btn ${isLangClicked ? "cta" : "disable"}`}
              onClick={() => props.onDoneSelectingLang(isLangClicked.language, startWithBoilerPlateCode)}
            >
              Done
            </button>
          </div>
        </div>
        <div className="options">
          <input type="checkbox" checked={startWithBoilerPlateCode} onChange={()=>{setStartWithBoilerPlateCode(!startWithBoilerPlateCode)}} />
          <label className="item-label">start with boiler plate code</label>
        </div>
        <div className="lang-details">
          <label className="item-label">
            languages that have rich intellisense and validation
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
          </div>
          <label className="item-label">
            languages with only basic syntax colorization
          </label>
          <div className="lang-container">
            <div
              className={`LANG java ${selectedLang.JAVA && "JAVA"}`}
              onClick={() => highlightSelectedLang("JAVA")}
            >
              JAVA
            </div>
            <div
              className={`LANG c_sharp ${selectedLang.C_SHARP && "C-SHARP"}`}
              onClick={() => highlightSelectedLang("C_SHARP")}
            >
              C#
            </div>
            <div
              className={`LANG python ${selectedLang.PYTHON && "PYTHON"}`}
              onClick={() => highlightSelectedLang("PYTHON")}
            >
              PYTHON
            </div>
            <div
              className={`LANG c-plus-plus ${
                selectedLang.C_PLUS_PLUS && "C-PLUS-PLUS "
              }`}
              onClick={() => highlightSelectedLang("C_PLUS_PLUS")}
            >
              C++
            </div>
            <div
              className={`LANG xml ${selectedLang.XML && "XML"}`}
              onClick={() => highlightSelectedLang("XML")}
            >
              XML
            </div>
            <div
              className={`LANG php ${selectedLang.PHP && "PHP"}`}
              onClick={() => highlightSelectedLang("PHP")}
            >
              PHP
            </div>
            <div
              className={`LANG ruby ${selectedLang.RUBY && "RUBY"}`}
              onClick={() => highlightSelectedLang("RUBY")}
            >
              RUBY
            </div>
            <div
              className={`LANG r ${selectedLang.R && "R"}`}
              onClick={() => highlightSelectedLang("R")}
            >
              R
            </div>
            <div
              className={`LANG objective-c ${
                selectedLang.OBJECTIVE_C && "OBJECTIVEC"
              }`}
              onClick={() => highlightSelectedLang("OBJECTIVE_C")}
            >
              OBJECTIVE-C
            </div>
            <div
              className={`LANG powershell ${
                selectedLang.POWERSHELL && "POWERSHELL"
              }`}
              onClick={() => highlightSelectedLang("POWERSHELL")}
            >
              POWERSHELL
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LangModal;
