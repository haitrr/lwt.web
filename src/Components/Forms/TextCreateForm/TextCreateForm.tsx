import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { LanguageSelect } from "../../Inputs/LanguageSelect/LanguageSelect";

interface ITextCreateFormProps {
  onSubmit(): void;
}

/**
 * text create form
 */
class TextCreateForm extends React.Component<
  ITextCreateFormProps & FormComponentProps
> {
  public render(): React.ReactNode {
    const {
      form: { getFieldDecorator },
      onSubmit
    } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        <Form.Item>
          {getFieldDecorator("language")(<LanguageSelect />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("title")(<Input placeholder="Title" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("content")(
            <Input.TextArea
              autosize={{ minRows: 10, maxRows: 20 }}
              placeholder="Please input text content here ..."
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

const textCreateForm: any = Form.create()(TextCreateForm);

export { textCreateForm as TextCreateForm };
