import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Field, Form, withFormik } from "formik";

function UserSettingForm(props) {
  const { languages } = props;
  return (
    <Form>
      {languages.map(language => (
        <div>
          <span>{language.name}</span>
          <Field component="select" name={language.name}>
            {languages.map(l => (
              <option value={l.id}>{l.name}</option>
            ))}
          </Field>
        </div>
      ))}
      <button type="submit">Save</button>
    </Form>
  );
}

const connectedUserForm = connect(
  state => ({ languages: state.language.languages }),
  {}
)(UserSettingForm);

export default withFormik({})(connectedUserForm);

UserSettingForm.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
