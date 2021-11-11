import { Form } from "antd";
import { Button, TextField } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { loginAction } from "../../../Actions/UserAction";

interface StateProps {}

interface DispatchProps {
  login: Function;
}

interface OwnProps {
  className: string;
}

type Props = OwnProps & StateProps & DispatchProps;

interface FormValues {
  userName: string;
  password: string;
}

interface State {
  loading: boolean;
}

/**
 * login form.
 */
class LoginForm extends React.Component<Props, State> {
  state = { loading: false };

  handleLogin = (data: FormValues) => {
    const { login } = this.props;
    this.setState({ loading: true }, () =>
      login(data).then(() => this.setState({ loading: false }))
    );
  };

  render() {
    const { className } = this.props;
    const { loading } = this.state;

    return (
      <Form className={className} onFinish={this.handleLogin}>
        <h1>LOGIN</h1>
        <Form.Item name="userName" rules={[{ required: true }]}>
          <TextField
            variant="outlined"
            style={{ width: "100%", marginBottom: "1rem" }}
            placeholder="User name"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <TextField
            variant="outlined"
            style={{ width: "100%" }}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={loading}
            style={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(null, { login: loginAction })(LoginForm);
