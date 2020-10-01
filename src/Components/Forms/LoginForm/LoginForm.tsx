import { Button, Form, Input } from "antd";
import React from "react";
import "./LoginForm.css";

interface LoginFormValues {}

interface LoginFormProps {
  className: string;
  onSubmit: (values: LoginFormValues) => void;
}

/**
 * login form.
 */
class LoginForm extends React.Component<LoginFormProps> {
  constructor(props: LoginFormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: LoginFormValues) {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  render() {
    const { className } = this.props;

    return (
      <Form className={className} onFinish={this.handleSubmit}>
        <h1>LOGIN</h1>
        <Form.Item name="userName" rules={[{ required: true }]}>
          <Input placeholder="UserName" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
