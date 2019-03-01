import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <a href="#">BackArrow</a>
        <h1>LogIn</h1>
        <form onSubmit={this.handleAddOption}>
          <label>Email address </label>
          <input type="email" name="emailAddress" />
          <br />
          <label>Password </label>
          <input name="password" type="password" />
          <br />
          <button className="button">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
