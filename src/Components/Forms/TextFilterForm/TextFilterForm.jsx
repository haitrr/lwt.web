import PropTypes from "prop-types";
import { Form } from "antd";
import { Input } from "@material-ui/core";
import React from "react";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TextFilterForm.module.scss";

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
        <Input className={styles.titleInput} placeholder="Title" />
      </Form.Item>
    </Form>
  );
}

TextFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

TextFilterForm.defaultProps = {};

export default TextFilterForm;
