import React from "react";
import ReactDOM from "react-dom/client";
import FrontEndRouter from "./FrontEndRouter";
import { BrowserRouter } from "react-router-dom";
import "./styles/stylesheet.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FrontEndRouter />
    </BrowserRouter>
  </React.StrictMode>
);
