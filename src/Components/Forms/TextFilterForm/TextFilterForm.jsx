import { Form, Select } from "antd";
import React from "react";

/**
 * text filter form
 */
class TextFilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    const data = this.props.form.getFieldsValue();
    this.props.onChange(data);
  }

  render() {
    const {
      form: { getFieldDecorator },
      languages
    } = this.props;

    return (
      <Form onChange={this.handleChange}>
        <Form.Item>
          {getFieldDecorator("language")(
            <Select>
              {languages.map(language => {
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

const textFilterForm = Form.create()(TextFilterForm);
export { textFilterForm as TextFilterForm };
