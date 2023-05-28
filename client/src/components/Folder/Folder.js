import React from 'react'
import folderIcon from "../../Assests/folder.svg";
import "../Folder/Folder.css"

function Folder(props) {

  // function openFolder(event){
  //   console.log("folder clicked",props.folderId);
  // }

  // console.log("folder props", props);
  return (
    <div className='folder-item' onClick={()=>{props.onClick(props.folderId)}}>
        <div><img src={folderIcon}/></div>
        <div><p>{props.folderName}</p></div>
    </div>
  ) 
}

export default Folder