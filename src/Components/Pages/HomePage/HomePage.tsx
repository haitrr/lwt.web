import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {
  getLanguageAction,
  selectLanguageAction,
} from "../../../Actions/LanguageAction";
import {RootState} from "../../../RootReducer";
import LastRead from "./LastRead";

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isLoggedIn ? (
    <div style={{padding: "2rem"}}>
      <LastRead/>
    </div>
  ) : (
    <Redirect to="/login"/>
  );
}

const connectedHomePage = connect(
  (state: RootState) => ({
    isLoggedIn: state.user.isLoggedIn,
    currentLanguage: state.language.currentLanguage,
  }),
  {
    getLanguage: getLanguageAction,
    selectLanguage: selectLanguageAction,
  }
)(HomePage);
export {connectedHomePage as HomePage};
