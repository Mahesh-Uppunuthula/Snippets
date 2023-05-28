import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Axios from "axios";

import CodeEditor from "../components/CodeEditor";

function Editor(props) {
  
  const location = useLocation();
  const [codeChange, setCodeChange] = useState("");
  const [isSaveClicked, setSaveClicked] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    // console.log("dashboard token", token);
    if (!token) {
      navigate("/login");
    } else {
      Axios.get("http://localhost:5000/verify", {
        headers: {
          Authorization: token,
        },
      }).then((isVerified) => {
        // console.log("reponse from /verify router in auth login", isVerified);
        // fetch user details here
        console.log("authorized user");

        if (isVerified) {
          // Do something
        } else {
          navigate("/login");
        }
      });
    }
  });

  function creatNewFile() {
    const isValidFileName = newFileName.trim().length !== 0;
    if (isValidFileName) {
      // Save the file to db
    
      console.log("isValid",isValidFileName);
      console.log("folder id sent from dashboard", location.state.folderId);

      Axios.post( 
        "http://localhost:5000/editor",
        {
          title:newFileName,
          content:codeChange,
          folderId:location.state.folderId,
          folderName: location.state.folderName
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          console.log("reponse from create new file client", response);
          setSaveClicked(false);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log("err from client create new file", err);
          // show err message
        });
    } else {
      // show error message
    }
  }

  return (
    <>
      {isSaveClicked && (
        <Modal
          heading={"Enter file name"}
          onSaveFolder={creatNewFile}
          onTextChange={(text) => {
            setNewFileName(text);
          }}
          onCloseModal={() => {
            setSaveClicked(false);
          }}
        />
      )}
      <div content-pane>
        <div className="page-top-pane">
          <div className="page-heading">Editor</div>
          <div className="dashboard-options">
            <div
              className="link-item"
              onClick={() => {
                setSaveClicked(true);
              }}
            >
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
    </>
  );
}

export default Editor;
