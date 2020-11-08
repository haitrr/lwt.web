import React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import { registerAction } from "../../../Actions/UserAction";
import RegisterForm from "../../Forms/RegisterForm";

interface DispatchProps {
  register: Function;
}

type Props = DispatchProps & RouterProps;

/**
 * register page
 */
class RegisterPage extends React.Component<Props> {
  handleRegister = (data: any) => {
    const { register, history } = this.props;
    register(data).then(() => {
      history.push("/login");
    });
  };

  render() {
    return (
      <div
        style={{
          margin: "auto",
        }}
      >
        <h1>Register Page</h1>
        <RegisterForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

export default connect(null, { register: registerAction })(RegisterPage);
