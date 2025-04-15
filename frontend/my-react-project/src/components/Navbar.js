import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";


function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const { logout, isAuthenticated } = useAuth0();


  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-container">

          {/* Replace this with a working logo if you have one */}
          {/* <Link to="/" className="navbar-logo">Unmasked</Link> */}

          <div className="nav-links">
            <LogoutButton visible={true}/>
            <Link to="/matches" className="link">Your Matches</Link>
            <Link to="/profile" className="link">Profile</Link>
            <button 
              className="match-button" 
              onClick={() => window.location.href = "/homepage"}>Match! 
            </button>

          </div>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <div className="nav-item">
            <LogoutButton />
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;
