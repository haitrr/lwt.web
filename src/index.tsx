import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import promise from "redux-promise";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./RootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, promise))
);

ReactDOM.render(
  <Provider store={store as any}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
