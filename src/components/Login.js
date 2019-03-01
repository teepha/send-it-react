import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">BackArrow</Link>
        <h1>LogIn</h1>
        <form onSubmit={this.handleLogin}>
          <label>Email address </label>
          <input type="email" name="emailAddress" id="email" />
          <br />
          <label>Password </label>
          <input name="password" type="password" id="password" />
          <br />
          <button className="button">Log In</button>
          <h4 id="error-msg"></h4>
        </form>
        <div className="signup-login-btn">
          <span>Don't have an account?</span>
          <Link to="/register">SignUp</Link>
        </div>
      </div>
    );
  }
}

export default Login;
