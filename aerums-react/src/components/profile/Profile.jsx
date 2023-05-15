import { useState, useEffect } from "react";
import underConstruction from "../../images/UnderConstruction.jpg";
import ProfileImage from "./ProfileImage";
import useAuth from "../hooks/useAuth";
import "./Profile.css";

function Profile() {
  const { auth } = useAuth();
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [address, SetAddress] = useState("");
  const [postalNr, SetPostalNr] = useState("");
  const [county, SetCounty] = useState("");
  const [profileImage, SetProfileImage] = useState(underConstruction);

  useEffect(() => {
    fetchLoggedInUser(auth.userName);
  }, [auth.userName]);

  const fetchLoggedInUser = async (userName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/users/${userName}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      SetFirstName(data.firstName);
      SetLastName(data.lastName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeFirstName = (e) => {};

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      SetProfileImage(URL.createObjectURL(e.target.files[0]));
      console.log(profileImage);
    }
  };

  const saveProfileInfo = (e) => {
    e.preventDefault();
    const profileImageInput = document.getElementById("profileImage");
    const selectedImage = profileImageInput.files[0];

    if (selectedImage) {
      // Perform the necessary logic to save the image (e.g., upload to server)
      console.log("Selected profile image:", selectedImage);
      // ... additional code to save the image ...
    }
  };

  return (
    <>
      <div className="profileContainer">
        <h1>Profile</h1>
        <p>Här kan du ändra din profil</p>
      </div>
      <div className="profileImageContainer">
        <label>
          <img src={profileImage} alt="profileImage" className="profileImage" />
          <input
            type="file"
            id="profileImage"
            name="myfile"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
      </div>
      <section className="form-containerProfile">
        <section className="form-wrapperProfile">
          <form onSubmit={saveProfileInfo}>
            <div className="profileLableDiv">
              <label>Förnamn:</label>
            </div>
            <div className="form-controlProfile">
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="profileLableDiv">
              <label>Efternamn:</label>
            </div>
            <div className="form-controlProfile">
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="profileLableDiv">
              <label>Adress:</label>
            </div>
            <div className="form-controlProfile">
              <input
                id="address"
                type="text"
                value={address}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="profileLableDiv">
              <label>PostNr:</label>
            </div>
            <div className="form-controlProfile">
              <input
                id="postalNr"
                type="text"
                value={postalNr}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="profileLableDiv">
              <label>Ort:</label>
            </div>
            <div className="form-controlProfile">
              <input
                id="county"
                type="text"
                value={county}
                onChange={handleChangeFirstName}
              />
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
