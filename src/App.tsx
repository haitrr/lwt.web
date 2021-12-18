import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Paper} from "@mui/material";
import styles from "./App.module.scss";
import Header from "./Components/Header/Header";
import {getLanguageAction} from "./Actions/LanguageAction";
import {getSettingAction} from "./Actions/UserAction";
import Themer from "./Themer";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootState, UserState} from "./RootReducer";
import {QueryClient, QueryClientProvider} from "react-query";

const HomePage = React.lazy(() => import('./Components/Pages/HomePage'))
const LoginPage = React.lazy(() => import('./Components/Pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('./Components/Pages/RegisterPage'))
const TextPage = React.lazy(() => import('./Components/Pages/TextPage'))
const TextReadPage = React.lazy(() => import('./Components/Pages/TextReadPage'))
const UserPage = React.lazy(() => import('./Components/Pages/UserPage'))
const StatisticsPage = React.lazy(() => import('./Components/Pages/StatisticsPage'))

interface Props {
  user: UserState;
  getSetting: Function;
}

const queryClient = new QueryClient()

/**
 * app.
 */
const App: React.FC<Props> = ({user, getSetting}) => {
  React.useEffect(() => {
    if (user.isLoggedIn) {
      getSetting();
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (user.isLoggedIn) {
      getSetting();
    }
  }, [user.isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Themer>
      <QueryClientProvider client={queryClient}>
        <Paper style={{height: "-webkit-fill-available", overflow: "scroll" }}>
          <BrowserRouter>
            <div className={styles.layout}>
              <ToastContainer/>
              <Helmet>
                <title>Lwt</title>
              </Helmet>
              <Header/>
              <React.Suspense fallback={<div>Loading..</div>}>
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
              </React.Suspense>
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
    getSetting: getSettingAction,
  }
)(App);
