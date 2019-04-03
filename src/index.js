import React from "react";
import ReactDOM from "react-dom";
import { verifyToken } from "./utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { userAuthSuccess } from "./actions/userActions";
import "./css/styles.css";

import Routes from "./components/Routes";
import store from "./store";

if (verifyToken() !== null) {
  const userData = verifyToken();
  store.dispatch(userAuthSuccess(userData.userInfo));
} else {
  store.dispatch(userAuthSuccess({}));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
