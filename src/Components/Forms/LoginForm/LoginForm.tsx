import { Button, Form, Input } from "antd";
import { FormComponentProps, RcBaseFormProps } from "antd/lib/form/Form";
import * as React from "react";
import "./LoginForm.css";

interface ILoginFormProps {
  onSubmit(data: object): void;
}

/**
 * login form.
 */
class LoginForm extends React.Component<ILoginFormProps & FormComponentProps> {
  constructor(props: ILoginFormProps & FormComponentProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err: string[], values: object) => {
      if (err != null && err.length > 0) {
        onSubmit(values);
      }
    });
  }

  public render(): React.ReactNode {
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

const loginForm: React.ComponentClass<
  RcBaseFormProps & Pick<any, string | number | symbol>,
  any
> = Form.create()(LoginForm);

export { loginForm as LoginForm };
