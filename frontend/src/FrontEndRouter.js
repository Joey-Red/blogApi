import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import App from "./App";

function FrontEndRouter() {
  const [currentUser] = useState("");
  // const [listOfPosts, setListOfPosts] = useState([{}]);
  // const [postsLoaded, setPostsLoaded] = useState(false);

  return (
    <div className="Routes">
      <>
        <Routes>
          <Route
            exact
            path="/adminPage"
            element={<AdminPage currentUser={currentUser} />}
          />
          <Route exact path="/" element={<App currentUser={currentUser} />} />
        </Routes>
      </>
    </div>
  );
}

export default FrontEndRouter;
