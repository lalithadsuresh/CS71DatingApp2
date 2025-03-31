import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';


function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu =() => setClick(false);
  return (
    <>
        <nav className='Navbar'>
            <div className='Navbar-container '>
                {/* <link to="/ " className='navbar-logo'>

// Add link to Logo here to be at the top
                </link> */}
      <div className="nav-links">
        <a href="Matches" className="link">Your Matches</a>
        <a href="Settings" className="link">Settings</a>
        <a href="Profile" className="link">Profile</a>
        <button className="match-button" onClick={() => window.location.href = "\homepage"}>Match</button>
      </div>

        <div className = 'menu-icon' onClick = {handleClick} >
            <i className={click ? 'fas fa_times' : 'fas fa-bars'} />
        </div>

            <div className='nav-item'>
                <LogoutButton />
            </div>
        
        </div>
    </nav>
            
    
    </>
  )
}

export default Navbar
