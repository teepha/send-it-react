import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";

const Routes = () => (
  <div>
    <NavBar />
    <Route path="/" component={HomePage} exact />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Signup} />
    <Route path="/user-profile" component={UserProfile} />
    <Route path="/admin-profile" component={AdminProfile} />
    <ToastContainer autoClose={3000} />
    <Footer />
  </div>
);

export default Routes;
