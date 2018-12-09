import { Button, Form, Input } from "antd";
import React from "react";
import "./LoginForm.css";

/**
 * login form.
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err != null && err.length > 0) {
        // todo: error
      }

      onSubmit(values);
    });
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("userName")(<Input placeholder="UserName" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password")(<Input placeholder="Password" />)}
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

const loginForm = Form.create()(LoginForm);

export { loginForm as LoginForm };
