import { Layout } from "antd";
import * as React from 'react';
import { Provider } from "react-redux"
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createStore, Store } from "redux";
import 'src/App.css';
import Footer from "src/Components/Footer";
import Header from "src/Components/Header";
import HomePage from 'src/Components/Pages/HomePage';
import LoginPage from 'src/Components/Pages/LoginPage';
import RegisterPage from 'src/Components/Pages/RegisterPage';
import { rootReducer } from "src/RootReducer";

const store: Store = createStore(
  rootReducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
