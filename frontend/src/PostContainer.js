import React from "react";
import { v4 as uuidv4 } from "uuid";
import AddComment from "./AddComment";

function PostContainer(props) {
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
  let { post, commentsLoaded, listOfComments } = props;
  return (
    <div>
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
        <div className="blogUser">Author: {post.user}</div>
        <div className="showAddComments">
          <div className="showCommentInputContainer">
            <button
              className="showCommentInputButton"
              value={post._id}
              onClick={showCommentInput}
            >
              Add Comment
            </button>
            <div className="addCommentContainer" id={post._id + "comment"}>
              <AddComment post={post} />
            </div>
          </div>
          <div className="commentBox">
            <h4>Comments</h4>
            <div className="commentDetailsContainer">
              {commentsLoaded ? (
                listOfComments.map((comments) => {
                  if (comments.commentingOnId === post._id) {
                    return (
                      <div key={uuidv4()} className="commentDetails">
                        {comments.commentingOnId === post._id &&
                        comments.title.length !== 0 ? (
                          <>{comments.title}</>
                        ) : (
                          // if No title
                          <></>
                        )}
                        {comments.commentingOnId === post._id ? (
                          <>
                            <div className="commentBody">{comments.body}</div>
                          </>
                        ) : (
                          // if ids dont match
                          <></>
                        )}
                        {comments.commentingOnId === post._id ? (
                          <>
                            <div className="commentBottom">
                              {comments.commentingOnId === post._id &&
                              comments.username.length !== 0 ? (
                                <>Author: {comments.username}</>
                              ) : (
                                <>Author: Anon</>
                              )}
                            </div>
                          </>
                        ) : (
                          // if ids dont match
                          <></>
                        )}
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                // if comments are not loaded
                <>
                  <div className="spinner"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostContainer;
