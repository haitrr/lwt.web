import React from "react";
import { Form, Input } from "antd";

class TermEditForm extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      value,
      onSubmit
    } = this.props;
    return (
      <Form onSubmit={onSubmit}>
        <Form.Item label="Content">
          {getFieldDecorator("content", { initialValue: value.content })(
            <Input disabled />
          )}
        </Form.Item>
        <Form.Item label="Meaning">
          {getFieldDecorator("meaning", { initialValue: value.meaning })(
            <Input placeholder="Meaning" />
          )}
        </Form.Item>
        <Form.Item label="Learning Level">
          {getFieldDecorator("learningLevel", {
            initialValue: value.learningLevel
          })(<Input placeholder="Meaning" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(TermEditForm);
