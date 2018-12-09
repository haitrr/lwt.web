import { Button, Form, Input } from "antd";
import React from "react";
import "./RegisterForm.css";

/**
 * Register form
 */
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err, values) => {
      if (err == null || err.length === 0) {
        onSubmit(values);
      }
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
          {getFieldDecorator("repeatPassword")(
            <Input placeholder="Retype password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const registerForm = Form.create()(RegisterForm);
export { registerForm as RegisterForm };
