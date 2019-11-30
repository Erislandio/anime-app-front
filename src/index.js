import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
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
import Search from "./components/dashboard/search/Search";
import { Home } from "./components/dashboard/home/Home";
import Profile from "./components/dashboard/profile/Profile";
import BottomNavigator from "./components/bottomNavigator/BottomNavigator";

export class App extends React.Component {
  render() {
    const user = JSON.parse(Cookie.get("user"));
    return (
      <Router>
        {user ? (
          <Redirect to={{ pathname: "/home" }} />
        ) : (
          <Redirect to={{ pathname: "/initial" }} />
        )}
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
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/home">
            <Home user={user} />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
        </Switch>
        {user ? <BottomNavigator /> : null}
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
