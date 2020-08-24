import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";

/**
 * language select
 */
class LanguageSelect extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.value !== nextProps.value ||
      this.props.languages !== nextProps.languages
    );
  }

  render() {
    const { languages, className, onChange, value, disabled } = this.props;
    return (
      <Select
        onChange={onChange}
        value={value}
        disabled={disabled || false}
        className={className}
      >
        {languages.map(language => (
          <Select.Option key={language.code} value={language.code}>
            {language.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

const connectedLanguageSelect = connect(state => ({
  languages: state.language.languages
}))(LanguageSelect);

export { connectedLanguageSelect as LanguageSelect };
