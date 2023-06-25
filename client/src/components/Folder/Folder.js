import React, { useState } from "react";
import folderIcon from "../../Assests/right_arrow_without_tail.svg";
import "../Folder/Folder.css";

function Folder(props) {
  const [isActiveFolder, setActiveFolder] = useState(false);
  const folderNameLength = 17;
  return (
    <div
      className="folder-item"
      onClick={() => {
        setActiveFolder(!isActiveFolder);
        props.onClick(props.folderId, props.folderName, props.folderDate);
      }}
    >
      <div id={isActiveFolder ? "activeIcon" : "inactiveIcon"}>
        <img src={folderIcon} />
      </div>
      <div id={isActiveFolder ? "activeFolderHeading" : "inactiveHeading"}>
        <p>{props.folderName.substring(0, folderNameLength)}</p>
      </div>
    </div>
  );
}

export default Folder;
