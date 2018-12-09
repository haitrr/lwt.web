import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";

/**
 * language select
 */
class LanguageSelect extends React.Component {
  render() {
    const { languages, onChange, value } = this.props;

    return (
      <Select onChange={onChange} value={value}>
        {languages.map(language => {
          return (
            <Select.Option value={language.id} key={language.id}>
              {language.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}

const connectedLanguageSelect = connect(state => {
  return { languages: state.language.languages };
})(LanguageSelect);

export { connectedLanguageSelect as LanguageSelect };
