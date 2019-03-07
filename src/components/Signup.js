import React from "react";
import { Link } from "react-router-dom";

const BASE_API_URL = "https://teepha-send-it.herokuapp.com";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    };
  }

  handleSignup(e) {
    e.preventDefault();

    fetch(`${BASE_API_URL}/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        this.props.history.push("/");
      })
      .catch(err => console.log("err occured", err));
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="main-signup-page">
          <div className="sign-up-wrapper">
            <div className="sign-up-page">
              <Link to="/"><i className="fas fa-arrow-left"></i></Link>
              <h1>SignUp</h1>
              <form onSubmit={this.handleSignup} id="sign-up-form">
                <label>First Name </label>
                <input
                  name="firstName"
                  id="first_name"
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInputChange}
                />
                <br />
                <label>Last Name </label>
                <input
                  name="lastName"
                  id="last_name"
                  type="text"
                  value={this.state.last_name}
                  onChange={this.handleInputChange}
                />
                <br />
                <label>Phone Number </label>
                <input
                  name="phoneNumber"
                  id="phone_number"
                  type="text"
                  value={this.state.phone_number}
                  onChange={this.handleInputChange}
                />
                <br />
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
                <button className="button">Sign Up</button>
                <h4 id="error-msg" />
                <div className="signup-login-btn">
                  <span>Already have an account?</span>
                  <Link to="/login">LogIn</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
