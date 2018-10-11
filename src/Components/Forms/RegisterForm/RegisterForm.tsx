import {Button, Form, Input} from "antd";
import {FormComponentProps} from 'antd/lib/form/Form';
import * as React from "react";
import "./RegisterForm.css"

interface IRegisterFormProps {
  onSubmit: (data: object) => void,
}

class RegisterForm extends React.Component<IRegisterFormProps & FormComponentProps> {
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
          {getFieldDecorator("repeatPassword")(<Input placeholder="Retype password"/>)}
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

export default Form.create()(RegisterForm);