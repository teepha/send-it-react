import React from "react";
import Spinner from "react-md-spinner";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUserRequest } from "../../actions/userActions";
import { verifyToken } from "../../utils";

export class LoginPage extends React.Component {
  state = {
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

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state).then(() => {
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
    const { loading } = this.props;
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
              <button className="button" type="submit" disabled={loading}>
                {loading ? <Spinner size={18} singleColor="#fff" /> : "Log In"}
              </button>
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

export const mapStateToProps = ({ user }) => ({
  loading: user.isLoading,
  user: user.userData,
  error: user.userError
});

export const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(authUserRequest(userData))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
