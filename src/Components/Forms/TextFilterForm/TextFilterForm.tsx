import PropTypes from "prop-types";
import {Form} from "antd";
import {TextField} from "@material-ui/core";
import React from "react";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TextFilterForm.module.scss";

interface Props {
  onFilterChange: any
}

let textFilterTimeout: any = null;

/**
 * text filter form
 */
const TextFilterForm: React.FC<Props> = ({onFilterChange}) => (
  <Form
    onValuesChange={(changedValues, allValues) => {
      clearTimeout(textFilterTimeout);
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
      <LanguageSelect/>
    </Form.Item>
    <Form.Item name="title">
      <TextField
        variant="outlined"
        margin="dense"
        label="Title"
        className={styles.titleInput}
        placeholder="Title"
      />
    </Form.Item>
    <hr/>
  </Form>
);

TextFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

TextFilterForm.defaultProps = {};

export default TextFilterForm;
