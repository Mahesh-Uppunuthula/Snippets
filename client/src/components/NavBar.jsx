import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isLoggdIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("UserID");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  function logUserOut(event){
    window.localStorage.removeItem("UserID");
    setLoggedIn(false);
  }

  return (
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
            {isLoggdIn ? <button onClick={logUserOut}>Log Out</button> : <button><Link to="/login">Login</Link></button>}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
