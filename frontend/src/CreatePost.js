import React, { useState } from "react";
import Axios from "axios";

function CreatePost(props) {
  let { currentUser } = props;
  const [publishStatus, setPublishStatus] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setPublishStatus(e.target.checked);
  };
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

  return (
    <>
      {currentUser.length > 0 ? (
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
      )}
    </>
  );
}

export default CreatePost;
