import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Axios from "axios";

import CodeEditor from "../components/CodeEditor";

function Editor() {
  const location = useLocation();
  const [codeChange, setCodeChange] = useState("");
  const [isSaveClicked, setSaveClicked] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const mode = location.state.mode;
  const folderId = location.state.folderId;
  const folderName = location.state.folderName;
  const snippetId = location.state.snippetId;
  const isCreateMode = mode === "create";

  const [activeSnippet, setActiveSnippet] = useState({
    title: "",
    content: "",
  });

  // console.log("folderId , snippetId ", folderId, snippetId);

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
          /**
           * get snippet data if the mode is view (or not create mode)
           * */

          if (!isCreateMode) {
            const url =
              "http://localhost:5000/editor/" + folderId + "/" + snippetId;
            Axios.get(url, {
              headers: {
                Authorization: token,
              },
            })
              .then((response) => {
                const snippet = response.data.snippet;
                // alert("got data from server")
                setActiveSnippet({
                  title: snippet.title,
                  content: snippet.content,
                });
              })
              .catch((err) => {
                console.log("err from client in get snippet ", err);
              });
          }
        } else {
          navigate("/login");
        }
      });
    }
  }, []);

  function creatNewFile() {
    const isValidFileName = newFileName.trim().length !== 0;
    if (isValidFileName) {
      // Save the file to db

      console.log("isValid", isValidFileName);
      console.log("folder id sent from dashboard", location.state.folderId);

      Axios.post(
        "http://localhost:5000/editor",
        {
          title: newFileName,
          content: codeChange,
          folderId: folderId,
          folderName: folderName,
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

  function goBackToDashboard() {
    navigate("/dashboard");
  }

  function deleteFile() {}

  function updateFile() {
    const url = "http://localhost:5000/editor/" + folderId + "/" + snippetId;
    Axios.put(url,
      {
        title:newFileName,
        content:codeChange,
      },
      {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // console.log(response);
        setSaveClicked(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("err from client in edit snippet ", err);
      });
  }

  return (
    <>
      {isSaveClicked && (
        <Modal
          heading={"Enter file name"}
          onSaveFolder={isCreateMode ? creatNewFile : updateFile}
          onTextChange={(text) => {
            setNewFileName(text);
          }}
          fileName={isCreateMode ? newFileName : activeSnippet.title}
          onCloseModal={() => {
            setSaveClicked(false);
          }}
        />
      )}
      <div content-pane>
        <div className="page-top-pane">
          <div className="page-heading">Editor</div>
          <div className="dashboard-options">
            {!isCreateMode && (
              <button
                className="border-btn link-item"
                onClick={goBackToDashboard}
              >
                go back
              </button>
            )}
            <button
              className="border-btn link-item"
              onClick={() => {
                setSaveClicked(true);
              }}
            >
              <p>{isCreateMode ? "save" : "save changes"}</p>
            </button>
            <button
              className="delete-btn link-item"
              onClick={isCreateMode ? goBackToDashboard : deleteFile}
            >
              <p>{isCreateMode ? "cancel" : "delete"}</p>
            </button>
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
                content={
                  isCreateMode ? "//some comment" : activeSnippet.content
                }
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
