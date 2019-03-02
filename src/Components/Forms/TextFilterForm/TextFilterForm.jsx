import PropTypes from "prop-types";
import { Form, Select } from "antd";
import React from "react";

/**
 * text filter form
 */
function TextFilterForm(props) {
  const {
    form: { getFieldDecorator },
    languages
  } = props;

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator("language")(
          <Select>
            {languages.map(language => (
              <Select.Option value={language.id} key={language.id}>
                {language.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
    </Form>
  );
}

const textFilterForm = Form.create({
  onValuesChange: (props, _, allValues) => {
    props.onFilterChange(allValues);
  }
})(TextFilterForm);

TextFilterForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({}))
};

TextFilterForm.defaultProps = {
  languages: []
};

export default textFilterForm;
