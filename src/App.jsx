import PropTypes from "prop-types";
import { notification } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { Helmet } from "react-helmet";
import { Paper } from "@material-ui/core";
import styles from "./App.module.scss";
import Header from "./Components/Header/Header";
import { HomePage } from "./Components/Pages/HomePage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import { RegisterPage } from "./Components/Pages/RegisterPage/RegisterPage";
import TextPage from "./Components/Pages/TextPage";
import TextReadPage from "./Components/Pages/TextReadPage";
import { getLanguageAction } from "./Actions/LanguageAction";
import { getSettingAction } from "./Actions/UserAction";
import UserPage from "./Components/Pages/UserPage";
import Themer from "./Themer";

/**
 * app.
 */
class App extends React.Component {
  componentDidMount() {
    const { user, getSetting } = this.props;
    if (user.isLoggedIn) {
      getSetting();
    }
    notification.config({ top: 5, placement: "bottomRight", duration: 1 });
    const { getLanguages } = this.props;
    getLanguages();
  }

  componentDidUpdate(prevProps) {
    const { user, getSetting } = this.props;
    if (!prevProps.user.isLoggedIn && user.isLoggedIn) {
      getSetting();
    }
  }

  render() {
    return (
      <Themer>
        <Paper>
          <BrowserRouter>
            <div className={styles.layout}>
              <Helmet>
                <title>Lwt</title>
              </Helmet>
              <Header />
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/text" exact component={TextPage} />
              <Route path="/text/read/:textId" exact component={TextReadPage} />
              <Route path="/profile" exact component={UserPage} />
            </div>
          </BrowserRouter>
        </Paper>
      </Themer>
    );
  }
}

App.defaultProps = {
  user: {},
};

App.propTypes = {
  getLanguages: PropTypes.func.isRequired,
  getSetting: PropTypes.func.isRequired,
  user: PropTypes.shape(),
};

export default connect(
  (state) => ({
    user: state.user,
  }),
  {
    getLanguages: getLanguageAction,
    getSetting: getSettingAction,
  }
)(App);
