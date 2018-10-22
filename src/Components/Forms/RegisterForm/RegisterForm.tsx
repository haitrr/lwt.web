import { Button, Form, Input } from "antd";
import { FormComponentProps, RcBaseFormProps } from "antd/lib/form/Form";
import * as React from "react";
import "src/Components/Forms/RegisterForm/RegisterForm.css";
import { IUserRegisterModel } from "src/Interfaces/IUserRegisterModel";

interface IRegisterFormProps {
  onSubmit(data: IUserRegisterModel): void;
}

/**
 * Register form
 */
class RegisterForm extends React.Component<
  IRegisterFormProps & FormComponentProps
> {
  constructor(props: IRegisterFormProps & FormComponentProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err: string[], values: IUserRegisterModel) => {
      if (err == null || err.length === 0) {
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
const registerForm: React.ComponentClass<
  RcBaseFormProps & Pick<IRegisterFormProps & FormComponentProps, "onSubmit">,
  any
> = Form.create()(RegisterForm);
export { registerForm as RegisterForm };
