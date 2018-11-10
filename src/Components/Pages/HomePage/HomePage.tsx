import { Select } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  getLanguageAction,
  selectLanguageAction
} from "../../../Actions/LanguageAction";
import "./HomePage.css";

/**
 * Home page
 */
class HomePage extends React.Component<any> {
  public componentDidMount(): any {
    const { getLanguage, isLoggedIn } = this.props;
    if (isLoggedIn) {
      getLanguage();
    }
  }

  public render(): React.ReactNode {
    const {
      isLoggedIn,
      languages,
      currentLanguage,
      selectLanguage
    } = this.props;

    return isLoggedIn ? (
      <div>
        <h1>Home Page</h1>
        <div>
          <strong>Language : </strong>
          <Select value={currentLanguage} onChange={selectLanguage}>
            {languages.map((language: any) => (
              <Select.Option value={language.id} key={language.id}>
                {language.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

const connectedHomePage: any = connect(
  (state: any) => ({
    isLoggedIn: state.user.isLoggedIn,
    languages: state.language.languages,
    currentLanguage: state.language.currentLanguage
  }),
  {
    getLanguage: getLanguageAction,
    selectLanguage: selectLanguageAction
  }
)(HomePage);
export { connectedHomePage as HomePage };
