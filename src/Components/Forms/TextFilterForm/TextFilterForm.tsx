import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React from "react";
import LanguageSelect from "../../Inputs/LanguageSelect";
import { TextFilter } from "../../../Apis/TextApi";

interface TextFilterFormProps {
  onFilterChange: (values: TextFilter) => void;
  value: TextFilter;
}

let textFilterTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * text filter form
 */
const TextFilterForm: React.FC<TextFilterFormProps> = ({ onFilterChange }) => (
  <Form
    onValuesChange={(changedValues: any, allValues: TextFilter) => {
      if (textFilterTimeout) {
        clearTimeout(textFilterTimeout);
      }
      if (changedValues.title) {
        textFilterTimeout = setTimeout(() => {
          onFilterChange(allValues);
        }, 1000);
      } else {
        onFilterChange(allValues);
      }
    }}
  >
    <Form.Item name="languageCode">
      {/* @ts-ignore */}
      <LanguageSelect />
    </Form.Item>
    <Form.Item name="title">
      <Input placeholder="Title" />
    </Form.Item>
  </Form>
);

TextFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

TextFilterForm.defaultProps = {};

export default TextFilterForm;
