import React from "react";
import closeBtn from "../Assests/close.svg";

function Message(props) {
  
    function closeMessage(){
        console.log("close");
    }


    return (
    <div
      className="message"
      style={{ backgroundColor: props.type === "error" ? "red" : "green", visibility: "visible"}}
    >
      <div className="message-text-container">
        <p>{props.message}</p>
      </div>
      <div className="message-img-container">
        <img onClick={closeMessage} src={closeBtn} alt="Close message" />
      </div>
    </div>
  );
}

export default Message;
