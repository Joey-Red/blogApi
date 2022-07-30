import React from "react";
import Fish from "../img/fishOutline.png";

function Footer() {
  return (
    <footer className="footer">
      You've reached the end of my posts for now. Please feel free to{" "}
      <a href="https://github.com/Joey-Red">check out my work!</a>
      <img className="fishImage" src={Fish} alt="Fish" />
    </footer>
  );
}

export default Footer;
