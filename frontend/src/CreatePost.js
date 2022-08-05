import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Components/NavbarSecondary";
function CreatePost(props) {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [publishStatus, setPublishStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    localStorage.getItem("user");
    setCurrentUser(localStorage.getItem("user"));
  }, []);

  const handleChange = (e) => {
    setPublishStatus(e.target.checked);
  };
  //Log out
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const submitPost = () => {
    Axios.post(
      "https://fish-blog-api-client.herokuapp.com/create-post",
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
  return (
    <div className="makePostContainer">
      <Navbar currentUser={currentUser} />

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
        <a className="backButton" href="/">
          Back Home
        </a>
        <a className="backButton" href="/adminPage">
          Admin Page
        </a>
      </div>
    </div>
  );
}

export default CreatePost;
