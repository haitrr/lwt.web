import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import thunk from "redux-thunk";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./RootReducer";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://8658bd7f18634bd19522e701bcb946e4@o476836.ingest.sentry.io/5517012",
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  });
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
