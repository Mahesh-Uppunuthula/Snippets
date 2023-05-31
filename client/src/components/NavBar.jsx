import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage/ToastMessage";
import Axios from "axios";
import logout_btn from "../Assests/logout.svg"

function NavBar() {
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [userEmail,setUserEmail] = useState("");

  const [isLoggdIn, setLoggedIn] = useState(true);

  useEffect(() => {
    // console.log("dashboard token", token);
    if (!token) {
      navigate("/login");
      setLoggedIn(false);
    } else {
      Axios.get("http://localhost:5000/verify", {
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

  function logUserOut(event){
  
    toastRef.current.toast();
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.pathname="/"
    
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
            {/* <Link className="nav-link link-item" to="/dashboard">Dashboard</Link> */}
            {/* <div className="vertical-line "/> */}
            {/* <Link className="nav-link link-item" to="/editor">Editor</Link> */}
            {/* <div className="vertical-line "/> */}
            {!isLoggdIn ? <button><Link className="link-item" to="/login">Login</Link></button> : <button className="email-btn"  onClick={logUserOut}><p>{"uppunuthulamahesh312@gmail.com"}</p><img src={logout_btn}/></button> }
          </ul>
        </div>
      </nav>
    </header>
    <ToastMessage message={"you are logged out"} type = {"error"} ref={toastRef}/>
    </>
  );
}

export default NavBar;
