/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../actions/userActions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props
      .loginUser(email, password)
      .then((res) => {
        if (res.msg) {
          toast.warn(res.msg);
        } else {
          res.role === "member"
            ? this.props.history.replace("/user-profile")
            : this.props.history.push("/admin-profile");
        }
      })
      .catch((err) => {
        toast.error("Sorry a server error occured!");
      });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="main-page">
        <div className="login-wrapper">
          <div className="login-page">
            <Link to="/">
              <i className="fas fa-arrow-left" />
            </Link>
            <h1>LogIn</h1>
            <form onSubmit={this.handleLogin} id="login-form">
              <label>Email address </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Password </label>
              <input
                required
                name="password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <br />
              <button className="button">Log In</button>
              <h4 id="error-msg" />
            </form>
            <div className="signup-login-btn">
              <span>Don't have an account?</span>
              <Link to="/register">SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = () => ({
  loginUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Login);
