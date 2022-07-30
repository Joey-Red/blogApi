import React, { useState } from "react";
import Axios from "axios";

function AddComment(props) {
  let { post } = props;
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentName, setCommentName] = useState("");

  // Add comment to post
  let addComment = (e) => {
    Axios.post("http://localhost:8080/comment", {
      commentingOnId: e.target.value,
      username: commentName,
      title: commentTitle,
      body: commentBody,
    });
  };

  return (
    <div className="addComment">
      <input
        className="commentTitle"
        type="text"
        placeholder="title (optional) "
        onChange={(e) => {
          setCommentTitle(e.target.value);
        }}
      />
      <textarea
        className="commentBody"
        type="text"
        required
        placeholder="share your thoughts"
        onChange={(e) => {
          setCommentBody(e.target.value);
        }}
      />
      <input
        className="commentName"
        type="text"
        placeholder="name (optional)"
        onChange={(e) => {
          setCommentName(e.target.value);
        }}
      />
      <button disabled={!commentBody} onClick={addComment} value={post._id}>
        Submit Comment
      </button>
    </div>
  );
}

export default AddComment;
