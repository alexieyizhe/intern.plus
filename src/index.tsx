import React from "react";
import ReactDOM from "react-dom";
import App from "src/App";
import * as Sentry from "@sentry/browser";
import * as serviceWorker from "./serviceWorker";

Sentry.init({
  dsn: "https://f959f5f9295a45bbb1e0244502607dc1@sentry.io/1785244",
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
