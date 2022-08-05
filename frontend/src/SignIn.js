import React, { useEffect, useState } from "react";
import NavbarSecondary from "./Components/NavbarSecondary";
import Axios from "axios";

function SignIn() {
  const [logInPw, setLogInPw] = useState("");
  const [logInPwConfirm, setLogInPwConfirm] = useState("");
  const [logInUsername, setLogInUsername] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [conditionsMet, setConditionsMet] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      window.location.href = "/createPost";
    }
  }, []);

  useEffect(() => {
    document.getElementById("badLogin").style.display = "none";
  }, [logInUsername, logInPw, logInPwConfirm]);

  // Log In
  const logIn = () => {
    Axios.post("https://fish-blog-api-server.herokuapp.com/log-in", {
      username: logInUsername,
      password: logInPw,
    })
      .then((res) => {
        setCurrentUser(res.data.user.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user.username);
        window.location.href = "/createPost";
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          document.getElementById("badLogin").style.display = "flex";
        }
      });
  };

  useEffect(() => {
    if (
      logInUsername !== "" &&
      logInPw !== "" &&
      logInPwConfirm !== "" &&
      logInPw === logInPwConfirm
    ) {
      setConditionsMet(true);
    } else {
      setConditionsMet(false);
    }
  }, [logInUsername, logInPw, logInPwConfirm]);

  return (
    <div className="makePostContainer">
      <>
        <NavbarSecondary currentUser={currentUser} />
        {currentUser.length === 0 ? (
          <>
            <div className="logIn">
              <div className="h1">Log In</div>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => {
                  setLogInUsername(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setLogInPw(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => {
                  setLogInPwConfirm(e.target.value);
                }}
              />
              <button
                className="logInButton"
                disabled={!conditionsMet}
                onClick={logIn}
              >
                Submit
              </button>
              <div className="badLogin" id="badLogin">
                Invalid log in credentials.
              </div>
              <a className="backButton" href="/">
                Back Home
              </a>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  );
}

export default SignIn;
