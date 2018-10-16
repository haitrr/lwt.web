import * as React from "react";
import { connect } from "react-redux";
import { loginAction } from "src/Actions/UserAction";
import { ILoginPageProps } from "src/Interfaces/ILoginPageProps";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

/**
 * Login page
 */
class LoginPage extends React.Component<ILoginPageProps> {
  public handleLogin = (data: object) => {
    const { loginAction } = this.props;
    loginAction(data);
  };

  public render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default connect(
  null,
  { login: loginAction }
)(LoginPage);
