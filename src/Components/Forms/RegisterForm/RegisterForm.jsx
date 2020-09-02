import { Button, Form, Input, notification } from "antd";
import React from "react";
import "./RegisterForm.css";
import { withRouter } from "react-router";

/**
 * Register form
 */
class RegisterForm extends React.Component {
  handleSubmit = values => {
    const { onSubmit, history } = this.props;
    if (values.password !== values.repeatPassword) {
      notification.error({ message: "Passwords not match" });
      return;
    }
    onSubmit(values)
      .then(() => {
        history.push("/login");
      })
      .catch(e => {
        throw e;
      });
  };

  render() {
    return (
      <Form onFinish={this.handleSubmit}>
        <Form.Item name="userName">
          <Input placeholder="UserName" />
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="repeatPassword">
          <Input type="password" placeholder="Retype password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    );
  }
}
export default withRouter(RegisterForm);
