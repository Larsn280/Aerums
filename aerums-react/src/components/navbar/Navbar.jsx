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
            <NavLink className="nav_Link" to="/">
              Kalender
            </NavLink>
            <NavLink className="nav_Link" to="/">
              Vänner
            </NavLink>
            <NavLink className="nav_Link" to="/">
              Lediga tider
            </NavLink>
            <NavLink className="nav_Link" to="/">
              Bokningar
            </NavLink>
            <NavLink className="nav_Link" to="/">
              Profil
            </NavLink>
            <NavLink className="nav_Link" to="/">
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
