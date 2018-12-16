import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { loginAction } from "../../Actions/UserAction";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

/**
 * Login page
 */
class LoginPage extends React.Component {
  handleLogin = data => {
    const { login } = this.props;
    login(data);
  };

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

const connectedLoginPage = connect(
  state => ({
    isLoggedIn: state.user.isLoggedIn
  }),
  { login: loginAction }
)(LoginPage);
export { connectedLoginPage as LoginPage };
