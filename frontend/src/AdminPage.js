import React, { useState, useEffect } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AdminPage() {
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [listOfPublishedPosts, setListOfPublishedPosts] = useState([{}]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [currentUser] = useState("");
  const [listOfComments, setListOfComments] = useState([{}]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    Axios.get("https://fish-blog-api-server.herokuapp.com/adminPosts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (res.data === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/signIn";
        } else {
          setListOfPosts(res.data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    Axios.get(
      "https://fish-blog-api-server.herokuapp.com/adminPostsPublished",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
      .then((res) => {
        if (res.data === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/signIn";
        } else {
          setListOfPublishedPosts(res.data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    Axios.get("https://fish-blog-api-server.herokuapp.com/getComments")
      .then((res) => {
        if (res.data === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/signIn";
        } else {
          setListOfComments(res.data);
          setCommentsLoaded(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   Axios.get("https://fish-blog-api-server.herokuapp.com/adminPosts", {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   }).then((res) => {
  //     setListOfPosts(res.data);
  //     console.log(res.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   Axios.get("https://fish-blog-api-server.herokuapp.com/adminPostsPublished", {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   }).then((res) => {
  //     setListOfPublishedPosts(res.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   Axios.get("https://fish-blog-api-server.herokuapp.com/getComments").then((res) => {
  //     setListOfComments(res.data);
  //     setCommentsLoaded(true);
  //   });
  // }, []);
  let deletePost = (e) => {
    Axios.post("https://fish-blog-api-server.herokuapp.com/deletePost", {
      postId: e.target.value,
    });
    alert("Request to delete post submitted.");
  };
  let deleteComment = (e) => {
    Axios.post("https://fish-blog-api-server.herokuapp.com/deleteComment", {
      commentId: e.target.value,
    });
    alert("Request to delete comment submitted.");
  };
  let publishPost = (e) => {
    Axios.post("https://fish-blog-api-server.herokuapp.com/publishPost", {
      postId: e.target.value,
    });
    alert("Request to publish post submitted.");
  };
  let unpublishPost = (e) => {
    Axios.post("https://fish-blog-api-server.herokuapp.com/unpublishPost", {
      postId: e.target.value,
    });
    alert("Request to unpublish post submitted.");
  };
  let editPost = (e) => {
    Axios.post("https://fish-blog-api-server.herokuapp.com/editPost", {
      updateId: e.target.value,
      postTitle: postTitle,
      postBody: postBody,
      username: currentUser,
    });
    alert("Request to edit post submitted.");
  };
  return (
    <div className="adminPageContainer">
      <header className="adminPageHeader">
        <h3>Admin Page</h3>{" "}
      </header>
      <a className="backButtonAP" href="/">
        Back Home
      </a>
      <h1 className="apUnpublished">Unpublished Posts</h1>
      <div className="apLayoutContainer">
        <div className="apPostContainer">
          <div className="masonryContainer" id="masonryContainer">
            {listOfPosts.map((post) => {
              return (
                <div className="apPost" key={uuidv4()}>
                  <div className="apUser">Username: {post.user}</div>
                  <div className="apTitle">Title: {post.title}</div>
                  <div className="apBody">Body: {post.body}</div>
                  <div className="editPost">
                    <button onClick={deletePost} value={post._id}>
                      Delete Post
                    </button>
                    <button onClick={publishPost} value={post._id}>
                      Publish!
                    </button>
                    <div className="h1">Edit Post Form</div>
                    <input
                      type="text"
                      placeholder="title"
                      onChange={(e) => {
                        setPostTitle(e.target.value);
                      }}
                    />
                    <textarea
                      type="text"
                      placeholder="so this one time.."
                      onChange={(e) => {
                        setPostBody(e.target.value);
                      }}
                    />
                    <button onClick={editPost} value={post._id}>
                      Submit Changes
                    </button>
                  </div>
                  <div className="apCommentDetailsContainer">
                    {commentsLoaded ? (
                      listOfComments.map((comments) => {
                        if (comments.commentingOnId === post._id) {
                          return (
                            <div key={comments._id} className="commentDetails">
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
                                    {comments.commentingOnId === post._id &&
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
                          return null;
                        }
                      })
                    ) : (
                      <div className="noReplies">No Replies</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <h1 className="apPublished">Published Posts</h1>
      <div className="apLayoutContainer">
        <div className="apPostContainer">
          <div className="masonryContainer2" id="masonryContainer2">
            {listOfPublishedPosts.map((post) => {
              return (
                <div key={uuidv4()}>
                  <div className="apPost">
                    <div className="apUser">Username: {post.user}</div>
                    <div className="apTitle">Title: {post.title}</div>
                    <div className="apBody">Body: {post.body}</div>
                    <div className="editPost">
                      <button onClick={deletePost} value={post._id}>
                        Delete Post
                      </button>
                      <button onClick={unpublishPost} value={post._id}>
                        unPublish!
                      </button>
                      <div className="h1">Edit Post Form</div>
                      <input
                        type="text"
                        placeholder="title"
                        onChange={(e) => {
                          setPostTitle(e.target.value);
                        }}
                      />
                      <textarea
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
                    <div className="apCommentDetailsContainer">
                      {commentsLoaded ? (
                        listOfComments.map((comments) => {
                          if (comments.commentingOnId === post._id) {
                            return (
                              <div
                                // changed key
                                key={comments._id}
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
                                      {comments.commentingOnId === post._id &&
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
                                <button
                                  className="deleteComment"
                                  value={comments._id}
                                  onClick={deleteComment}
                                >
                                  Delete Comment
                                </button>
                              </div>
                            );
                          } else {
                            return null;
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
