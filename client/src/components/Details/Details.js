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
      <div className="pane_heading all-caps">about</div>
      <div className="std-details">
        <label>{props.type}name</label>
        <input
          className="details-input"
          onChange={props.onNameChange}
          type="text"
        />

        <label>description</label>
        <textarea
          className="details-textarea"
          onChange={props.onDescriptionChange}
          type="text"
        >
          {props.desc}
        </textarea>
      </div>

      <div className="options">
        {props.showOptionals && <div className="optional">
          <div className="link-item ">
            <img src={addIcon} /> add new snippet
          </div>
          <div className="link-item ">
            {props.isfav ? (
              <div
                className="link-item active-btn"
                onClick={props.redirectToExtn}
              >
                <img src={heartFillIcon} />
                favorite folder
              </div>
            ) : (
              <div
                className="link-item border-btn"
                onClick={props.redirectToExtn}
              >
                <img src={heartEmptyIcon} />
                set as favorite
              </div>
            )}
          </div>
        </div>}
        <div className="link-item border-btn delete">
          <img src={trashIcon} />
          {deleteStr}
        </div>
      </div>
    </div>
  );
}

export default Details;
