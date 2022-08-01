import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AddComment from "./AddComment";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [listOfUsers, setListOfUsers] = useState([{}]);
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [listOfComments, setListOfComments] = useState([{}]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  useEffect(() => {
    Axios.get("http://localhost:8080/getComments").then((res) => {
      setListOfComments(res.data);
      setCommentsLoaded(true);
      if (localStorage.getItem("user").length > 0) {
        setCurrentUser(localStorage.getItem("user"));
      }
    });
  }, []);

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
                          {commentsLoaded ? (
                            listOfComments.map((comments) => {
                              if (comments.commentingOnId === post._id) {
                                return (
                                  <div
                                    key={uuidv4()}
                                    className="commentDetails"
                                  >
                                    {comments.commentingOnId === post._id &&
                                    comments.title.length !== 0 ? (
                                      <>{comments.title}</>
                                    ) : (
                                      <></>
                                    )}
                                    {comments.commentingOnId === post._id ? (
                                      <>
                                        <div className="commentBody">
                                          {comments.body}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {comments.commentingOnId === post._id ? (
                                      <>
                                        <div className="commentBottom">
                                          {comments.commentingOnId ===
                                            post._id &&
                                          comments.username.length !== 0 ? (
                                            <>{comments.username}</>
                                          ) : (
                                            <>Anon</>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                );
                              } else {
                                <></>;
                              }
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
