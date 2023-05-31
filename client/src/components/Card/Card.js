import React, { useRef, useState } from "react";
import calendarIcon from "../../Assests/calender-rounded-corners.svg";
import arrowRightIcon from "../../Assests/arrow-right.svg";
import "../Card/Card.css";

function Card(props) {
  const ellipseStyle = "...";
  const titleLength = 22;
  const dateLength = 10;
  const [isMouseOverCard, setMouseOverCard] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseOverCard(true)}
      onMouseLeave={() => {
        setMouseOverCard(false);
      }}
      className="card"
      onClick={() => {
        props.onClick(props.snippet_id);
      }}
    >
      <div>
        <p className="card-heading">
          {props.title.substring(0, titleLength) +
            (props.title.length > 23 ? ellipseStyle : "")}
        </p>
      </div>
      <div className="card-bottom">
        <div className="card-bottom-left">
          <img
            id={isMouseOverCard && "whiteFilter"}
            src={calendarIcon}
            alt="calendar img"
          />
          <p>{props.date.substring(0, dateLength)}</p>
        </div>
        <div className="card-bottom-right">
          <img src={arrowRightIcon} alt="arrow-right img" />
        </div>
      </div>
    </div>
  );
}

export default Card;
