import React, { useState } from "react";
import {Link} from "react-router-dom";

import CodeEditor from "../components/CodeEditor";

function Editor() {
  const [codeChange, setCodeChange] = useState("");
  return (
    <div content-pane>
      <div className="page-top-pane">
        <div className="page-heading">Editor</div>
        <div className="dashboard-options">
          <div className="link-item" onClick={() => {}}>
            <button className="border-btn link-item">
              <p>Save</p>
            </button>
          </div>
          <Link className="link-item" to="/dashboard">
            <button className="delete-btn link-item">
              <p>Delete</p>
            </button>
          </Link>
        </div>
      </div>
      <div className="page-bottom-pane">
        <p className="editor-heading">Paste your code in the editor below</p>
        <div className="editor-bg">
          <div className="code-editor">
            <div className="tab-bar">
              <div className="editor-controls">
                <div className="red"></div>
                <div className="yellow"></div>
                <div className="green"></div>
              </div>
            </div>
            <CodeEditor
              textChange={(value, event) => {
                setCodeChange(value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
