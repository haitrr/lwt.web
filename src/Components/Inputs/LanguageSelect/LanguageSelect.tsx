import { Select, MenuItem } from "@material-ui/core";
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
    value: null,
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
      <Select
        onChange={onChange}
        value={value}
        color="primary"
        disabled={disabled || false}
        className={cn}
        placeholder="Language"
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            {language.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

export default connect((state: RootState) => ({
  languages: state.language.languages,
}))(LanguageSelect);
