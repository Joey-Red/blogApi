import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Components/Navbar";
import Fish from "./img/fishOutline.png";

function App() {
  const [listOfUsers, setListOfUsers] = useState([{}]);
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [logInPw, setLogInPw] = useState("");
  const [logInPwConfirm, setLogInPwConfirm] = useState("");
  const [logInUsername, setLogInUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentName, setCommentName] = useState("");
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [publishStatus, setPublishStatus] = useState(false);
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
  // Fetch Users
  // useEffect(() => {
  //   Axios.get("http://localhost:8080/getUsers").then((res) => {
  //     setListOfUsers(res.data);
  //   });
  // }, []);

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

  // Submit Post
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
    ).then((res) => {
      setListOfPosts([...listOfPosts, { postTitle, postBody, username }]);
    });
  };
  // Create User
  const createUser = () => {
    Axios.post("http://localhost:8080/sign-up", {
      username: username,
      password: password,
    }).then((res) => {
      setListOfUsers([...listOfUsers, { username }]);
    });
  };
  // Delete Post
  let deletePost = (e) => {
    Axios.post("http://localhost:8080/deletePost", {
      postId: e.target.value,
    });
  };
  // Add comment to post
  let addComment = (e) => {
    Axios.post("http://localhost:8080/comment", {
      commentingOnId: e.target.value,
      username: commentName,
      title: commentTitle,
      body: commentBody,
    });
  };
  let editPost = (e) => {
    Axios.post("http://localhost:8080/editPost", {
      updateId: e.target.value,
      postTitle: postTitle,
      postBody: postBody,
      username: currentUser,
    });
  };

  const handleChange = (e) => {
    setPublishStatus(e.target.checked);
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
            {listOfPosts.map((post) => {
              return (
                <div key={post._id} className="blogPost">
                  <div className="blogTitle">{post.title}</div>
                  <div className="blogBody">{post.body}</div>
                  <div className="blogUser">{post.user}</div>

                  {/* {currentUser.length > 0 && post.user === currentUser ? (
                    <div className="editPost">
                      <button onClick={deletePost} value={post._id}>
                        X
                      </button>
                      <div className="h1">Edit Post Form</div>
                      <input
                        type="text"
                        placeholder="title"
                        onChange={(e) => {
                          setPostTitle(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="so this one time.."
                        onChange={(e) => {
                          setPostBody(e.target.value);
                        }}
                      />
                      <button onClick={editPost} value={post._id}>
                        EDIT
                      </button>
                    </div>
                  ) : null} */}
                  {/* <div>
                    {postsLoaded && post.comments.length > 0 ? (
                      post.comments.map((comments) => {
                        return (
                          <div>
                            <div>Title: {comments.title}</div>
                            <div>Body: {comments.body}</div>
                            <div>Username: {comments.username}</div>
                          </div>
                        );
                      })
                    ) : (
                      <>No Replies? Add a comment</>
                    )}
                  </div> */}
                  {/* <div className="addComment">
                    <input
                      type="text"
                      placeholder="title (optional) "
                      onChange={(e) => {
                        setCommentTitle(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="share your thoughts"
                      onChange={(e) => {
                        setCommentBody(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="name (optional)"
                      onChange={(e) => {
                        setCommentName(e.target.value);
                      }}
                    />
                    <button onClick={addComment} value={post._id}>
                      Submit Comment
                    </button>
                  </div> */}
                </div>
              );
            })}
          </div>
          {/* {currentUser.length > 0 ? (
            <div className="createPost">
              <form className="createPostForm">
                <div className="createPostInner">
                  <div className="createPostTitle">Create Post</div>
                  <div className="titleInput">
                    <input
                      type="text"
                      placeholder="Title"
                      onChange={(e) => {
                        setPostTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="bodyInput">
                    <input
                      type="text"
                      placeholder="So this one time.."
                      onChange={(e) => {
                        setPostBody(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="publish">Publish</label>
                    <input
                      type="checkbox"
                      name="publish"
                      id="publish"
                      checked={publishStatus}
                      onChange={handleChange}
                    />
                    <button onClick={submitPost}>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <></>
          )} */}
          <footer className="footer">
            You've reached the end of my posts for now. Please feel free to{" "}
            <a href="/about">check me out!</a>
            <img className="fishImage" src={Fish} alt="Fish" />
          </footer>
        </div>
      </>
    </div>
  );
}

export default App;
