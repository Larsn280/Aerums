import Friends from "../../images/Friends.jpg";

import "./UnderConstruction.css";

function UnderConstruction() {
  return (
    <div className="constructionContainer">
      <div className="constructionDiv">
        <h1>FUNKTIONEN KOMMER SNART!</h1>
        <div className="constructionImageDiv">
          <img
            className="constructionImage"
            src={Friends}
            alt="ConstructionImage"
          />
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
