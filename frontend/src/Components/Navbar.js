import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
function NavbarSecondary(props) {
  let date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  return (
    <>
      <div className="navContainer">
        <div className="navLayer">
          <div className="myName">Joey Dalrymple</div>
          <div className="navInner">
            <a href="https://github.com/Joey-Red">
              <FontAwesomeIcon icon={faGithub} />
            </a>{" "}
            <a href="https://twitter.com/JoeyDalrymple_">
              {" "}
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        <div className="attentionOuter">
          <div className="attention">
            <div className="date">{date}</div>
            <p className="articleTitle">Thank you for visiting my blog.</p>
            <p className="articleBody">
              I don't actually plan on blogging, this is just to hone my design
              skills and incorporate many different technologies into this
              project, such as the MERN stack, along with Axios, JWT, Bcrypt,
              Passport, Router, SASS and more.
            </p>
          </div>
          <a href="/signIn">
            <div className="workPic"></div>
          </a>
          <div className="design"></div>
        </div>
      </div>
    </>
  );
}

export default NavbarSecondary;
