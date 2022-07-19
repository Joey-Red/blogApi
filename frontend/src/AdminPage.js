import React, { useState, useEffect } from "react";
import Axios from "axios";

function AdminPage() {
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
    <div>
      <div>Admin Page</div>
      <h1>Unpublished Posts</h1>
      {listOfPosts.map((post) => {
        return (
          <div key={post._id}>
            Username: {post.user} Title: {post.title}
            Body: {post.body}
            <div className="editPost">
              <button onClick={deletePost} value={post._id}>
                X
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
                <>No Replies</>
              )}
            </div> */}
          </div>
        );
      })}
      <h1>Published Posts</h1>
      {listOfPublishedPosts.map((post) => {
        return (
          <>
            <div key={post._id}>
              Username: {post.user} Title: {post.title}
              Body: {post.body}
              <div className="editPost">
                <button onClick={deletePost} value={post._id}>
                  X
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
                <>No Replies</>
              )}
            </div> */}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default AdminPage;
