import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { loginAction } from "src/Actions/UserAction";
import { IUserLoginModel } from "src/Interfaces/IUserLoginModel";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

/**
 * Login page
 */
class LoginPage extends React.Component<any> {
  public handleLogin = (data: IUserLoginModel): void => {
    const { login } = this.props;
    login(data);
  };

  public render(): React.ReactNode {
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

const connectedLoginPage: any = connect(
  (state: any) => ({
    isLoggedIn: state.user.isLoggedIn
  }),
  { login: loginAction }
)(LoginPage);
export { connectedLoginPage as LoginPage };
