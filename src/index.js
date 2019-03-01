// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import Routes from "./components/Routes";
import LoginPage from "./components/Login";

// eslint-disable-next-line no-undef
ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("app"),
);
