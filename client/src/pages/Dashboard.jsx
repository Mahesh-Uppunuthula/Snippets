import React, { useEffect, useState } from "react";
import Axios from "axios";

import addIcon from "../Assests/add.svg";
import Folder from "../components/Folder/Folder.js";
import Card from "../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([
    {
      name: "",
      folder_id: "",
    },
  ]);

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
      }).then((isVerified) => {
        // console.log("reponse from /verify router in auth login", isVerified);
        // fetch user details here
        console.log("authorized user");

        Axios.get("http://localhost:5000/dashboard", {
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            const userFolders = response.data.folders;
            // console.log("client dashboard response", userFolders);

            const folderSpecs = userFolders.map((folder) => {
              return { name: folder.name, folder_id: folder._id };
            });

            // console.log("folderSpecs", folderSpecs);

            setFolders(folderSpecs);
            // console.log("folders", folders);
          })
          .catch((err) => {
            console.log("Dashboard client err", err);
          });
      });
    }
  }, []);

  function openFolder(folder_id) {
    console.log("open this folder with id", folder_id);
    const url = "http://localhost:5000/dashboard/" + folder_id;
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
      })
      .catch((err) => {
        console.log("client open folder err", err);
      });
  }

  function openSnippet(snippet_id){
    console.log("clicked on snippet with id",snippet_id);
  }

  return (
    <>
      <div className="content-pane">
        <div className="page-top-pane">
          <div className="page-heading">Dashboard</div>
          <div>
            <Link to="/editor" className="link-item">
              <button className="call-to-action link-item">
                <img src={addIcon} alt="add-snippet img" />
                <p>Add snippet</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="bottom-pane">
          <div className="folders-list">
            <p className="folder-sub-heading">Folders</p>
            <div className="folder-container">
              {folders.map((folder) => {
                return (
                  <Folder
                    folderName={folder.name}
                    folderId={folder.folder_id}
                    onClick={openFolder}
                  /> 
                );
              })}
            </div>
          </div>
          <div className="bottom-right-pane">
            {folderSnippets.map((snippet) => {
              return <Card title={snippet.title} date = {snippet.date} snippet_id = {snippet._id} onClick={openSnippet}/>;
            })}
          </div>
        </div> 
      </div>
    </>
  ); 
} 
