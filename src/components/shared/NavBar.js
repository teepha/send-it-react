import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <div>
    <h1 className="logo">
      <Link to="/" className="sendIT">
        SendIT
      </Link>
    </h1>
    <ul className="navigation">
      <li><Link className="navigation-link" to="/login">Login</Link></li>
      <li><Link className="navigation-link" to="/register">SignUp</Link></li>
      <li><Link className="navigation-link" to="/admin">Admin</Link></li>
    </ul>
  </div>
);

export default NavBar;
