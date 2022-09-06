import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'


function Navbar(props){
    return (
        <nav>
            <ul className="main-nav">
                <li><Link to='/'> Home </Link></li>
                <li><Link to='/favoritos'> Favoritos </Link></li>
                <li><img className='logo'src='/img/movieFinder.svg' alt='logo diez media'/> </li>
                <li><Link to='/populares'> Peliculas populares </Link></li>
                <li><Link to='/cartel'> Peliculas en cartel </Link></li>
            </ul>
        </nav>
    )
}

export default Navbar