import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([{}]);
  // const [name, setName] = useState("");
  // const [age, setAge] = useState(0);
  const [listOfPosts, setListOfPosts] = useState([{}]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [logInPw, setLogInPw] = useState("");
  const [logInPwConfirm, setLogInPwConfirm] = useState("");
  const [logInUsername, setLogInUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  // Fetch Posts
  useEffect(() => {
    Axios.get("http://localhost:8080/getPosts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);
  // Fetch Users
  useEffect(() => {
    Axios.get("http://localhost:8080/getUsers").then((res) => {
      setListOfUsers(res.data);
    });
    //Probably dont keep this condition
    // vvvvvvvvvv
  }, []);
  // Log In
  const logIn = () => {
    Axios.post("http://localhost:8080/log-in", {
      username: logInUsername,
      password: logInPw,
    }).then((res) => {
      setCurrentUser(res.data);
    });
  };
  // Submit Post
  const submitPost = () => {
    Axios.post("http://localhost:8080/create-post", {
      postTitle: postTitle,
      postBody: postBody,
      username: currentUser,
    }).then((res) => {
      setListOfPosts([...listOfPosts, { postTitle, postBody, username }]);
    });
  };
  // Create User
  const createUser = () => {
    Axios.post("http://localhost:8080/sign-up", {
      username: username,
      password: password,
    }).then((res) => {
      setListOfUsers([...listOfUsers, { username }]);
    });
  };
  return (
    <div className="App">
      <div className="h1">Sign Up</div>
      <div className="createUser">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <button onClick={createUser}>Submit</button>
      </div>
      <div className="logIn">
        <div className="h1">Log In</div>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setLogInUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setLogInPw(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => {
            setLogInPwConfirm(e.target.value);
          }}
        />
        <button onClick={logIn}>Submit</button>
      </div>
      <div className="createPost">
        <div className="h1">Create Post</div>
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
        <button onClick={submitPost}>Submit</button>
      </div>
      <div>
        {listOfPosts.map((post) => {
          return (
            <div key={post._id}>
              Username: {post.user} Title: {post.title}
              Body: {post.body}
            </div>
          );
        })}
      </div>
      <div>
        {listOfUsers.map((user) => {
          return <div key={user._id}>Username: {user.username}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
