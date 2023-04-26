import React from "react";
import Logo from "../logo/Logo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const usersName = auth.userName;

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
        <h4>{usersName}</h4>
      </div>
      <div className="navbarContent">
        <NavLink className="nav_Link" exact to="/calendar" activeClassName="active">
          Kalender
        </NavLink>
        <NavLink className="nav_Link" exact to="/construction" activeClassName="active">
          Vänner
        </NavLink>
        <NavLink className="nav_Link" to="/freetime" activeClassName="active">
          Lediga tider
        </NavLink>
        <NavLink className="nav_Link" to="/construction" activeClassName="active">
          Bokningar
        </NavLink>
        <NavLink className="nav_Link" to="/construction" activeClassName="active">
          Profil
        </NavLink>
        <NavLink className="nav_Link" to="/construction" activeClassName="active">
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
