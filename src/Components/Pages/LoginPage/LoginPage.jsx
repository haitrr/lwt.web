import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { loginAction } from "../../../Actions/UserAction";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";

/**
 * Login page
 */
class LoginPage extends React.Component {
  handleLogin = (data) => {
    const { login } = this.props;
    login(data);
  };

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <div className={styles.loginPage}>
        <LoginForm className={styles.form} onSubmit={this.handleLogin} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    isLoggedIn: state.user.isLoggedIn,
  }),
  { login: loginAction }
)(LoginPage);
