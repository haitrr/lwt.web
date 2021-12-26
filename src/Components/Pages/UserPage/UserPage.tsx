import React from 'react';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import styles from './UserPage.module.scss';
import { LanguageCode } from '../../../Enums';
import { UserSetting } from '../../../RootReducer';
import { UserLanguageSetting } from '../../../Reducers/UserReducer';
import LanguageSettingForm from './LanguageSettingForm';
import Loading from '../../Loading/Loading';
import useLanguages from '../../../Hooks/useLanguages';
import { useMutation, useQueryClient } from 'react-query';
import { updateSettingAsync } from '../../../Apis/UserApi';
import useUserSettings from '../../../Hooks/useUserSettings';

interface FormValues {
  languageSettings: UserLanguageSetting[];
}

const UserPage: React.FC = () => {
  const { languages } = useLanguages();
  const { userSettings } = useUserSettings();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (settings: UserSetting) => {
      await updateSettingAsync(settings);
      return settings;
    },
    {
      onSuccess: (settings: UserSetting) => {
        queryClient.setQueryData('userSettings', settings);
      },
    },
  );

  if (!languages) {
    return <Loading />;
  }

  const onAddLanguageSetting = (values: FormValues, setFieldValue: (fieldName: string, value: any) => void) => {
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
    setFieldValue('languageSettings', newLanguageSettings);
  };
  if (!userSettings) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      <Formik<FormValues>
        initialValues={userSettings}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <h1>Dictionary settings</h1>
              <LanguageSettingForm onChange={handleChange} languageSettings={values.languageSettings} />
              <Button
                variant="contained"
                color="secondary"
                disabled={languages.length <= values.languageSettings.length}
                type="button"
                onClick={() => onAddLanguageSetting(values, setFieldValue)}
              >
                Add
              </Button>
              <br />
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserPage;
