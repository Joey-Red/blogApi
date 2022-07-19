import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import App from "./App";

function FrontEndRouter() {
  const [currentUser, setCurrentUser] = useState("");
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  // useEffect(() => {
  //   Axios.get("http://localhost:8080/getPosts").then((res) => {
  //     setListOfPosts(res.data);
  //     setPostsLoaded(true);
  //     if (localStorage.getItem("user").length > 0) {
  //       setCurrentUser(localStorage.getItem("user"));
  //     }
  //   });
  // }, []);
  return (
    <div className="Routes">
      <>
        <Routes>
          <Route
            exact
            path="/adminPage"
            element={
              <AdminPage
                currentUser={currentUser}
                // listOfPosts={listOfPosts}
                // postsLoaded={postsLoaded}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <App
                currentUser={currentUser}
                // listOfPosts={listOfPosts}
                // postsLoaded={postsLoaded}
              />
            }
          />
        </Routes>
      </>
    </div>
  );
}

export default FrontEndRouter;
