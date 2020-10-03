import React from "react";
import { connect } from "react-redux";
import { Field, Form, FormikProps, withFormik } from "formik";
import styles from "./UserPage.module.scss";
import { updateSettingAction } from "../../../Actions/UserAction";
import { LanguageCode } from "../../../Enums";
import { RootState } from "../../../RootReducer";
import { UserSettingUpdateModel } from "../../../Apis/UserApi";
import { UserState } from "../../../Reducers/UserReducer";
import { Language } from "../../../Reducers/LanguageReducer";

interface UserPageProps {
  languages: Language[];
  setFieldValue: (name: string, value: any) => void;
  handleChange: () => void;
  values: UserSettingUpdateModel;
  user: UserState;
  updateUserSetting: Function;
}

class UserPage extends React.Component<
  UserPageProps & FormikProps<UserSettingUpdateModel>
> {
  onAddLanguageSetting = () => {
    const { languages, setFieldValue, values } = this.props;
    const { languageSettings } = values;
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
          {values.languageSettings.map((ls, i) => (
            <React.Fragment>
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
            </React.Fragment>
          ))}
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

const connectedUserPage = withFormik<UserPageProps, UserSettingUpdateModel>({
  handleSubmit: (values: UserSettingUpdateModel, { props }) => {
    props.updateUserSetting(values);
  },
  enableReinitialize: true,
  mapPropsToValues: (props: UserPageProps) => props.user.setting!,
})(
  connect(
    (state: RootState) => ({
      user: state.user,
      languages: state.language.languages,
    }),
    {
      updateUserSetting: updateSettingAction,
    }
  )(UserPage)
);

export default connectedUserPage;
