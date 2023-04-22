import React from 'react';
import Logo from '../logo/Logo'
import './Navbar.css'
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navbarContainer'>
            <div className='navbarLogo'>
                <Logo/>
            </div>
            <div className='navbarWelcome'>
                <h1>Välkommen</h1>
            </div>
            <div className='navbarTop'>
                <NavLink className="nav_Link" to="/home">Kalender</NavLink>
                <NavLink className="nav_Link" to="/home">Vänner</NavLink>
                <NavLink className="nav_Link" to="/home">Lediga tider</NavLink>
                <NavLink className="nav_Link" to="/home">Bokningar</NavLink>
                <NavLink className="nav_Link" to="/home">Profil</NavLink>
                <NavLink className="nav_Link" to="/home">Aktiviteter</NavLink>
                <NavLink className="nav_Link" to="/home">Logga ut</NavLink>
            </div>
        </div>
    );
}

export default Navbar;
