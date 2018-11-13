import { Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

interface ITextFilterFormProps {
  languages: any[];
}

/**
 * text filter form
 */
class TextFilterForm extends React.Component<
  ITextFilterFormProps & FormComponentProps
> {
  public render(): React.ReactNode {
    const {
      form: { getFieldDecorator },
      languages
    } = this.props;

    return (
      <Form>
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
