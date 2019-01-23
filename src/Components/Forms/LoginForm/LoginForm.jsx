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
      form: { getFieldDecorator },
      className
    } = this.props;

    return (
      <Form className={className} onSubmit={this.handleSubmit}>
        <h1>LOGIN</h1>
        <Form.Item>
          {getFieldDecorator("userName")(<Input placeholder="UserName" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password")(
            <Input.Password placeholder="Password" />
          )}
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
  onSubmit: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  className: ""
};

export default Form.create()(LoginForm);
