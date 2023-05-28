import React, { useState } from "react";
import folderIcon from "../../Assests/folder.svg";
import closeIcon from "../../Assests/close.svg";
import "../Folder/Folder.css";

function Folder(props) {
  const [isActiveFolder, setActiveFolder] = useState(false);
  const folderNameLength = 17;
  return (
    <div
      className="folder-item"
      onClick={() => {
        setActiveFolder(!isActiveFolder);
        props.onClick(props.folderId);
      }}
    >
      <div id={isActiveFolder ? "activeIcon" : "inactiveIcon"}>
        <img src={folderIcon} />
      </div>
      <div id={isActiveFolder ? "activeFolderHeading" : "inactiveHeading"}>
        <p>{props.folderName.substring(0, folderNameLength)}</p>
      </div>

      {/* <div>
        <img className="delete" src={closeIcon} />
      </div> */}
    </div>
  );
}

export default Folder;
