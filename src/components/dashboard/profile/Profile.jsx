import React, { Component } from "react";
import Cookie from "js-cookie";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  handleLogout = () => {
    try {
      Cookie.remove("id");
      Cookie.remove("user");

      window.location.href = "/initial";
    } catch (error) {
      console.log(error);
    }
  };

  render() {

    return (
      <div id="profile">
        <h1>{this.props.user && this.props.user.name}</h1>
        <button onClick={this.handleLogout}>Sair</button>
      </div>
    );
  }
}
