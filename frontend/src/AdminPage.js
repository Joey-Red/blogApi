import React, { useState, useEffect } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

function AdminPage() {
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [listOfPublishedPosts, setListOfPublishedPosts] = useState([{}]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [currentUser, setCurrentUser] = useState("");

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
    });
  }, []);
  let deletePost = (e) => {
    Axios.post("http://localhost:8080/deletePost", {
      postId: e.target.value,
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
          <>
            {listOfPosts.map((post) => {
              return (
                <div className="apPost" key={post._id}>
                  Username: {post.user} Title: {post.title}
                  Body: {post.body}
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
                            <div className="commentBody">{comments.body}</div>
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
              );
            })}
          </>
        </div>
      </div>
      <h1 className="apPublished">Published Posts</h1>
      <div className="apLayoutContainer">
        <div className="apPostContainer">
          <>
            {listOfPublishedPosts.map((post) => {
              return (
                <>
                  <div className="apPost" key={post._id}>
                    Username: {post.user} Title: {post.title}
                    Body: {post.body}
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
                              <div className="commentBody">{comments.body}</div>
                              <div className="commentBottom">
                                {comments.username.length === 0 ? (
                                  <>Anon</>
                                ) : (
                                  <>{comments.username}</>
                                )}
                              </div>
                              <button>Delete Comment</button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="noReplies">No Replies</div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
