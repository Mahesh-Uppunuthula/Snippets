import React from 'react'
import folderIcon from "../../Assests/folder.svg";
import "../Folder/Folder.css"

function Folder(props) {
  return (
    <div className='folder-item'>
        <div><img src={folderIcon}/></div>
        <div><p>{props.folderName}</p></div>
    </div>
  )
}

export default Folder