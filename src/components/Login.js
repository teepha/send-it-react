/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React from "react";
import { Link, Redirect } from "react-router-dom";

const BASE_API_URL = "https://teepha-send-it.herokuapp.com";

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

    fetch(`${BASE_API_URL}/api/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId);

        fetch(`${BASE_API_URL}/api/v1/me`, {
          headers: {
            Authorization: res.token,
          },
        })
          .then(res => res.json())
          .then((data) => {
            data.role === "member" ? this.props.history.replace("/user-profile") : this.props.history.push("/admin-profile");
          })
          .catch(err => console.log("err occured", err));
      })
      .catch(err => console.log("err occured", err));
  }

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
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Password </label>
              <input
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

export default Login;
