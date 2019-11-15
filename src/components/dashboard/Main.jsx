import React, { Component } from "react";
import BottomNavigator from "../bottomNavigator/BottomNavigator";
import "./main.css";

export default class Main extends Component {
  render() {
    return (
      <div id="main">
        <h1>Main</h1>
        <BottomNavigator />
      </div>
    );
  }
}
