import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import HomePage from "./HomePage";
import LoginPage from "./authentication/LoginPage";
import SignupPage from "./authentication/SignupPage";
import UserPage from "./parcels/dashboards/UserPage";
import AdminPage from "./parcels/dashboards/AdminPage";
import CreateOrder from "./parcels/CreateOrderPage";
import EditOrder from "./parcels/EditOrderPage";

const Routes = () => {
  return (
    <div >
      <NavBar />
      <Route path="/" component={HomePage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={SignupPage} />
      <Route path="/user-profile" component={UserPage} />
      <Route path="/admin-profile" component={AdminPage} />
      <Route path="/create-order" component={CreateOrder} />
      <Route path="/parcels/:id" component={EditOrder} />
      <Footer />
    </div>
  )
}

export default Routes;
