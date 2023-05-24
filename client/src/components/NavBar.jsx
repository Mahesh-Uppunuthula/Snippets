import React  from "react";
import profileImg from "../Assests/person.svg";

import {Link} from "react-router-dom";

function NavBar()
{
    return <header>
        {/* <a className="brand" href="/"><h1>Snippets</h1></a> */}
        <Link to="/">Snippets</Link>
        <nav>
            <ul>
                {/* <li className="nav-item"><a className="nav-link" href="/">Dashboard</a></li>
                <li> <a  href="/"><img className="profile-icon" src={profileImg}></img></a></li> */}
                <Link to="/dashboard">Dashboard</Link>                
                <Link to="/profile"><img alt="Open Profile" className="profile-icon" src={profileImg}></img></Link>                
                {/* <Link to="/Auth">Auth</Link>                 */}
                {/* <Link to="/Create">Create</Link>                 */}
            </ul>
        </nav>
       
    </header>
    
}

export default NavBar;