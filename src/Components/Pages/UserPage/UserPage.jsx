import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {Field, Form, withFormik} from "formik";
import {Button} from "@material-ui/core";
import styles from "./UserPage.module.scss";
import {updateSettingAction} from "../../../Actions/UserAction";
import {LanguageCode} from "../../../Enums";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";

const UserPage = ({languages, setFieldValue, values, handleChange}) => {
  const onAddLanguageSetting = () => {
    const {languageSettings} = values;
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

  if (!languages || !values.languageSettings) {
    return <h1>Loading</h1>;
  }
  return (
    <div className={styles.root}>
      <Form>
        <h1>Dictionary settings</h1>
        <br/>
        {values.languageSettings
          ? values.languageSettings.map((ls, i) => (
            <div>
              <h1>
                {languages.find((l) => l.code === ls.languageCode).name}
              </h1>
              <Field
                component={LanguageSelect}
                name={`languageSettings[${i}].dictionaryLanguageCode`}
                onChange={handleChange}
                value={ls.dictionaryLanguageCode}
              />
            </div>
          ))
          : null}
        <br/>
        <Button
          variant="contained"
          color="secondary"
          disabled={languages.length <= values.languageSettings.length}
          type="button"
          onClick={onAddLanguageSetting}
        >
          Add
        </Button>
        <br/>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
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
    handleSubmit: (values, {props}) => {
      props.updateUserSetting(values);
    },
    enableReinitialize: true,
    mapPropsToValues: (props) => props.user.setting,
  })(UserPage)
);

export default connectedUserPage;
