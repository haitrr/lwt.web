import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Paper} from "@mui/material";
import styles from "./App.module.scss";
import Header from "./Components/Header/Header";
import {HomePage} from "./Components/Pages/HomePage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage/RegisterPage";
import TextPage from "./Components/Pages/TextPage";
import TextReadPage from "./Components/Pages/TextReadPage";
import {getLanguageAction} from "./Actions/LanguageAction";
import {getSettingAction} from "./Actions/UserAction";
import UserPage from "./Components/Pages/UserPage";
import Themer from "./Themer";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootState, UserState} from "./RootReducer";
import StatisticsPage from "./Components/Pages/StatisticsPage";
import {QueryClient, QueryClientProvider} from "react-query";

interface Props {
  user: UserState;
  getSetting: Function;
  getLanguages: Function;
}

const queryClient = new QueryClient()

/**
 * app.
 */
const App: React.FC<Props> = ({user, getSetting, getLanguages}) => {
  React.useEffect(() => {
    if (user.isLoggedIn) {
      getSetting();
    }
    getLanguages();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (user.isLoggedIn) {
      getSetting();
    }
  }, [user.isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Themer>
      <QueryClientProvider client={queryClient}>
        <Paper style={{height: "-webkit-fill-available"}}>
          <BrowserRouter>
            <div className={styles.layout}>
              <ToastContainer/>
              <Helmet>
                <title>Lwt</title>
              </Helmet>
              <Header/>
              <Route path="/login" exact component={LoginPage}/>
              <Route path="/register" exact component={RegisterPage}/>
              {user.isLoggedIn ? (
                <>
                  <Route path="/" exact component={HomePage}/>
                  <Route path="/text" exact component={TextPage}/>
                  <Route path="/statistics" exact component={StatisticsPage}/>
                  <Route
                    path="/text/read/:textId"
                    exact
                    component={TextReadPage}
                  />
                  <Route path="/profile" exact component={UserPage}/>
                </>
              ) : (
                <Redirect to="/login"/>
              )}
            </div>
          </BrowserRouter>
        </Paper>
      </QueryClientProvider>
    </Themer>
  );
}

export default connect(
  (state: RootState) => ({
    user: state.user,
  }),
  {
    getLanguages: getLanguageAction,
    getSetting: getSettingAction,
  }
)(App);
