import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../logo/Logo";

function Home() {
  const { auth } = useAuth();

  return (
    <>
      <div className="homeContainer">
        <h1 className="page-title">Välkommen till</h1>
        <div className="logoDiv">
          <Logo />
        </div>
        <div className="homePageInfo">
          <p>Hitta tiden för vänskap!</p>
          <p>
            Trött på att aldrig hitta tid för att umgås med dina bästa vänner?
          </p>
          <p>Glöm bökiga WhatsApp-grupper och timmar av planerande!</p>
          <p>Vi har lösningen:</p>
          <p>
            En sida där du kan enkelt lägga till tider när du är ledig för att
            träffa dina vänner. Skicka sedan en förfrågan till dina vänner och
            vi hittar den perfekta matchningen på era lediga tider.
          </p>
          <p>Så varför vänta?</p>
          <p>
            Logga in nu och börja planera roliga stunder med dina
            favoritmänniskor
          </p>
        </div>
        {auth?.userName ? (
          <div></div>
        ) : (
          <div>
            <NavLink to="/login">
              <button className="grayBtn">Logga in</button>
            </NavLink>
            <NavLink to="/register">
              <button className="grayBtn">Bli medlem!</button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
