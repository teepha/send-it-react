import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";

const Routes = () => (
  <div>
    <NavBar />
    <Route path="/" component={HomePage} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Signup} />
    <Footer />
  </div>
);

export default Routes;
