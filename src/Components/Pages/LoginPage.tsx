import * as React from "react";
import { connect, ConnectedComponentClass } from "react-redux";
import { loginAction } from "src/Actions/UserAction";
import { ILoginPageProps } from "src/Interfaces/ILoginPageProps";
import { IUserLoginModel } from "src/Interfaces/IUserLoginModel";
import { LoginForm } from "../Forms/LoginForm/LoginForm";

/**
 * Login page
 */
class LoginPage extends React.Component<ILoginPageProps> {
  public handleLogin = (data: IUserLoginModel): void => {
    const { login } = this.props;
    login(data);
  };

  public render(): React.ReactNode {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

const connectedLoginPage: ConnectedComponentClass<
  typeof LoginPage,
  Pick<ILoginPageProps, never>
> = connect(
  null,
  { login: loginAction }
)(LoginPage);
export { connectedLoginPage as LoginPage };
