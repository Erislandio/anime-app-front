import React, { Component } from "react";
import Cookie from "js-cookie";
import client from "../../../client/client";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  render() {
    console.log(this);

    return (
      <div id="profile">
        <h1>{this.props.user && this.props.user.name}</h1>
      </div>
    );
  }
}
