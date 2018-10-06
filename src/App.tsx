import {Layout} from "antd";
import * as React from 'react';
import {Provider} from "react-redux"
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import './App.css';
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from './Components/Pages/HomePage';
import LoginPage from './Components/Pages/LoginPage';
import RootReducer from "./RootReducer";

const store = createStore(
  RootReducer,
// @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Layout.Header>
              <Header/>
            </Layout.Header>
            <Layout.Content>
              <Route path="/" exact={true} component={HomePage}/>
              <Route path="/login" exact={true} component={LoginPage}/>
            </Layout.Content>
            <Layout.Footer>
              <Footer/>
            </Layout.Footer>
          </Layout>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
