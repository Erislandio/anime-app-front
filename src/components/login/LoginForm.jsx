import React, { Component } from "react";
import { Logo } from "../../assets/svg/icons";
import { IoIosArrowRoundBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { Loading } from "../loading/loading";
import client from "../../client/client";
import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import { compose } from "redux";
import { checkMail } from "../../utils/emailVaidator";

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
      error: null
    };
  }

  handleChageInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitForm = e => {
    const { email, password } = this.state;
    e.preventDefault();

    if (!checkMail(email)) {
      ToastsStore.warning("Email Inválido");
      return;
    }

    this.setState({ loading: true });

    client.client({
      method: "POST",
      url: "/login",
      data: {
        email,
        password
      }
    })
      .then(res => {
        const {
          data: { token, user },
          data
        } = res;

        if (token) {
          Cookie.set("user", user);
          window.location.href = "/home";
        } else if (data.error) {
          ToastsStore.error(data.error);
        }

        this.setState({
          loading: false
        });
      })
      .catch(error => {
        ToastsStore.error("Ops! ocorreu algum erro, tente novamente.");
        this.setState({
          error,
          loading: false
        });
      });
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <div id="login-form" className="login-page form-login">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <Link to="/initial" className="back-btn">
          <IoIosArrowRoundBack size={50} color="#fff" />
        </Link>
        <div>
          <Logo />
          <h2>Entrar</h2>
          <h4>E se divertir</h4>
        </div>
        <div className="form-content">
          <form id="login-form-content" onSubmit={this.handleSubmitForm}>
            <div>
              <span className="label-input">
                <input
                  value={email}
                  placeholder="E-mail"
                  name="email"
                  type="text"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
              <span className="label-input">
                <input
                  value={password}
                  placeholder="Password"
                  name="password"
                  type="password"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
            </div>
            <div className="login-btn-content">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    Entrar
                    <IoIosArrowForward />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const encharge = compose(withRouter)(LoginForm);

export default encharge;
