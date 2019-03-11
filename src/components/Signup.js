import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    };
  }

  handleSignup = (e) => {
    e.preventDefault();
    const {
      firstName, lastName, phoneNumber, email, password,
    } = this.state;
    this.props
      .registerUser(firstName, lastName, phoneNumber, email, password)
      .then((res) => {
        if (!res.token) {
          return res;
        }
        this.props.history.push("/");
        return res;
      })
      .catch((err) => {
        // display err msg
        return err;
      });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="main-signup-page">
          <div className="sign-up-wrapper">
            <div className="sign-up-page">
              <Link to="/">
                <i className="fas fa-arrow-left" />
              </Link>
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = () => ({
  registerUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Signup);
