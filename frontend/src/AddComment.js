import React, { useState, useEffect } from "react";
import Axios from "axios";

function AddComment(props) {
  let { post } = props;
  const [commentTitle, setCommentTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentName, setCommentName] = useState("");
  const [conditions, setConditions] = useState(false);

  useEffect(() => {
    if (
      commentBody === "" ||
      commentBody === undefined ||
      commentBody === null
    ) {
      setConditions(false);
    } else {
      setConditions(true);
    }
  }, [commentBody]);

  // Add comment to post
  let addComment = (e) => {
    // Axios.post("http://localhost:8080/comment", {
    Axios.post("https://fish-blog-api-client.herokuapp.com/comment", {
      commentingOnId: e.target.value,
      username: commentName,
      title: commentTitle,
      body: commentBody,
    });
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
    window.location.href = "/";
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
      <button
        className="addCommentButton"
        disabled={!conditions}
        onClick={addComment}
        value={post._id}
      >
        Submit Comment
      </button>
    </div>
  );
}

export default AddComment;
