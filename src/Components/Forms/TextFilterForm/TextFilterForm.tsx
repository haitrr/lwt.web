import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";
import React from "react";
import LanguageSelect from "../../Inputs/LanguageSelect";
import styles from "./TextFilterForm.module.scss";
import {Form, Formik} from "formik";
import {TextFilter} from "../../../Actions/TextAction";

interface Props {
  onFilterChange: any
  values: TextFilter
}

let textFilterTimeout: any = null;

/**
 * text filter form
 */
const TextFilterForm: React.FC<Props> = ({onFilterChange, values}) => (
  <Formik initialValues={{
    title: values.title,
    languageCode: values.languageCode,
  }} onSubmit={() => {
  }}>
    {({values, handleChange}) => {
      React.useEffect(() => {
        clearTimeout(textFilterTimeout);
        textFilterTimeout = setTimeout(() => {
          onFilterChange(values);
        }, 500);
      }, [values])
      console.log(values)

      return <Form>
        <LanguageSelect
          name="languageCode"
          value={values.languageCode}
          onChange={handleChange}
        />
        <TextField
          name="title"
          variant="outlined"
          margin="dense"
          label="Title"
          className={styles.titleInput}
          value={values.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <hr/>
      </Form>
    }}
  </Formik>
);

TextFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

TextFilterForm.defaultProps = {};

export default TextFilterForm;
