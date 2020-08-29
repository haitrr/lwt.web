import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * language select
 */
class LanguageSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { value, languages } = this.props;
    return value !== nextProps.value || languages !== nextProps.languages;
  }

  render() {
    const { languages, className, onChange, value, disabled } = this.props;
    return (
      <Select
        onChange={onChange}
        value={value}
        disabled={disabled || false}
        className={className}
        placeholder="Language"
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

LanguageSelect.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool
};

LanguageSelect.defaultProps = {
  languages: [],
  className: null,
  value: "",
  disabled: false
};

export default connect(state => ({
  languages: state.language.languages
}))(LanguageSelect);
