import React, { useEffect, useRef } from "react";

import codeEditor from "../Assests/codeEditor.svg";
import ToastMessage from "../components/ToastMessage/ToastMessage";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const toastRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      toastRef.current.toast();
      navigate("/dashboard");
    } else {
      navigate("/")
    }
  }, []);

  return (
    <div>
      <ToastMessage
        message="you are succussfully logged in"
        type="success"
        ref={toastRef}
      />
      <div className="home">
        <div className="left-pane">
          <div>
            <h1 className="hero-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elitw sed do
              eiusmod ut et.
            </h1>
            <Link to="/register">
              <button>Get Started </button>
            </Link>
          </div>
        </div>
        <div className="right-pane">
          <img className="sample-edior-img" src={codeEditor} />
        </div>
      </div>
    </div>
  );
}
