import { Button, Form, Input } from "antd";
import React from "react";
import "./LoginForm.css";
import PropTypes from "prop-types";

/**
 * login form.
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
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

LoginForm.propTypes = {
  className: PropTypes.string,
  form: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  className: "",
};

export default LoginForm;
