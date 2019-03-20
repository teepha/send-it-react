/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
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

  shouldComponentUpdate(nextProps) {
    if (nextProps.errors.length && this.props.errors !== nextProps.errors) {
      const errorString = nextProps.errors.join("\n");
      toast.warn(errorString);
    } else if (this.props.user !== nextProps.user) {
      toast.success("Registration Successful!");
      nextProps.user.role === "member"
        ? this.props.history.replace("/user-profile")
        : this.props.history.push("/admin-profile");
    }
    return true;
  }

  handleSignup = (e) => {
    e.preventDefault();
    const {
      firstName, lastName, phoneNumber, email, password,
    } = this.state;
    this.props.registerUser(firstName, lastName, phoneNumber, email, password);
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
                  required
                  pattern="^[A-Za-z]+$"
                  minLength="2"
                  name="firstName"
                  id="first_name"
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInputChange}
                />
                <br />
                <label>Last Name </label>
                <input
                  required
                  pattern="^[A-Za-z]+$"
                  minLength="2"
                  name="lastName"
                  id="last_name"
                  type="text"
                  value={this.state.last_name}
                  onChange={this.handleInputChange}
                />
                <br />
                <label>Phone Number </label>
                <input
                  required
                  minLength="11"
                  name="phoneNumber"
                  id="phone_number"
                  type="text"
                  value={this.state.phone_number}
                  onChange={this.handleInputChange}
                />
                <br />
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
                  minLength="4"
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

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
    errors: store.user.errors,
  };
};

const mapDispatchToProps = () => ({
  registerUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Signup);
