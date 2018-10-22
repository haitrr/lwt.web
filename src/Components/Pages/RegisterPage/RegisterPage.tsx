import * as React from "react";
import { connect, ConnectedComponentClass } from "react-redux";
import { registerAction } from "src/Actions/UserAction";
import { RegisterForm } from "src/Components/Forms/RegisterForm";
import { IUserRegisterModel } from "src/Interfaces/IUserRegisterModel";

interface IRegisterPageProps {
  register(data: IUserRegisterModel): void;
}

/**
 * register page
 */
class RegisterPage extends React.Component<IRegisterPageProps> {
  constructor(props: IRegisterPageProps) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  public handleRegister(data: IUserRegisterModel): void {
    this.props.register(data);
  }
  public render(): React.ReactNode {
    return (
      <div>
        <h1>Register Page</h1>
        <RegisterForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

const registerPageConnected: ConnectedComponentClass<
  typeof RegisterPage,
  Pick<IRegisterPageProps, never>
> = connect(
  null,
  { register: registerAction }
)(RegisterPage);

export { registerPageConnected as RegisterPage };
