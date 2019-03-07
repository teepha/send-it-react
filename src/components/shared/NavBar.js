import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo0.png";

const NavBar = () => (
  <div>
    <header>
      <div className="wrapper">
        <div id="logo">
          <Link className="logo" to="/">
            <img src={Logo} />
          </Link>
          <h1 className="logo">
            <Link to="/" className="sendIT">
              SendIT
            </Link>
          </h1>
        </div>

        <nav>
          <ul className="navigation">
            {localStorage.getItem("token") ? (
              <Fragment>
                <li>
                  <Link className="navigation-link" to="/user-profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation-link"
                    onClick={() => localStorage.clear()}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link className="navigation-link" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="navigation-link" to="/register">
                    SignUp
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>

        <div className="navbar__header">
          <div className="navbar__btn">
            <div className="bar bar1" />
            <div className="bar bar2" />
            <div className="bar bar3" />
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default NavBar;
