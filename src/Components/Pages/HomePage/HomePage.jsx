import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  getLanguageAction,
  selectLanguageAction,
} from "../../../Actions/LanguageAction";
import "./HomePage.css";

/**
 * Home page
 */
class HomePage extends React.Component {
  componentDidMount() {
    const { getLanguage, isLoggedIn } = this.props;
    if (isLoggedIn) {
      getLanguage();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <div>
        <h1>Home Page</h1>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

const connectedHomePage = connect(
  (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    languages: state.language.languages,
    currentLanguage: state.language.currentLanguage,
  }),
  {
    getLanguage: getLanguageAction,
    selectLanguage: selectLanguageAction,
  }
)(HomePage);
export { connectedHomePage as HomePage };
