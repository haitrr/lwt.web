import React from "react";
import { connect } from "react-redux";
import { registerAction } from "../../../Actions/UserAction";
import RegisterForm from "../../Forms/RegisterForm";

/**
 * register page
 */
class RegisterPage extends React.Component {
  handleRegister = (data) => {
    const { register, history } = this.props;
    register(data).then(() => {
      history.push("/login");
    });
  };

  render() {
    return (
      <div>
        <h1>Register Page</h1>
        <RegisterForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

export default connect(null, { register: registerAction })(RegisterPage);
