import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Language } from "../../../Reducers/LanguageReducer";
import { RootState } from "../../../RootReducer";

interface LanguageSelectProps {
  value: string;
  languages: Language[];
  className: string | undefined;
  onChange: (value: string) => void;
  disabled: boolean;
}

/**
 * language select
 */
class LanguageSelect extends React.Component<LanguageSelectProps> {
  static defaultProps = { className: undefined, disabled: false };

  shouldComponentUpdate(nextProps: LanguageSelectProps) {
    const { value, languages } = this.props;
    return value !== nextProps.value || languages !== nextProps.languages;
  }

  render() {
    const { languages, className, onChange, value, disabled } = this.props;
    return (
      <Select
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={className}
        placeholder="Language"
      >
        {languages.map((language) => (
          <Select.Option key={language.code} value={language.code}>
            {language.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default connect((state: RootState) => ({
  languages: state.language.languages,
}))(LanguageSelect);
