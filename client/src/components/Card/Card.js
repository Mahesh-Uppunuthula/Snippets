import React from "react";
import calendarIcon from "../../Assests/calendar.svg";
import arrowRightIcon from "../../Assests/arrow-right.svg";
import "../Card/Card.css";

function Card() {
  return (
    <div className="card">
      <div>
        <p className="card-heading">React Router Dom example</p>
      </div>
      <div className="card-bottom">
        <div className="card-bottom-left">
          <img src={calendarIcon} alt="calendar img" />
          <p>23-03-2023</p>
        </div>
        <div className="card-bottom-right">
          <img src={arrowRightIcon} alt="arrow-right img" />
        </div>
      </div>
    </div>
  );
}

export default Card;
