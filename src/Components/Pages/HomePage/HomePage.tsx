import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  getLanguageAction,
  selectLanguageActionCreator,
} from "../../../Actions/LanguageAction";
import "./HomePage.css";
import LanguageSelect from "../../Inputs/LanguageSelect/LanguageSelect";
import { RootState } from "../../../RootReducer";

interface HomePageProps {
  getLanguage: Function;
  selectLanguage: (language: string) => void;
  isLoggedIn: boolean;
  currentLanguage: string;
}

/**
 * Home page
 */
class HomePage extends React.Component<HomePageProps> {
  componentDidMount() {
    const { getLanguage, isLoggedIn } = this.props;
    if (isLoggedIn) {
      getLanguage();
    }
  }

  render() {
    const { isLoggedIn, currentLanguage, selectLanguage } = this.props;

    return isLoggedIn ? (
      <div>
        <h1>Home Page</h1>
        <div>
          <strong>Language : </strong>
          <LanguageSelect value={currentLanguage} onChange={selectLanguage} />
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default connect(
  (state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    languages: state.language.languages,
    currentLanguage: state.language.currentLanguage,
  }),
  {
    getLanguage: getLanguageAction,
    selectLanguage: selectLanguageActionCreator,
  }
)(HomePage);
