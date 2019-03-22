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
import CreateOrder from "./CreateOrder";
import EditOrder from "./EditOrder";

const Routes = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <div >
      <NavBar />
      <Route path="/" component={HomePage} exact />
      <Route path="/login" render={() => token ? (role === "member" ? <UserProfile /> : <AdminProfile />) : <Login />} />
      <Route path="/register" component={Signup} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/admin-profile" component={AdminProfile} />
      <Route path="/create-order" component={CreateOrder} />
      <Route path="/parcels/:id" component={EditOrder} />
      <ToastContainer autoClose={2500} />
      <Footer />
    </div >
  )
}

export default Routes;
