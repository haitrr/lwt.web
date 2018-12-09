import { Layout } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import "./App.css";
import "antd/dist/antd.css";
import { rootReducer } from "./RootReducer";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./Components/Pages/HomePage";
import { LoginPage } from "./Components/Pages/LoginPage";
import { RegisterPage } from "./Components/Pages/RegisterPage/RegisterPage";
import { TextPage } from "./Components/Pages/TextPage";
import { TextReadPage } from "./Components/Pages/TextReadPage";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);

/**
 * app.
 */
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Layout.Header>
              <Header />
            </Layout.Header>
            <Layout.Content className="Content">
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/login" exact={true} component={LoginPage} />
              <Route path="/register" exact={true} component={RegisterPage} />
              <Route path="/text" exact={true} component={TextPage} />
              <Route
                path="/text/read/:textId"
                exact={true}
                component={TextReadPage}
              />
            </Layout.Content>
            <Layout.Footer>
              <Footer />
            </Layout.Footer>
          </Layout>
        </Provider>
      </BrowserRouter>
    );
  }
}
