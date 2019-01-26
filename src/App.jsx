import PropTypes from "prop-types";
import { Layout } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import ReactChartkick from "react-chartkick";
import Chart from "chart.js";
import styles from "./App.module.scss";
import { Footer } from "./Components/Footer";
import Header from "./Components/Header/Header";
import { HomePage } from "./Components/Pages/HomePage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import { RegisterPage } from "./Components/Pages/RegisterPage/RegisterPage";
import TextPage from "./Components/Pages/TextPage";
import TextReadPage from "./Components/Pages/TextReadPage";
import { getLanguageAction } from "./Actions/LanguageAction";

ReactChartkick.addAdapter(Chart);

/**
 * app.
 */
class App extends React.Component {
  componentDidMount() {
    const { getLanguages } = this.props;
    getLanguages();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Layout.Header className={styles.header}>
            <Header />
          </Layout.Header>
          <Layout.Content className={styles.content}>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/text" exact component={TextPage} />
            <Route path="/text/read/:textId" exact component={TextReadPage} />
          </Layout.Content>
          <Layout.Footer className={styles.footer}>
            <Footer />
          </Layout.Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}
export default connect(
  null,
  {
    getLanguages: getLanguageAction
  }
)(App);

App.propTypes = {
  getLanguages: PropTypes.func.isRequired
};
