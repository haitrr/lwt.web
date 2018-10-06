import * as React from "react";
import {connect} from "react-redux";
import {Login} from "../../Actions/UserAction";
import LoginForm from "../Forms/LoginForm";

interface ILoginPageProps {
  LoginAction: (data: object) => void;
}

class LoginPage extends React.Component<ILoginPageProps> {
  public handleLogin = (data: object) => {
    const {LoginAction} = this.props;
    LoginAction(data);
  };

  public render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm onSubmit={this.handleLogin}/>
      </div>
    );
  }
}

export default connect(
  null,
  {LoginAction: Login}
)(LoginPage);
