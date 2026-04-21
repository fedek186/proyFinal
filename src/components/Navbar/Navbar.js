import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
import './Navbar.css'


const cookies = new Cookies();

function Navbar(props){
    const [menuOpen, setMenuOpen] = useState(false);
    const userAuth = cookies.get('user-auth');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        cookies.remove('user-auth');
        closeMenu();
        window.location.href = '/'; 
    };

    return (
        <nav>
            <div className='logo-container'>
                <Link to='/' className='logo-link'>
                    <img className='logo' src='/img/movieFinder.svg' alt='logo diez media'/>
                </Link>
            </div>
            
            <button className='hamburger' onClick={toggleMenu} aria-label='Menu'>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`main-nav ${menuOpen ? 'active' : ''}`}>
                <li><Link to='/' onClick={closeMenu}> Home </Link></li>
                <li><Link to='/favoritos' onClick={closeMenu}> Favoritos </Link></li>
                <li><Link to='/populares' onClick={closeMenu}> Peliculas populares </Link></li>
                <li><Link to='/cartel' onClick={closeMenu}> Peliculas en cartel </Link></li>
                {userAuth ? (
                    <li><a href="/" onClick={handleLogout}> Logout </a></li>
                ) : (
                    <React.Fragment>
                        <li><Link to='/login' onClick={closeMenu}> Login </Link></li>
                        <li><Link to='/register' onClick={closeMenu}> Register </Link></li>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    )
}

export default Navbar