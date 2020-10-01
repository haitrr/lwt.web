import React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import { registerAction } from "../../../Actions/UserAction";
import RegisterForm from "../../Forms/RegisterForm";
import { RegisterData } from "../../../Apis/UserApi";

interface OwnProps {
  register: Function;
}

type RegisterPageProps = OwnProps & RouterProps;

/**
 * register page
 */
class RegisterPage extends React.Component<RegisterPageProps> {
  constructor(props: RegisterPageProps) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister = async (data: RegisterData) => {
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
