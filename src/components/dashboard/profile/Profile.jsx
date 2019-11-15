import React, { Component } from "react";
import BottomNavigator from "../../bottomNavigator/BottomNavigator";

export default class Profile extends Component {
  render() {
    return (
      <div id="profile">
        <h1>Profile</h1>
        <BottomNavigator />
      </div>
    );
  }
}
