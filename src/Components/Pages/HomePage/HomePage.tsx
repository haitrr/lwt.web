import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {
  getLanguageAction,
  selectLanguageAction,
} from "../../../Actions/LanguageAction";
import {RootState} from "../../../RootReducer";

interface Props {
  getLanguage: Function;
  isLoggedIn: boolean;
}

/**
 * Home page
 */
const HomePage: React.FC<Props> = ({getLanguage, isLoggedIn}) => {
  React.useEffect(() => {
    if (isLoggedIn) {
      getLanguage();
    }
  }, [])

  return isLoggedIn ? (
    <div>
      <h1>Home Page</h1>
    </div>
  ) : (
    <Redirect to="/login"/>
  );
}

const connectedHomePage = connect(
  (state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    languages: state.language.languages,
    currentLanguage: state.language.currentLanguage,
  }),
  {
    getLanguage: getLanguageAction,
    selectLanguage: selectLanguageAction,
  }
)(HomePage);
export {connectedHomePage as HomePage};
