import { useState } from "react";
import ProfileImage from "./ProfileImage";
import useAuth from "../hooks/useAuth";
import "./Profile.css";

function Profile() {
  const { auth } = useAuth();
  const [firstName, SetFirstName] = useState("Lars");
  const [lastName, SetLastName] = useState("Norman");
  const [address, SetAddress] = useState("Kanonvagen");
  const [postalNr, SetPostalNr] = useState("123456");
  const [county, SetCounty] = useState("Älvdalen");

  return (
    <>
      <div className="profileContainer">
        <h1>Profile</h1>
        <p>Här kan du ändra din profil</p>
      </div>
      <ProfileImage />
      <section className="form-containerProfile">
        <section className="form-wrapperProfile">
          <form onSubmit={""}>
            <div className="profileLableDiv">
              <label>Förnamn:</label>
            </div>
            <div className="form-controlProfile">
              <input id="firstName" type="text" value={firstName} />
            </div>
            <div className="profileLableDiv">
              <label>Efternamn:</label>
            </div>
            <div className="form-controlProfile">
              <input id="lastName" type="text" value={lastName} />
            </div>
            <div className="profileLableDiv">
              <label>Adress:</label>
            </div>
            <div className="form-controlProfile">
              <input id="address" type="text" value={address} />
            </div>
            <div className="profileLableDiv">
              <label>PostNr:</label>
            </div>
            <div className="form-controlProfile">
              <input id="postalNr" type="text" value={postalNr} />
            </div>
            <div className="profileLableDiv">
              <label>Ort:</label>
            </div>
            <div className="form-controlProfile">
              <input id="county" type="text" value={county} />
            </div>
            <div className="submitProfileDiv">
              <button type="submit">Spara</button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default Profile;
