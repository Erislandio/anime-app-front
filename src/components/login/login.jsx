import React, { Component } from "react";
import "./login.css";
import { Logo } from "../../assets/svg/icons";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div id="login" className="login-page">
        <div>
          <Logo />
          <h2>Anime App</h2>
        </div>
        <div className="form-content">
          <p>Um app feito para voce!</p>
          <form>
            <button id="login-btn">
              <Link to="/login">Entrar</Link>
            </button>
            <button id="sign-up-btn">
              <Link to="/signin">Crie sua conta :-)</Link>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
