import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../images/logo0.png";
import { logoutUser } from "../../actions/userActions";

export class NavBar extends React.Component {
  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    return (
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
                {user.id ? (
                  <Fragment>
                    <li>
                      <Link className="navigation-link" to={user.role === "member" ? "/user-profile" : "/admin-profile"}>
                        My Profile
                  </Link>
                    </li>
                    <li>
                      <Link
                        className="navigation-link"
                        onClick={this.handleLogout}
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
  }
}

export const mapStateToProps = ({ user }) => ({
  user: user.userData,
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar));
