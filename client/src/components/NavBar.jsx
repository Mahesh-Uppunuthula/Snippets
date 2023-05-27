import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ToastMessage from "./ToastMessage/ToastMessage";

function NavBar() {
  const toastRef = useRef(null);
  
  const token = window.localStorage.getItem("token");

  const [isLoggdIn, setLoggedIn] = useState(true);
  useEffect(() => {
    if (!token) {
      setLoggedIn(false);
    }
  }, [token]);

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
            <Link className="nav-link link-item" to="/dashboard">Dashboard</Link>
            <div className="vertical-line "/>
            <Link className="nav-link link-item" to="/editor">Editor</Link>
            <div className="vertical-line "/>
            {!isLoggdIn ? <button><Link className="link-item" to="/login">Login</Link></button> : <button className="border-btn"  onClick={logUserOut}>Log Out</button> }
          </ul>
        </div>
      </nav>
    </header>
    <ToastMessage message={"you are logged out"} type = {"error"} ref={toastRef}/>
    </>
  );
}

export default NavBar;
