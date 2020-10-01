import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { loginAction } from "../../../Actions/UserAction";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import { RootState } from "../../../RootReducer";

export interface LoginData {}

interface LoginPageProps {
  isLoggedIn: boolean;
  login: Function;
}

/**
 * Login page
 */
class LoginPage extends React.Component<LoginPageProps> {
  handleLogin = (data: LoginData) => {
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

export default connect(
  (state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
  }),
  { login: loginAction }
)(LoginPage);
