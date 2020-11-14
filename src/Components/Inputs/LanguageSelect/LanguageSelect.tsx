import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./LanguageSelect.module.scss";
import { Language, RootState } from "../../../RootReducer";

interface LanguageSelectProps {
  value: string | null;
  languages: Language[];
  className: string | undefined;
  onChange: any;
  disabled: boolean;
}
/**
 * language select
 */
class LanguageSelect extends React.Component<LanguageSelectProps> {
  static defaultProps = {
    value: "",
    onChange: () => {},
    disabled: false,
    className: undefined,
  };

  shouldComponentUpdate(nextProps: LanguageSelectProps) {
    const { value, languages } = this.props;
    return value !== nextProps.value || languages !== nextProps.languages;
  }

  render() {
    const { languages, className, onChange, value, disabled } = this.props;
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
  }
}

export default connect((state: RootState) => ({
  languages: state.language.languages,
}))(LanguageSelect);
