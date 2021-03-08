import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import { SignIn, SignUp } from "./authentication"
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/app">
        <App />
      </Route>
      <Route path="/">
        <SignIn />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
