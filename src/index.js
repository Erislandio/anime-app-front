import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./components/dashboard/Main";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/login/login";
import LoginForm from "./components/login/LoginForm";
import Register from "./components/register/Register";
import Cookie from "js-cookie";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const idUser = Cookie.get("id");

  return (
    <Router>
      {idUser && <Redirect to={{ pathname: "/dashboard" }} />}
      <Switch>
        <Route path="/initial">
          <Login />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
