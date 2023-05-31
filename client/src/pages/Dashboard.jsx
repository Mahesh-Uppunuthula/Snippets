import React, { useEffect, useState } from "react";
import Axios from "axios";

import Modal from "../components/Modal/Modal";

import addIcon from "../Assests/add.svg";
import addFolderIcon from "../Assests/add-folder.svg";
import trashIcon from "../Assests/trash.svg";
import Folder from "../components/Folder/Folder.js";
import Card from "../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [reloadDash, setReloadDash] = useState(0);
  const navigate = useNavigate();
  const [isClickedFolderYet, setClickedFolderYet] = useState(false);

  const [isAddNewFolderClicked, setAddNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [folders, setFolders] = useState([
    {
      name: "",
      folder_id: "",
    },
  ]);

  const [activeFolderId, setActiveFolderId] = useState({
    folderId: "",
    folderName: "",
    date: "",
  });

  // content: "new React code";
  // date: "2023-05-28T00:05:43.591Z";
  // folderId: "6472991b54329683aff581b3";
  // folderName: "React Snippets";
  // language: "React";
  // title: "new React Snippet";
  // userId: "64723c06d9cea6531e6da007";
  // __v: 0;
  // _id: "64729ad754329683aff581ba";

  const [folderSnippets, setFolderSnippets] = useState([
    {
      title: "",
      content: "",
      language: "",
      folderName: "",
      date: "",
      userId: "",
      _id: "",
    },
  ]);

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
      }).then((response) => {
        console.log("reponse from /verify router in auth login", response);
        // fetch user details here
        if (response) {
          console.log("authorized user");

          Axios.get("http://localhost:5000/dashboard", {
            headers: {
              Authorization: token,
            },
          })
            .then((response) => {
              const userFolders = response.data.folders;
              console.log("client dashboard response", userFolders);

              const folderSpecs = userFolders.map((folder) => {
                return {
                  name: folder.name,
                  folder_id: folder._id,
                  date: folder.date.substring(0, 10),
                };
              });

              // console.log("folderSpecs", folderSpecs);

              setFolders(folderSpecs);
              // console.log("folders", folders);
            })
            .catch((err) => {
              console.log("Dashboard client err", err);
            });
        } else {
          navigate("/login");
        }
      });
    }
  }, [reloadDash]);

  function getSnippetsOfAFolder(folderId, folderName, date) {
    setActiveFolderId({ folderId, folderName, date });
    console.log("open this folder with id", folderId);
    const url = "http://localhost:5000/dashboard/" + folderId;

    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const folderSnippetsArray = response.data.snippets;
        console.log("folderSnippetsArray", folderSnippetsArray);

        setFolderSnippets(folderSnippetsArray);
        console.log("folderSnippets", folderSnippets);

        setClickedFolderYet(true);
      })
      .catch((err) => {
        console.log("client open folder err", err);
      });
  }

  function openSnippet(snippet_id) {
    console.log("clicked on snippet with id", snippet_id);
    navigate("/editor", {
      state: {
        folderId: activeFolderId.folderId,
        snippetId: snippet_id,
        mode: "view",
      },
    });
  }

  function createNewFolder() {
    setReloadDash(reloadDash + 1);
    console.log("clicked on save folder");
    const isValidFolderName = newFolderName.trim().length !== 0;

    console.log("isValidFolderName", isValidFolderName);

    if (isValidFolderName) {
      Axios.post(
        "http://localhost:5000/dashboard/",
        {
          folderName: newFolderName,
        },
        {
          headers: { Authorization: token },
        }
      )
        .then((response) => {
          console.log("response after creating new folder", response);
          setAddNewFolder(false);
        })
        .catch((err) => {
          console.log("create new folder client err", err);
        });
    } else {
      /**
       *  Show error message
       */
    }
  }

  function openEditor() {
    navigate("/editor", {
      state: {
        folderId: activeFolderId.folderId,
        folderName: activeFolderId.folderName,
        mode: "create",
      },
    });
  }

  function deleteFolder() {
    setClickedFolderYet(false);
    setReloadDash(reloadDash - 1);
    const url = "http://localhost:5000/dashboard/" + activeFolderId.folderId;
    Axios.delete(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("response of delete folder client", response);
      })
      .catch((err) => {
        console.log("Dashboard client delete folder err", err);
      });
  }

  return (
    <>
      {isAddNewFolderClicked && (
        <Modal
          heading={"Enter folder name"}
          errMsg={"Invalid folder name"}
          onSave={createNewFolder}
          onTextChange={(text) => {
            setNewFolderName(text);
          }}
          onCloseModal={() => {
            setAddNewFolder(false);
          }}
        />
      )}
      <div className="content-pane">
        <div className="page-top-pane">
          <div className="page-heading">
            <p>Repositories</p>
            <p className="folders-count">{folders.length}</p>
          </div>
          <div className="dashboard-options">
            <div
              className="link-item"
              onClick={() => {
                setAddNewFolder(true);
              }}
            >
              <button className="light-btn link-item">
                <img src={addFolderIcon} alt="add-snippet img" />
                <p>New folder</p>
              </button>
            </div>
            {isClickedFolderYet && (
              <>
                <button
                  className="call-to-action link-item"
                  onClick={openEditor}
                >
                  <img
                    className="expandable-btn-icon"
                    src={addIcon}
                    alt="add-snippet img"
                  />
                  <p className="expandable-btn-text">create</p>
                </button>
                <button
                  className="expandable-err-btn link-item"
                  onClick={deleteFolder}
                >
                  <img
                    className="expandable-btn-icon"
                    src={trashIcon}
                    alt="delete-snippet img"
                  />
                  <p className="expandable-btn-text">Delete folder</p>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="bottom-pane">
          <div className="folders-list">
            {/* <p className="folder-sub-heading">
              <p>Folders</p> <p className="count">{folders.length}</p>
            </p> */}
            <div className="folder-container">
              {folders.map((folder) => {
                return (
                  <Folder
                    folderName={folder.name}
                    folderId={folder.folder_id}
                    folderDate={folder.date}
                    onClick={getSnippetsOfAFolder}
                  />
                );
              })}
            </div>
          </div>
          <div className="bottom-right-pane">
            {isClickedFolderYet && (
              <div className="folder-deets">
                <div className="name">{activeFolderId.folderName}</div>
                <div className="date">created on {activeFolderId.date}</div>
              </div>
            )}

            <div className="grid-container">
              {isClickedFolderYet &&
                folderSnippets.map((snippet) => {
                  return (
                    <Card
                      title={snippet.title}
                      date={snippet.date}
                      snippet_id={snippet._id}
                      onClick={openSnippet}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
