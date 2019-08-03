import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Field, Form, withFormik } from "formik";
import styles from "./UserPage.module.scss";
import { updateSettingAction } from "../../../Actions/UserAction";

class UserPage extends React.Component {
  state = { currentLanguage: "en" };

  onChangeLanguage = event => {
    this.setState({ currentLanguage: event.target.value });
  };

  render() {
    const { values, languages, handleChange } = this.props;
    const { currentLanguage } = this.state;
    return (
      <div className={styles.root}>
        <Form>
          <h1>Language settings</h1>
          <select onChange={this.onChangeLanguage}>
            {languages &&
              languages.map(language => (
                <option value={language.code}>{language.name}</option>
              ))}
          </select>
          <br />
          <span>Translate Language</span>
          <Field
            component="select"
            name={`languageSettings.${currentLanguage}.dictionaryLanguage`}
            onChange={handleChange}
            value={
              values.languageSettings &&
              values.languageSettings[currentLanguage]
                ? values.languageSettings[currentLanguage].dictionaryLanguage
                : "en"
            }
          >
            {languages &&
              languages.map(language => (
                <option value={language.code}>{language.name}</option>
              ))}
          </Field>
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
  values: PropTypes.shape({}).isRequired
};

const connectedUserPage = connect(
  state => ({
    user: state.user,
    languages: state.language.languages
  }),
  {
    updateUserSetting: updateSettingAction
  }
)(
  withFormik({
    handleSubmit: (values, { props }) => {
      props.updateUserSetting(values);
    },
    enableReinitialize: true,
    mapPropsToValues: props => props.user.setting
  })(UserPage)
);

export default connectedUserPage;
