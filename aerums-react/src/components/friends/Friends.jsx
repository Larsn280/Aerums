import UnderConstruction from "../underConstruction/UnderConstruction";
import "./Friends.css";

function Friends() {
  return (
    <>
      <div className="friendsContainer">
        <h1>Vänner</h1>
        <p>
          En översikt över alla dina vänner
          <br />
          plus annat kul
        </p>
        <UnderConstruction />
      </div>
    </>
  );
}

export default Friends;
