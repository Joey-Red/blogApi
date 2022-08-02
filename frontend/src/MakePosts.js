import React, { useEffect, useState } from "react";
import NavbarSecondary from "./Components/NavbarSecondary";
import Axios from "axios";

function MakePosts() {
  const [username, setUsername] = useState("");
  const [logInPw, setLogInPw] = useState("");
  const [logInPwConfirm, setLogInPwConfirm] = useState("");
  const [logInUsername, setLogInUsername] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [conditionsMet, setConditionsMet] = useState(false);
  const [publishStatus, setPublishStatus] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const handleChange = (e) => {
    setPublishStatus(e.target.checked);
  };
  // Log In
  const logIn = () => {
    Axios.post("http://localhost:8080/log-in", {
      username: logInUsername,
      password: logInPw,
    }).then((res) => {
      setCurrentUser(res.data.user.username);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.username);
    });
  };
  const submitPost = () => {
    Axios.post(
      "http://localhost:8080/create-post",
      {
        postTitle: postTitle,
        postBody: postBody,
        username: currentUser,
        publishStatus: publishStatus,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    window.location.href = "/signIn";
  };
  //Log out
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
              <a className="backButton" href="/">
                Back Home
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="createPost">
              <div className="h1">Create Post</div>
              <input
                className="mpField"
                type="text"
                placeholder="title"
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
              />
              <textarea
                className="mpField mpTextArea"
                type="text"
                placeholder="so this one time.."
                onChange={(e) => {
                  setPostBody(e.target.value);
                }}
              />

              <div>
                <label htmlFor="publish">Publish</label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="publish"
                  id="publish"
                  checked={publishStatus}
                  onChange={handleChange}
                />
              </div>

              <button onClick={submitPost}>Submit</button>
              <div className="logOut">
                <div>Log Out</div>
                <button onClick={logOut}>Log out</button>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default MakePosts;
