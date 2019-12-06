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
import Details from "./components/Details/Details";

export class App extends React.Component {
  render() {
    const userJson = Cookie.get("user");
    const user = userJson ? JSON.parse(userJson) : null;

    const isDetailsPage = window.location.href.split("/")[3] === "details";
    console.log(isDetailsPage);

    return (
      <Router>
        {user ? (
          // <Redirect to={{ pathname: "/home" }} />
          <div></div>
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

        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register()