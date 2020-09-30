import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import LanguageSelect from "../../Inputs/LanguageSelect";

/**
 * text filter form
 */
function TextFilterForm({ onFilterChange }) {
  return (
    <Form
      onValuesChange={(changedValues, allValues) => {
        clearTimeout(window.textFilterTimeout);
        if (changedValues.title) {
          window.textFilterTimeout = setTimeout(() => {
            onFilterChange(allValues);
          }, 1000);
        } else {
          onFilterChange(allValues);
        }
      }}
    >
      <Form.Item name="languageCode">
        <LanguageSelect />
      </Form.Item>
      <Form.Item name="title">
        <Input placeholder="Title" />
      </Form.Item>
    </Form>
  );
}

TextFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

TextFilterForm.defaultProps = {};

export default TextFilterForm;
