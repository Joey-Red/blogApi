import React from "react";
import Fish from "../img/fishOutline.png";
function Navbar(props) {
  let { currentUser } = props;
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div className="navContainer">
        {currentUser ? (
          <>
            <div className="currentUser">Logged In as {currentUser}</div>
            <a href="/adminPage" className="navLink">
              Admin Page
            </a>
            <button onClick={logOut}>Log Out</button>
          </>
        ) : (
          <>
            <div>Fish's Blog</div>
          </>
        )}
        <img className="fishImage" src={Fish} alt="Fish" />
      </div>
      <div className="navUnder"></div>
    </>
  );
}

export default Navbar;
