import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import "./Auth.scss";

import Univelcity from '../common/Univelcity';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

/*   fillDemoEmail = () => {
    this.setState({ email: "admin@univelcity.com" });
  };

  fillDemoPassword = () => {
    this.setState({ password: "test1234" });
  };
 */
  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
        <Univelcity />
        <div className="auth-header">Login to your account</div>
        <form className="auth-form" noValidate onSubmit={this.onSubmit}>
          <div className="auth-group">
            <label>
              <div className="auth-label">Email address</div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                placeholder="Email Address"
                className="auth-input"
              />
              <div className="auth-error">
                {errors.email}
                {errors.emailnotfound}
              </div>
            </label>
          </div>

          <div className="auth-group">
            <label>
              <div className="auth-label">Password</div>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                placeholder="Password"
                className="auth-input"
              />
              <div className="auth-error">
                {errors.password}
                {errors.passwordincorrect}
              </div>
            </label>
          </div>

          <div>
            <button type="submit" className="auth-button">
              Login
            </button>
          </div>
          <div className="bottom-group">
          <p className="text-link">Don't have an account,
            <Link to="/register" className="link">
              Sign up
            </Link>
          </p>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
