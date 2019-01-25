import { Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import "antd/dist/antd.css";
import ReactChartkick from "react-chartkick";
import Chart from "chart.js";
import styles from "./App.module.scss";
import rootReducer from "./RootReducer";
import { Footer } from "./Components/Footer";
import Header from "./Components/Header/Header";
import { HomePage } from "./Components/Pages/HomePage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import { RegisterPage } from "./Components/Pages/RegisterPage/RegisterPage";
import TextPage from "./Components/Pages/TextPage";
import TextReadPage from "./Components/Pages/TextReadPage";

ReactChartkick.addAdapter(Chart);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);

/**
 * app.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
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
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
}
