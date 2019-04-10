import React from "react";
import BackgroundImage from "../images/bcg-0.jpg";

const Homepage = () => {
  return (
    <div>
      <div id="main-image">
        <h2>SendIT, Bringing your Parcels to your doorstep...</h2>
        <img src={BackgroundImage} alt="Welcome to SendIT!" />
      </div>
    </div>
  );
};

export default Homepage;
