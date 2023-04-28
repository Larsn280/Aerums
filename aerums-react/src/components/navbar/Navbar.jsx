import React, {useState} from "react";
import Logo from "../logo/Logo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const [isExpended, setExpandedState] = useState(false)
  const usersName = auth.userName;

  const logOut = () => {
    localStorage.clear();
    setAuth({});
  };

  return (
    <>
    {auth?.userName ?(
      <div><button className="hamburger" onClick={() => setExpandedState(!isExpended)} title="Meny"><i className="fa fa-reorder"></i></button>
    <div className={ isExpended? "navbarContainer-in" : "navbarContainer"}>
      <div className="navbarLogo">
        <Logo />
      </div>
      <div className="navbarWelcome">
        <h1>Välkommen</h1>
        <h4>{usersName}</h4>
      </div>
      <div className="navbarContent">
        <NavLink className="nav_Link" to="/calendar" activeClassName="active">
        <i className="fa fa-calendar"></i> Kalender
        </NavLink>
        <NavLink className="nav_Link" to="/construction" activeClassName="active">
        <i className="fa fa-group"></i> Vänner
        </NavLink>
        <NavLink className="nav_Link" to="/freetime" activeClassName="active">
        <i className="fa fa-smile-o"></i> Lediga tider
        </NavLink>
        <NavLink className="nav_Link" to="/booking" activeClassName="active">
        <i className="fa fa-book"></i> Bokningar
        </NavLink>
        <NavLink className="nav_Link" to="/construction" activeClassName="active">
        <i className="fa fa-user-circle-o"></i> Profil
        </NavLink>
        <NavLink className="nav_Link" to="/construction" activeClassName="active">
        <i className="fa fa-tree"></i> Aktiviteter
        </NavLink>
        <NavLink className="nav_Link logOutBtn" onClick={logOut} to="/">
        <i className="fa fa-close"></i> Logga ut
        </NavLink>
      </div>
    </div>
    </div>
    ):(
    <div></div>
    )}
    </>
  );
};

export default Navbar;
