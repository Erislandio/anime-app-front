import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/login/login";
import LoginForm from "./components/login/LoginForm";
import Register from "./components/register/Register";
import Cookie from "js-cookie";
import axios from "axios";
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
import client from "./client/client";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idUser: Cookie.get("id"),
      user: null
    };
  }

  async componentDidMount() {
    const userId = Cookie.get("user");

    const { idUser, user } = this.state;

    if (idUser && user == null) {
      try {
        const { data } = await client({
          method: "POST",
          url: "/user/find",
          data: {
            id: userId
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idUser}`
          }
        });

        this.setState({ user: data });
      } catch (error) {
        client({
          method: "POST",
          url: "/user/find",
          data: {
            id: userId
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idUser}`
          }
        }).then(res => {
          this.setState({ user: res.data });
          axios
            .get(`https://viacep.com.br/ws/${res.data.user.zipcode}/json/`)
            .then(res => {
              console.log(res, "res");
            });
        });
      }
    }
  }

  render() {
    const { idUser, user } = this.state;

    return (
      <Router>
        {idUser ? (
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
            <Home />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
        </Switch>
        {user || idUser ? <BottomNavigator /> : null}
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
