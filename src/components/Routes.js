import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import HomePage from "./HomePage";
import Login from "./Login";

const Routes = () => (
    <div>
      <NavBar />
      <Route path="/" component={HomePage} />
      <Footer />
    </div>
);

export default Routes;
