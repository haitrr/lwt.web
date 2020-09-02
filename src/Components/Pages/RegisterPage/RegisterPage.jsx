import React from "react";
import { connect } from "react-redux";
import { registerAction } from "../../../Actions/UserAction";
import RegisterForm from "../../Forms/RegisterForm";

/**
 * register page
 */
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(data) {
    const { register, history } = this.props;
    register(data).then(() => {
      history.push("/login");
    });
  }

  render() {
    return (
      <div>
        <h1>Register Page</h1>
        <RegisterForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

const registerPageConnected = connect(null, { register: registerAction })(
  RegisterPage
);

export { registerPageConnected as RegisterPage };
