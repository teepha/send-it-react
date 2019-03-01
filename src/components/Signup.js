import React from "react";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">BackArrow</Link>
        <h1>SignUp</h1>
        <form onSubmit={this.handleSignup}>
          <label>First Name </label>
          <input name="first_name" id="first_name" type="text" />
          <br />
          <label>Last Name </label>
          <input name="last_name" id="last_name" type="text" />
          <br />
          <label>Phone Number </label>
          <input name="phone_number" id="phone_number" type="text" />
          <br />
          <label>Email address </label>
          <input type="email" name="emailAddress" id="email" />
          <br />
          <label>Password </label>
          <input name="password" type="password" id="password" />
          <br />
          <button className="button" >
            Sign Up
          </button>
          <h4 id="error-msg"></h4>
          <div className="signup-login-btn">
            <span>Already have an account?</span>
            <Link to="/login">LogIn</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
