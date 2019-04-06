import React from "react";
import Spinner from "react-md-spinner";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUserRequest } from "../../actions/userActions";
import { verifyToken } from "../../utils";

export class SignupPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    if (verifyToken() !== null) {
      const { user } = this.props;
      if (user.role === "member") {
        this.props.history.push("/user-profile");
      }
      if (user.role === "admin") {
        this.props.history.push("/admin-profile");
      }
    }
  }

  handleSignup = e => {
    e.preventDefault();
    this.props.authUserRequest(this.state).then(() => {
      const { user } = this.props;
      if (user.role === "member") {
        this.props.history.push("/user-profile");
      }
      if (user.role === "admin") {
        this.props.history.push("/admin-profile");
      }
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { processing } = this.props;
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
                <button className="button" type="submit" disabled={processing}>
                  {processing ? (
                    <Spinner size={18} singleColor="#fff" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
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

const mapStateToProps = ({ user }) => {
  return {
    processing: user.isLoading,
    user: user.userData,
    error: user.userError
  };
};

const mapDispatchToProps = () => ({
  authUserRequest
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps()
  )(SignupPage)
);
