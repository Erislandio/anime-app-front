import React, { Component } from "react";
import Cookie from "js-cookie";
import Header from "./Header/Header";
import "./profile.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
      return (
        <div id="loading">
          <Loader type="TailSpin" color="#f953c6" height={50} width={50} />
        </div>
      );
    }

    return (
      <div id="profile">
        <Header user={user} />
      </div>
    );
  }
}
