import React from "react";
import {connect} from "react-redux";
import {Form, Formik} from "formik";
import {Button} from "@material-ui/core";
import styles from "./UserPage.module.scss";
import {updateSettingAction} from "../../../Actions/UserAction";
import {LanguageCode} from "../../../Enums";
import {Language, RootState, UserSetting} from "../../../RootReducer";
import {UserLanguageSetting} from "../../../Reducers/UserReducer";
import LanguageSettingForm from "./LanguageSettingForm";
import Loading from "../../Loading/Loading";

interface StateProps {
  languages: Language[]
  updateUserSetting: Function,
  user: any,
  setting: UserSetting
}

interface OwnProps {
}

type Props = StateProps & OwnProps

interface FormValues {
  languageSettings: UserLanguageSetting[]
}

const UserPage: React.FC<Props> = (
  {
    languages,
    updateUserSetting,
    setting
  }) => {
  const onAddLanguageSetting = (values: FormValues, setFieldValue: Function) => {
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
  if (!setting) {
    return <Loading/>
  }

  return (
    <div className={styles.root}>
      <Formik<FormValues>
        initialValues={setting}
        onSubmit={(values) => {
          updateUserSetting(values)
        }}
      >
        {({handleChange, handleSubmit, values, setFieldValue}) => {
          return <Form onSubmit={handleSubmit}>
            <h1>Dictionary settings</h1>
            <LanguageSettingForm onChange={handleChange} languages={languages}
                                 languageSettings={values.languageSettings}/>
            <Button
              variant="contained"
              color="secondary"
              disabled={languages.length <= values.languageSettings.length}
              type="button"
              onClick={() => onAddLanguageSetting(values, setFieldValue)}
            >
              Add
            </Button>
            <br/>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Form>
        }}
      </Formik>
    </div>
  );
}

const connectedUserPage
  =
  connect
  (
    (
      state: RootState) =>
      ({
        user: state.user,
        languages: state.language.languages,
        setting: state.user.setting
      }),
    {
      updateUserSetting: updateSettingAction,
    }
  )
  (
    UserPage
  );

export default connectedUserPage;
