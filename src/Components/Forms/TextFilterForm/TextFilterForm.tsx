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
const TextFilterForm: React.FC<Props> = ({onFilterChange, values}) => {
  return (
    <Formik
    initialValues={{
      title: values.title,
      languageCode: values.languageCode,
    }}
    onSubmit={() => {
    }}>
      {({values, handleChange}) => {
        return <InnerForm values={values} handleChange={handleChange} onFilterChange={onFilterChange}/>
      }}
    </Formik>
  );
};

interface InnerProps {
  values: TextFilter;
  handleChange: any;
  onFilterChange: Function;
}


const InnerForm: React.FC<InnerProps> = ({values, onFilterChange, handleChange}) => {
  React.useEffect(() => {
    clearTimeout(textFilterTimeout);
    textFilterTimeout = setTimeout(() => {
      onFilterChange({languageCode: values.languageCode, title: values.title});
    }, 500);
  }, [values.languageCode, values.title, onFilterChange])
  return (
        <Form>
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
  );
}

TextFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

TextFilterForm.defaultProps = {};

export default TextFilterForm;
