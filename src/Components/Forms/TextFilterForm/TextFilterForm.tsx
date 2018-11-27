import { Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

interface ITextFilterFormProps {
  languages: any[];
  onChange(data: object): void;
}

/**
 * text filter form
 */
class TextFilterForm extends React.Component<
  ITextFilterFormProps & FormComponentProps
> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  public handleChange(): void {
    const data: object = this.props.form.getFieldsValue();
    this.props.onChange(data);
  }

  public render(): React.ReactNode {
    const {
      form: { getFieldDecorator },
      languages
    } = this.props;

    return (
      <Form onChange={this.handleChange}>
        <Form.Item>
          {getFieldDecorator("language")(
            <Select>
              {languages.map((language: any) => {
                return (
                  <Select.Option value={language.id} key={language.id}>
                    {language.name}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const textFilterForm: any = Form.create()(TextFilterForm);
export { textFilterForm as TextFilterForm };
