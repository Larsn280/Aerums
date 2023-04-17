import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HeroSection from '../heroSection/HeroSection';

function Home() {
  const { setAuth } = useAuth();

  const logOut = () => {
    localStorage.clear();
    setAuth({});
  };
  return (
    <>
      <h1 className="page-title">AERUMS</h1>
      <div className="instructions">
        <div>
          <HeroSection />
        </div>
      </div>
      <NavLink onClick={logOut} to="/login">
        <button>Logga ut</button>
      </NavLink>
    </>
  );
}

export default Home;
