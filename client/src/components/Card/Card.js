import React from "react";
import calendarIcon from "../../Assests/calendar.svg";
import arrowRightIcon from "../../Assests/arrow-right.svg";
import "../Card/Card.css";

function Card(props) {
  return (
    <div className="card" onClick={()=>{props.onClick(props.snippet_id)}}>
      <div>
        <p className="card-heading">{props.title}</p>
      </div>
      <div className="card-bottom">
        <div className="card-bottom-left">
          <img src={calendarIcon} alt="calendar img" />
          <p>{props.date}</p>
        </div>
        <div className="card-bottom-right">
          <img src={arrowRightIcon} alt="arrow-right img" />
        </div>
      </div>
    </div>
  );
}

export default Card;
