import LanguageSelect from '../../Inputs/LanguageSelect/LanguageSelect';
import React from 'react';
import { UserLanguageSetting } from '../../../Reducers/UserReducer';
import Loading from '../../Loading/Loading';
import useLanguages from '../../../Hooks/useLanguages';

interface Props {
  languageSettings: UserLanguageSetting[];
  onChange: () => void;
}

const LanguageSettingForm: React.FC<Props> = ({ onChange, languageSettings }) => {
  const { languages } = useLanguages();
  if (!languages || !languageSettings) {
    return <Loading />;
  }
  return (
    <div>
      {languageSettings.map((ls, index) => {
        const label = languages.find((l) => l.code === ls.languageCode)?.name;
        const name = `languageSettings[${index}].dictionaryLanguageCode`;
        return (
          <div key={index}>
            <h1>{label}</h1>
            <LanguageSelect name={name} onChange={onChange} value={ls.dictionaryLanguageCode} />
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSettingForm;
