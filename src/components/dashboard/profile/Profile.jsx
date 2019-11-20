import React, { Component } from "react";
import Cookie from "js-cookie";
import Header from "./Header/Header";
import "./profile.css";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      address: null
    };
  }

  handleLogout = () => {
    try {
      Cookie.remove("id");
      Cookie.remove("user");

      window.location.href = "/initial";
    } catch (error) {}
  };

  render() {
    const { user } = this.props;

    if (!user) {
      return <h1>carregando...</h1>;
    }

    return (
      <div id="profile">
        <Header user={user} />
      </div>
    );
  }
}
