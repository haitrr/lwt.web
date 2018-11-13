import { Select } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { ILanguage } from "../../../Interfaces/ILanguage";

interface ILanguageSelectProps {
  languages: ILanguage[];
}

/**
 * language select
 */
class LanguageSelect extends React.Component<ILanguageSelectProps & any> {
  public render(): React.ReactNode {
    const { languages, onChange, value } = this.props;

    return (
      <Select onChange={onChange} value={value}>
        {languages.map((language: ILanguage) => {
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

const connectedLanguageSelect: any = connect((state: any) => {
  return { languages: state.language.languages };
})(LanguageSelect);

export { connectedLanguageSelect as LanguageSelect };
