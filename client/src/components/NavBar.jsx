import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage/ToastMessage";
import Axios from "axios";
import profileIcon from "../Assests/default_profile_icon.svg";
import helper from "../Services/helper";
const BASE_URL = helper.BASE_URL;

function NavBar() {
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [userEmail, setUserEmail] = useState("");

  const [isLoggdIn, setLoggedIn] = useState(true);

  console.log("BASE URL", BASE_URL);

  useEffect(() => {
    // console.log("dashboard token", token);
    if (!token) {
      navigate("/login");
      setLoggedIn(false);
    } else {
      const url = BASE_URL + "/verify";
      console.log("URL, ", url);
      Axios.get(url, {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        if (response.data.isVerified) {
          setUserEmail(response.data.email);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });
    }
  }, []);

  function logUserOut(event) {
    toastRef.current.toast();
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.pathname = "/";
  }

  return (
    <>
      <header>
        <nav>
          <div>
            <Link className="brand link-item" to="/">
              Snippets
            </Link>
          </div>
          <div>
            <ul>
              {!isLoggdIn ? (
                <button>
                  <Link className="link-item" to="/login">
                    Login
                  </Link>
                </button>
              ) : (
                <div className="profile-btn">
                  <div className="details-section">
                    <p className="username">Uppunuthula</p>
                    <p className="profession">student</p>
                  </div>
                  <div className="profile-icon">
                    <img src={profileIcon}/>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <ToastMessage message={"logging you out"} type={"error"} ref={toastRef} />
    </>
  );
}

export default NavBar;
