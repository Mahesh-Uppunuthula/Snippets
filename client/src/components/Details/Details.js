import React from "react";
import "./Details.css";

// ICONS
import addIcon from "../../Assests/Add_icon.svg";
import heartEmptyIcon from "../../Assests/heart.svg";
import heartFillIcon from "../../Assests/heart-fill.svg";
import trashIcon from "../../Assests/trash.svg";

function Details(props) {
  let deleteStr = `delete this ${props.type === "file" ? "snippet" : "folder"}`;
  return (
    <div className="details-container">
      <p className="side-heading all-caps pane-heading">about</p>
      <div className="std-details">
        <div>
          <label>{props.type} name</label>
          <input
            className="details-input"
            onChange={props.onNameChange}
            type="text"
            value={props.activeFolderName}
          />
        </div>

        <div>
          <label>description</label>
          <textarea
            className="details-textarea"
            onChange={props.onDescriptionChange}
            type="text"
          >
            {props.activeFolderDesc}
          </textarea>
        </div>
      </div>

      <div className="options">
        {props.showOptionals && (
          <div className="optional">
            <div className="btn-w-icon link-item active-btn primary-color">
              <img src={addIcon} /> add new snippet
            </div>
            {props.isfav ? (
              <div
                className="btn-w-icon link-item active-btn fav-yellow"
                onClick={props.redirectToExtn}
              >
                <img src={heartFillIcon} />
                favorite folder
              </div>
            ) : (
              <div
                className=" btn-w-icon link-item border-btn fav-yellow"
                onClick={props.redirectToExtn}
              >
                <img src={heartEmptyIcon} />
                set as favorite
              </div>
            )}
          </div>
        )}
        <div className="btn-w-icon link-item border-btn err-red"
        onClick={props.deleteEntity}>
          <img src={trashIcon} />
          {deleteStr}
        </div>
      </div>
    </div>
  );
}

export default Details;
