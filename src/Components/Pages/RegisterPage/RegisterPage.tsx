import * as React from 'react';
import RegisterForm from 'src/Components/Forms/RegisterForm';

class RegisterPage extends React.Component {
  public handleRegister(data: object) {
    // todo: implement
  }
  public render():React.ReactNode {
    return <div>
      <h1>Register Page</h1>
      <RegisterForm onSubmit={this.handleRegister} />
    </div>
  }
}

export default RegisterPage;