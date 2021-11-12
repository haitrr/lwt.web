import { Form } from "antd";
import { toast } from "react-toastify";
import { Button, TextField } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { registerAction } from "../../../Actions/UserAction";

interface OwnProps { }

interface DispatchProps {
  register: Function;
}

interface FormValues {
  userName: string;
  password: string;
  repeatPassword: string;
}

interface State {
  submitting: boolean;
}

type Props = OwnProps & DispatchProps & RouteComponentProps;

/**
 * Register form
 */
class RegisterForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { submitting: false };
  }

  handleRegister = (data: any): Promise<any> => {
    const { register, history } = this.props;
    return register(data).then(() => {
      history.push("/login");
    });
  };

  handleSubmit = (values: FormValues) => {
    const { history } = this.props;
    if (values.password !== values.repeatPassword) {
      toast.error("Passwords not match");
      return;
    }

    this.setState({ submitting: true }, () =>
      this.handleRegister(values)
        .then(() => {
          history.push("/login");
        })
        .catch((e: Error) => {
          this.setState({ submitting: false });
        })
    );
  };

  render() {
    const { submitting } = this.state;

    return (
      <Form onFinish={this.handleSubmit}>
        <Form.Item name="userName">
          <TextField
            variant="outlined"
            style={{ width: "100%", marginBottom: "1rem" }}
            placeholder="User Name"
          />
        </Form.Item>
        <Form.Item name="password">
          <TextField
            variant="outlined"
            style={{ width: "100%", marginBottom: "1rem" }}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="repeatPassword">
          <TextField
            variant="outlined"
            style={{ width: "100%", marginBottom: "1rem" }}
            type="password"
            placeholder="Retype password"
          />
        </Form.Item>
        <Button
          disabled={submitting}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
    );
  }
}

export default withRouter(
  connect(null, { register: registerAction })(RegisterForm)
);
