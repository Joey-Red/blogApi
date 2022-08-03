import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PostContainer from "./PostContainer";

function App() {
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [listOfComments, setListOfComments] = useState([{}]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

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
      if (
        localStorage.getItem("user") !== null &&
        localStorage.getItem("user") !== undefined
      ) {
        setCurrentUser(localStorage.getItem("user"));
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/getComments").then((res) => {
      setListOfComments(res.data);
      setCommentsLoaded(true);
      if (
        localStorage.getItem("user") !== null &&
        localStorage.getItem("user") !== undefined
      ) {
        setCurrentUser(localStorage.getItem("user"));
      }
    });
  }, []);
  return (
    <div className="App">
      <div className="homepageContainer">
        <Navbar currentUser={currentUser} />
        <div className="layoutContainer">
          <div className="postContainer">
            {postsLoaded ? (
              <>
                {listOfPosts.map((post) => {
                  return (
                    <div className="postContainerContainer">
                      <PostContainer
                        post={post}
                        commentsLoaded={commentsLoaded}
                        listOfComments={listOfComments}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="spinner"></div>
              </>
            )}
          </div>
          <Footer postsLoaded={postsLoaded} />
        </div>
      </div>
    </div>
  );
}

export default App;
