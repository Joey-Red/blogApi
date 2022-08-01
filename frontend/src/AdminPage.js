import React, { useState, useEffect } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AdminPage() {
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [pubPostsLoaded, setPubPostsLoaded] = useState(false);
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [listOfPublishedPosts, setListOfPublishedPosts] = useState([{}]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [listOfComments, setListOfComments] = useState([{}]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8080/adminPosts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      setListOfPosts(res.data);
      setPostsLoaded(true);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:8080/adminPostsPublished", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => {
      setListOfPublishedPosts(res.data);
      setPubPostsLoaded(true);
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
  let deletePost = (e) => {
    Axios.post("http://localhost:8080/deletePost", {
      postId: e.target.value,
    });
  };
  let deleteComment = (e) => {
    Axios.post("http://localhost:8080/deleteComment", {
      commentId: e.target.value,
    });
  };
  let publishPost = (e) => {
    Axios.post("http://localhost:8080/publishPost", {
      postId: e.target.value,
    });
  };
  let unpublishPost = (e) => {
    Axios.post("http://localhost:8080/unpublishPost", {
      postId: e.target.value,
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
  return (
    <div className="adminPageContainer">
      <header className="adminPageHeader">Admin Page</header>
      <h1 className="apUnpublished">Unpublished Posts</h1>
      <div className="apLayoutContainer">
        <div className="apPostContainer">
          <div className="masonryContainer" id="masonryContainer">
            {listOfPosts.map((post) => {
              return (
                <div className="apPost" key={post._id}>
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
                      EDIT
                    </button>
                  </div>
                  <div className="apCommentDetailsContainer">
                    {commentsLoaded ? (
                      listOfComments.map((comments) => {
                        if (comments.commentingOnId === post._id) {
                          return (
                            <div key={uuidv4()} className="commentDetails">
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
                          <></>;
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
                <>
                  <div className="apPost" key={post._id}>
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
                              <div key={uuidv4()} className="commentDetails">
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
                            <></>;
                          }
                        })
                      ) : (
                        <div className="noReplies">No Replies</div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
