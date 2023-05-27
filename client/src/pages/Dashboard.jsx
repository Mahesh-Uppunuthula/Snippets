import React, { useEffect, useState } from "react";
import Axios from "axios";

import addIcon from "../Assests/add.svg";
import Folder from "../components/Folder/Folder.js";
import Card from "../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dir, setDir] = useState();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    console.log("dashboard token", token);
    if (!token) {
      navigate("/login");
    } else {
      Axios.get("http://localhost:5000/verify", {
        headers: {
          Authorization: token,
        },
      }).then((isVerified) => {
        console.log("reponse from /verify router in auth login", isVerified);
        // fetch user details here
        console.log("verified user ");

        // axios
        //   .get("http://localhost:5000/dashboard", { userId: token.id })
        //   .then((response) => {
        //     console.log("dashbaord axios response port verify",response);
        //   })
        //   .catch((err)=>{
        //     console.log(err);
        //   })
      });
    }
  });

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     console.log("token client", token);
  //     Axios.post("http://localhost:5000/dashboard", { userId: token.id }).then(
  //       (response) => {
  //         console.log("response from dashboard server", response.data.userDir);
  //         const userDirectory = response.data.userDir;

  //         // setDir(userDirectory);
  //         // console.log("dir", typeof dir);
  //         // console.log("dir", dir[0].name);

  //         const userFolders = [];
  //         for (let [key, value] of Object.entries(dir)) {
  //           userFolders.push(value.name);
  //           console.log(key, value.name);
  //         }

  //         // console.log("dir", dir);
  //       }
  //     );
  //   }
  // }, []);

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
              {/* {dir.map((folder)=>{
                <Folder folderName = {folder.name} />
              })} */}
            </div>
          </div>
          <div className="bottom-right-pane">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}
