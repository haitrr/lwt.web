import React from "react";
import {createStore} from 'redux'
import { Route } from "react-router";
import { Provider } from "react-redux";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import combinedReducer from "./rootReducer";

const store = createStore(combinedReducer);

const App = () => (
  <Provider store={store}>
    <div className="ui container">
      <Route path="/" exact component={HomePage}/>
      <Route path="/login" exact component={LoginPage}/>
    </div>
  </Provider>
);

export default App;
