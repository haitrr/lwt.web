import { Form, notification } from "antd";
import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./RegisterForm.css";
import { RouteComponentProps, withRouter } from "react-router";

interface OwnProps {
  onSubmit: Function;
}

interface FormValues {
  userName: string;
  password: string;
  repeatPassword: string;
}

type Props = OwnProps & RouteComponentProps;

/**
 * Register form
 */
class RegisterForm extends React.Component<Props> {
  handleSubmit = (values: FormValues) => {
    const { onSubmit, history } = this.props;
    if (values.password !== values.repeatPassword) {
      notification.error({ message: "Passwords not match" });
      return;
    }
    onSubmit(values)
      .then(() => {
        history.push("/login");
      })
      .catch((e: Error) => {
        throw e;
      });
  };

  render() {
    return (
      <Form onFinish={this.handleSubmit}>
        <Form.Item name="userName">
          <TextField placeholder="UserName" />
        </Form.Item>
        <Form.Item name="password">
          <TextField type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="repeatPassword">
          <TextField type="password" placeholder="Retype password" />
        </Form.Item>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Form>
    );
  }
}
export default withRouter(RegisterForm);
