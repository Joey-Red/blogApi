import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AddComment from "./AddComment";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [listOfUsers, setListOfUsers] = useState([{}]);
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [logInPw, setLogInPw] = useState("");
  const [logInPwConfirm, setLogInPwConfirm] = useState("");
  const [logInUsername, setLogInUsername] = useState("");
  const [addComment, setAddComment] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setCurrentUser(localStorage.getItem("user"));
    }
  }, []);

  // Fetch Posts
  useEffect(() => {
    Axios.get("http://localhost:8080/getPosts").then((res) => {
      setListOfPosts(res.data);
      setPostsLoaded(true);
      if (localStorage.getItem("user").length > 0) {
        setCurrentUser(localStorage.getItem("user"));
      }
    });
  }, []);

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
  //Log out
  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  // };

  // Create User
  const createUser = () => {
    Axios.post("http://localhost:8080/sign-up", {
      username: username,
      password: password,
    }).then((res) => {
      setListOfUsers([...listOfUsers, { username }]);
    });
  };

  let readMore = (e) => {
    document.getElementById(e.target.value).style.display = "inline";
    document.getElementById(e.target.value + "readmore").style.display = "none";
  };
  let showCommentInput = (e) => {
    if (
      document
        .getElementById(e.target.value + "comment")
        .classList.contains("show")
    ) {
      document.getElementById(e.target.value + "comment").style.display =
        "none";
      document
        .getElementById(e.target.value + "comment")
        .classList.toggle("show");
    } else {
      document.getElementById(e.target.value + "comment").style.display =
        "flex";
      document
        .getElementById(e.target.value + "comment")
        .classList.toggle("show");
    }
  };
  return (
    <div className="App">
      <>
        <Navbar currentUser={currentUser} />
        <>
          {currentUser.length === 0 ? (
            <>
              {/* <div className="h1">Sign Up</div>
              <div className="createUser">
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="confirm password"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
                <button onClick={createUser}>Submit</button>
              </div> */}

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
                <button onClick={logIn}>Submit</button>
              </div>
            </>
          ) : (
            <></>
          )}
        </>

        <div className="layoutContainer">
          <div className="postContainer">
            {postsLoaded ? (
              <>
                {listOfPosts.map((post) => {
                  return (
                    <div key={post._id} className="blogPost">
                      <div className="blogTitle">{post.title}</div>
                      {post.body.length > 300 ? (
                        <div className="blogBody">
                          {post.body.substring(0, 300)}{" "}
                          <button
                            value={post._id}
                            className="readMore"
                            onClick={readMore}
                            id={post._id + "readmore"}
                          >
                            read more
                          </button>
                          <div className="finishPost" id={post._id}>
                            {post.body.substring(301)}
                          </div>
                        </div>
                      ) : (
                        <div className="blogBody">{post.body}</div>
                      )}
                      <div className="blogUser">{post.user}</div>
                      <div className="showAddComments">
                        <div className="showCommentInputContainer">
                          <button
                            className="showCommentInputButton"
                            value={post._id}
                            onClick={showCommentInput}
                          >
                            Add Comment
                          </button>
                          <div
                            className="addCommentContainer"
                            id={post._id + "comment"}
                          >
                            <AddComment post={post} />
                          </div>
                        </div>
                        <div className="commentDetailsContainer">
                          {postsLoaded && post.comments.length > 0 ? (
                            post.comments.map((comments) => {
                              return (
                                <div key={uuidv4()} className="commentDetails">
                                  {comments.title.length === 0 ? (
                                    <></>
                                  ) : (
                                    <>{comments.title}</>
                                  )}
                                  <div className="commentBody">
                                    {comments.body}
                                  </div>
                                  <div className="commentBottom">
                                    {comments.username.length === 0 ? (
                                      <>Anon</>
                                    ) : (
                                      <>{comments.username}</>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="noReplies">No Replies</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
          <Footer />
        </div>
      </>
    </div>
  );
}

export default App;
