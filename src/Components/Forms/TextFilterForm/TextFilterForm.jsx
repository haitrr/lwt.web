import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import LanguageSelect from "../../Inputs/LanguageSelect";

/**
 * text filter form
 */
function TextFilterForm(props) {
  const {
    form: { getFieldDecorator }
  } = props;

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator("languageCode")(<LanguageSelect />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("title")(<Input placeholder="Title" />)}
      </Form.Item>
    </Form>
  );
}

const textFilterForm = Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    clearTimeout(window.textFilterTimeout);
    if (changedValues.title) {
      window.textFilterTimeout = setTimeout(() => {
        props.onFilterChange(allValues);
      }, 1000);
    } else {
      props.onFilterChange(allValues);
    }
  }
})(TextFilterForm);

TextFilterForm.propTypes = {
  form: PropTypes.shape({}).isRequired
};

TextFilterForm.defaultProps = {};

export default textFilterForm;
