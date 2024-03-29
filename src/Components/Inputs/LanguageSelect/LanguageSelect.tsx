import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';
import classNames from 'classnames';
import styles from './LanguageSelect.module.scss';
import useLanguages from '../../../Hooks/useLanguages';
import Loading from '../../Loading/Loading';

interface LanguageSelectProps {
  value: string | null;
  className?: string | undefined;
  onChange?: any;
  disabled?: boolean;
  name: string;
}

type Props = LanguageSelectProps;

const LanguageSelect: React.FC<Props> = ({ value = '', onChange, disabled = false, className = undefined, name }) => {
  const { languages } = useLanguages();
  if (!languages) {
    return <Loading />;
  }
  const cn = classNames(className, styles.select);
  return (
    <FormControl variant="outlined" className={cn}>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        onChange={onChange}
        label="Language"
        value={value}
        color="primary"
        name={name}
        disabled={disabled || false}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            {language.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
