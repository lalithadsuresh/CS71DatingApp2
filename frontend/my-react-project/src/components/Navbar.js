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

            <div className = 'menu-icon' onClick = {handleClick} >
                <i className={click ? 'fas fa_times' : 'fas fa-bars'} />
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/Homepage' className='nav-links' onClick={closeMobileMenu}>
                        Homepage
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Matches' className='nav-links' onClick={closeMobileMenu}>
                        Matches
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Profile' className='nav-links' onClick={closeMobileMenu}>
                        Profile
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Settings' className='nav-links' onClick={closeMobileMenu}>
                        Settings
                    </Link>
                </li>
                <li className='nav-item'>
                    <LogoutButton />
                </li>
            </ul>
            
            </div>
        </nav>
            
    
    </>
  )
}

export default Navbar
