import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { verifyToken } from "./utils";
import { userAuthSuccess } from "./actions/userActions";
import "./css/styles.css";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./components/Routes";
import store from "./store";

if (verifyToken() !== null) {
  const userData = verifyToken();
  store.dispatch(userAuthSuccess(userData.userInfo));
} else {
  store.dispatch(userAuthSuccess({}));
}

ReactDOM.render(
  <Provider store={store()}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <ToastContainer autoClose={2500} />
  </Provider>,
  document.getElementById("app"),
);
