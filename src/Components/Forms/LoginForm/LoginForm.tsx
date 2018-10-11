import {Button, Form, Input} from "antd";
import {FormComponentProps} from 'antd/lib/form/Form';
import * as React from "react";
import "./LoginForm.css"

interface ILoginFormProps {
  onSubmit: (data: object) => void,
}

class LoginForm extends React.Component<ILoginFormProps & FormComponentProps> {
  public handleSubmit = (e: any) => {
    e.preventDefault();
    const {form, onSubmit} = this.props;
    form.validateFields((err: any, values: any) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  public render() {
    const {form: {getFieldDecorator}} = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("userName")(<Input placeholder="UserName"/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password")(<Input placeholder="Password"/>)}
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

export default Form.create()(LoginForm);