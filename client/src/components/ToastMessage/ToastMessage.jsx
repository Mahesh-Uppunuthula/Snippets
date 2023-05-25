import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "../ToastMessage/toastMessage.css";

function ToastMessage(props, ref) {
  const [showToastMessage, setToastMessage] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      toast() {
        setToastMessage(true);
        setTimeout(() => {
          setToastMessage(false);
        }, 3000);
      },
    };
  });

  return (
    <div
      id={showToastMessage ? "show" : "hide"}
      className="message"
      style={{
        backgroundColor: props.type === "success" ? "#00F593" : "#FF0033",
      }}
    >
      <div className="message-text-container">
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default React.forwardRef(ToastMessage);
