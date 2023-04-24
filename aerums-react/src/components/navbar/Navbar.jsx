import React from "react";
import Logo from "../logo/Logo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const {auth, setAuth } = useAuth();

  const logOut = () => {
    localStorage.clear();
    setAuth({});
  };

  return (
    <>
    {auth?.userName ?(
    <div className="navbarContainer">
      <div className="navbarLogo">
        <Logo />
      </div>
      <div className="navbarWelcome">
        <h1>Välkommen</h1>
      </div>
      <div className="navbarContent">
        <NavLink className="nav_Link" exact to="/calendar" activeClassName="active">
          Kalender
        </NavLink>
        <NavLink className="nav_Link" exact to="/home" activeClassName="active">
          Vänner
        </NavLink>
        <NavLink className="nav_Link" to="/home" activeClassName="active">
          Lediga tider
        </NavLink>
        <NavLink className="nav_Link" to="/home" activeClassName="active">
          Bokningar
        </NavLink>
        <NavLink className="nav_Link" to="/home" activeClassName="active">
          Profil
        </NavLink>
        <NavLink className="nav_Link" to="/home" activeClassName="active">
          Aktiviteter
        </NavLink>
        <NavLink className="nav_Link logOutBtn" onClick={logOut} to="/">
          Logga ut
        </NavLink>
      </div>
    </div>
    ):(
    <div></div>
    )}
    </>
  );
};

export default Navbar;
