import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  getLanguageAction,
  selectLanguageAction
} from "../../../Actions/LanguageAction";
import "./HomePage.css";
import { API_ROOT } from "../../../Constants";

/**
 * Home page
 */
class HomePage extends React.Component {
  componentDidMount() {
    const { getLanguage, isLoggedIn } = this.props;
    if (isLoggedIn) {
      getLanguage();
    }
    console.log(process.env.NODE_ENV);
    console.log(API_ROOT);
  }

  render() {
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
            {languages.map(language => (
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

const connectedHomePage = connect(
  state => ({
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
