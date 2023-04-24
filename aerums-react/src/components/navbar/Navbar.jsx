import React from "react";
import Logo from "../logo/Logo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const logOut = () => {
    localStorage.clear();
    setAuth({});
  };

  return (
    <>
      {auth?.userName ? (
        <div className="navbarContainer">
          <div className="navbarLogo">
            <Logo />
          </div>
          <div className="navbarWelcome">
            <h1>Välkommen</h1>
          </div>
          <div className="navbarTop">
            <NavLink className="nav_Link" to="/construction">
              Kalender
            </NavLink>
            <NavLink className="nav_Link" to="/construction">
              Vänner
            </NavLink>
            <NavLink className="nav_Link" to="/construction">
              Lediga tider
            </NavLink>
            <NavLink className="nav_Link" to="/construction">
              Bokningar
            </NavLink>
            <NavLink className="nav_Link" to="/construction">
              Profil
            </NavLink>
            <NavLink className="nav_Link" to="/construction">
              Aktiviteter
            </NavLink>
            <NavLink className="nav_Link" onClick={logOut} to="/">
              Logga ut
            </NavLink>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navbar;
