import { Layout } from "antd";
import * as React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as promiseMiddleware from "redux-promise";
import "src/App.css";
import { rootReducer } from "src/RootReducer";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./Components/Pages/HomePage";
import { LoginPage } from "./Components/Pages/LoginPage";
import { RegisterPage } from "./Components/Pages/RegisterPage/RegisterPage";
import { TextPage } from "./Components/Pages/TextPage";

const store: Store = createStore(
  rootReducer,
  // tslint:disable-next-line
  composeWithDevTools(applyMiddleware((promiseMiddleware as any).default))
);

/**
 * app.
 */
export class App extends React.Component {
  public render(): React.ReactNode {
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
