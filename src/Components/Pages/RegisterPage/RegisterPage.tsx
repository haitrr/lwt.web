import * as React from "react";
import { RegisterForm } from "src/Components/Forms/RegisterForm";

/**
 * register page
 */
export class RegisterPage extends React.Component {
  constructor(props: object) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  public handleRegister(): void {
    // todo: implement
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
