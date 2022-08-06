import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import App from "./App";
import CreatePost from "./CreatePost";
import SignIn from "./SignIn";
function FrontEndRouter() {
  const [currentUser] = useState("");

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
          <Route path="/createPost" element={<CreatePost />} />
          <Route
            path="/signIn"
            element={<SignIn currentUser={currentUser} />}
          />
        </Routes>
      </>
    </div>
  );
}

export default FrontEndRouter;
