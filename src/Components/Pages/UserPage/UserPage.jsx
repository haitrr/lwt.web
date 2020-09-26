import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Field, Form, withFormik } from "formik";
import styles from "./UserPage.module.scss";
import { updateSettingAction } from "../../../Actions/UserAction";
import { LanguageCode } from "../../../Enums";

class UserPage extends React.Component {
  onAddLanguageSetting = () => {
    const { languages, setFieldValue } = this.props;
    const { languageSettings } = this.props.values;
    const newLanguageSettings = [...languageSettings];
    for (let i = 0; i < languages.length; i += 1) {
      const l = languages[i];
      if (!newLanguageSettings.find((ls) => ls.languageCode === l.code)) {
        newLanguageSettings.push({
          languageCode: l.code,
          dictionaryLanguageCode: LanguageCode.English,
        });
        break;
      }
    }
    setFieldValue("languageSettings", newLanguageSettings);
  };

  render() {
    const { values, languages, handleChange } = this.props;
    if (!languages || !values.languageSettings) {
      return <h1>Loading</h1>;
    }
    return (
      <div className={styles.root}>
        <Form>
          <h1>Language settings</h1>
          <br />
          {values.languageSettings
            ? values.languageSettings.map((ls, i) => (
              <div>
                <h1>{ls.languageCode}</h1>
                <Field
                  component="select"
                  name={`languageSettings[${i}].dictionaryLanguageCode`}
                  onChange={handleChange}
                  value={ls.dictionaryLanguageCode}
                >
                  {languages &&
                  languages.map((language) => (
                    <option value={language.code}>{language.name}</option>
                  ))}
                </Field>
              </div>
              ))
            : null}
          <br />
          <button
            disabled={languages.length <= values.languageSettings.length}
            type="button"
            onClick={this.onAddLanguageSetting}
          >
            Add
          </button>
          <br />
          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  }
}

UserPage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  values: PropTypes.shape({}).isRequired,
};

const connectedUserPage = connect(
  (state) => ({
    user: state.user,
    languages: state.language.languages,
  }),
  {
    updateUserSetting: updateSettingAction,
  }
)(
  withFormik({
    handleSubmit: (values, { props }) => {
      props.updateUserSetting(values);
    },
    enableReinitialize: true,
    mapPropsToValues: (props) => props.user.setting,
  })(UserPage)
);

export default connectedUserPage;
